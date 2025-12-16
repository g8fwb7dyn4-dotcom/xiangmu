// 系统设置页面交互逻辑
document.addEventListener('DOMContentLoaded', function () {
    // 初始化导航
    initAdminNav();

    // 初始化标签页切换
    initTabs();

    // 初始化设置功能
    initSettings();

    // 初始化备份功能
    initBackupFunctions();
});

/**
 * 初始化标签页切换功能
 */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.settings-tab');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 更新内容区域
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === `${tabId}-tab`) {
                    tab.classList.add('active');
                }
            });

            // 保存当前标签页到本地存储
            localStorage.setItem('lastSystemSettingsTab', tabId);
        });
    });

    // 恢复上次打开的标签页
    const lastTab = localStorage.getItem('lastSystemSettingsTab');
    if (lastTab) {
        const lastTabBtn = document.querySelector(`.tab-btn[data-tab="${lastTab}"]`);
        if (lastTabBtn) {
            lastTabBtn.click();
        }
    }
}

/**
 * 初始化设置功能
 */
function initSettings() {
    // 加载保存的设置
    loadSettings();

    // 保存设置按钮事件
    const saveBtn = document.querySelector('.save-settings-btn');
    saveBtn.addEventListener('click', saveSettings);

    // Logo移除按钮事件
    const removeLogoBtn = document.querySelector('.remove-logo');
    removeLogoBtn.addEventListener('click', function () {
        if (confirm('确定要移除当前Logo吗？')) {
            document.querySelector('.current-logo img').style.display = 'none';
            document.getElementById('site-logo').value = '';
        }
    });

    // 文件上传预览
    const logoInput = document.getElementById('site-logo');
    logoInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const logoImg = document.querySelector('.current-logo img');
                logoImg.src = e.target.result;
                logoImg.style.display = 'block';
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

/**
 * 加载保存的设置
 */
function loadSettings() {
    const savedSettings = localStorage.getItem('systemSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);

        // 填充表单字段
        for (const [key, value] of Object.entries(settings)) {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else {
                    element.value = value;
                }
            }
        }
    }
}

/**
 * 保存设置
 */
function saveSettings() {
    const settings = {
        // 基本设置
        'site-name': document.getElementById('site-name').value,
        'site-description': document.getElementById('site-description').value,
        'contact-email': document.getElementById('contact-email').value,
        'contact-phone': document.getElementById('contact-phone').value,
        'working-hours': document.getElementById('working-hours').value,

        // 通知设置
        'notify-new-user': document.getElementById('notify-new-user').checked,
        'notify-driver-verification': document.getElementById('notify-driver-verification').checked,
        'notify-complaints': document.getElementById('notify-complaints').checked,
        'notify-errors': document.getElementById('notify-errors').checked,
        'welcome-email': document.getElementById('welcome-email').value,
        'driver-approved': document.getElementById('driver-approved').value,

        // 安全设置
        'enforce-password-complexity': document.getElementById('enforce-password-complexity').checked,
        'password-expiry': document.getElementById('password-expiry').value,
        'enable-login-lock': document.getElementById('enable-login-lock').checked,
        'max-failed-attempts': document.getElementById('max-failed-attempts').value,
        'session-timeout': document.getElementById('session-timeout').value,
        'allow-multiple-login': document.getElementById('allow-multiple-login').checked,

        // 备份设置
        'enable-auto-backup': document.getElementById('enable-auto-backup').checked,
        'backup-frequency': document.getElementById('backup-frequency').value,
        'backup-time': document.getElementById('backup-time').value,
        'backup-retention': document.getElementById('backup-retention').value
    };

    // 保存到本地存储
    localStorage.setItem('systemSettings', JSON.stringify(settings));

    // 显示保存成功提示
    showToast('设置已成功保存');
}

/**
 * 初始化备份功能
 */
function initBackupFunctions() {
    // 手动备份按钮
    const manualBackupBtn = document.getElementById('manual-backup-btn');
    manualBackupBtn.addEventListener('click', function () {
        this.disabled = true;
        this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 正在创建备份...';

        // 模拟备份过程
        setTimeout(() => {
            this.disabled = false;
            this.innerHTML = '<i class="fa fa-database"></i> 创建手动备份';

            // 添加新备份到历史记录
            addBackupToHistory(true);

            showToast('手动备份已创建成功');
        }, 2000);
    });

    // 恢复按钮事件
    document.querySelectorAll('.restore-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('确定要从该备份恢复数据吗？这将覆盖当前所有数据！')) {
                const backupDate = this.closest('.backup-item').querySelector('.backup-date').textContent;
                showToast(`正在从 ${backupDate} 的备份恢复数据...`);

                // 模拟恢复过程
                setTimeout(() => {
                    showToast('数据已成功从备份恢复');
                }, 2000);
            }
        });
    });

    // 下载按钮事件
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const backupDate = this.closest('.backup-item').querySelector('.backup-date').textContent;
            showToast(`正在下载 ${backupDate} 的备份文件...`);

            // 模拟下载过程
            setTimeout(() => {
                showToast('备份文件下载完成');
            }, 1500);
        });
    });
}

/**
 * 添加备份到历史记录
 * @param {boolean} isManual - 是否是手动备份
 */
function addBackupToHistory(isManual) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const backupHistory = document.querySelector('.backup-history');

    const backupItem = document.createElement('div');
    backupItem.className = 'backup-item';
    backupItem.innerHTML = `
        <div class="backup-info">
            <span class="backup-type ${isManual ? 'manual' : 'auto'}">${isManual ? '手动备份' : '自动备份'}</span>
            <span class="backup-date">${dateStr}</span>
            <span class="backup-size">${Math.floor(Math.random() * 50) + 200} MB</span>
        </div>
        <div class="backup-actions">
            <button class="btn btn-sm btn-outline restore-btn">恢复</button>
            <button class="btn btn-sm btn-outline download-btn">下载</button>
        </div>
    `;

    // 添加事件监听器
    backupItem.querySelector('.restore-btn').addEventListener('click', function () {
        if (confirm('确定要从该备份恢复数据吗？这将覆盖当前所有数据！')) {
            showToast(`正在从 ${dateStr} 的备份恢复数据...`);

            // 模拟恢复过程
            setTimeout(() => {
                showToast('数据已成功从备份恢复');
            }, 2000);
        }
    });

    backupItem.querySelector('.download-btn').addEventListener('click', function () {
        showToast(`正在下载 ${dateStr} 的备份文件...`);

        // 模拟下载过程
        setTimeout(() => {
            showToast('备份文件下载完成');
        }, 1500);
    });

    // 添加到历史记录顶部
    backupHistory.insertBefore(backupItem, backupHistory.firstChild);
}

/**
 * 显示提示消息
 * @param {string} message - 消息内容
 */
function showToast(message) {
    const toast = document.getElementById('save-toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}