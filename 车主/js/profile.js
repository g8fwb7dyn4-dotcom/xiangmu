// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 初始化车主数据
    initDriverData();

    // 绑定头像上传事件
    bindAvatarUpload();

    // 绑定编辑资料事件
    bindEditProfile();

    // 绑定退出登录事件
    bindLogout();
});

/**
 * 初始化车主数据（从本地存储读取或使用默认值）
 */
function initDriverData() {
    let driverData = JSON.parse(localStorage.getItem('driverData'));

    // 如果本地存储没有数据，使用默认数据
    if (!driverData) {
        driverData = {
            username: localStorage.getItem('username') || '张师傅',
            avatar: '../用户/images/司机头像.png',
            totalCompleted: 128,
            completionRate: '98%',
            rating: 4.9,
            earnings: 12580,
            monthOrders: 32,
            avgOrderValue: 393,
            growthRate: '+12.5%',
            carModel: '大众 · 朗逸 2020款',
            licensePlate: '粤A12345',
            carColor: '黑色',
            joinDate: '2022-03-15',
            walletBalance: 5680
        };
        // 保存到本地存储
        localStorage.setItem('driverData', JSON.stringify(driverData));
    }

    // 更新页面数据展示
    updatePageData(driverData);
}

/**
 * 更新页面数据展示
 * @param {Object} driverData - 车主数据对象
 */
function updatePageData(driverData) {
    document.getElementById('profile-name').textContent = driverData.username;
    document.getElementById('profile-avatar').src = driverData.avatar;
    document.getElementById('total-completed').textContent = driverData.totalCompleted;
    document.getElementById('completion-rate').textContent = driverData.completionRate;
    document.getElementById('driver-rating').textContent = driverData.rating;

    // 更新收入相关数据（如果需要动态更新）
    const earningsAmount = document.querySelector('.earnings-amount');
    if (earningsAmount) {
        earningsAmount.textContent = `¥${driverData.earnings.toLocaleString()}.00`;
    }

    const earningsStats = document.querySelectorAll('.earnings-stat-value');
    if (earningsStats.length >= 3) {
        earningsStats[0].textContent = driverData.growthRate;
        earningsStats[1].textContent = `${driverData.monthOrders}单`;
        earningsStats[2].textContent = `¥${driverData.avgOrderValue}`;
    }

    // 更新钱包余额
    const balanceElement = document.querySelector('.balance');
    if (balanceElement) {
        balanceElement.textContent = `¥${driverData.walletBalance.toLocaleString()}.00`;
    }
}

/**
 * 绑定头像上传事件
 */
function bindAvatarUpload() {
    const avatarInput = document.getElementById('avatar-upload');
    const avatarImage = document.getElementById('profile-avatar');

    avatarInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            // 验证文件类型
            const fileType = file.type;
            if (!fileType.startsWith('image/')) {
                alert('请选择图片文件（JPG、PNG等）');
                return;
            }

            // 验证文件大小（不超过5MB）
            const fileSize = file.size / 1024 / 1024;
            if (fileSize > 5) {
                alert('图片大小不能超过5MB');
                return;
            }

            // 读取图片并预览
            const reader = new FileReader();
            reader.onload = function (event) {
                // 更新头像预览
                avatarImage.src = event.target.result;

                // 保存到本地存储
                let driverData = JSON.parse(localStorage.getItem('driverData'));
                if (driverData) {
                    driverData.avatar = event.target.result;
                    localStorage.setItem('driverData', JSON.stringify(driverData));
                }

                // 显示上传成功提示
                showToast('头像上传成功');
            };
            reader.readAsDataURL(file);
        }
    });
}

/**
 * 绑定编辑资料事件
 */
function bindEditProfile() {
    const editBtn = document.getElementById('edit-profile');

    editBtn.addEventListener('click', function () {
        // 获取当前用户数据
        const driverData = JSON.parse(localStorage.getItem('driverData'));

        // 弹出输入框让用户修改姓名
        const newName = prompt('请输入您的姓名', driverData.username);

        if (newName && newName.trim() !== '') {
            // 更新本地存储
            driverData.username = newName.trim();
            localStorage.setItem('driverData', JSON.stringify(driverData));

            // 更新页面显示
            document.getElementById('profile-name').textContent = newName.trim();

            // 显示修改成功提示
            showToast('姓名修改成功');
        } else if (newName === '') {
            alert('姓名不能为空');
        }
    });
}

/**
 * 绑定退出登录事件
 */
function bindLogout() {
    const logoutItem = document.querySelector('.logout-item');

    logoutItem.addEventListener('click', function (e) {
        e.preventDefault();

        // 确认退出登录
        if (confirm('确定要退出登录吗？')) {
            // 清除本地存储的用户数据
            localStorage.removeItem('driverData');
            localStorage.removeItem('username');

            // 跳转到登录页面（根据实际登录页面路径修改）
            window.location.href = '../用户/login.html';
        }
    });
}

/**
 * 显示提示消息
 * @param {string} message - 提示消息内容
 * @param {string} type - 消息类型（success/error/info）
 */
function showToast(message, type = 'success') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // 设置样式
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '8px';
    toast.style.color = 'white';
    toast.style.fontSize = '0.9rem';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // 根据类型设置背景色
    switch (type) {
        case 'success':
            toast.style.backgroundColor = 'var(--primary-color)';
            break;
        case 'error':
            toast.style.backgroundColor = '#DC2626';
            break;
        case 'info':
            toast.style.backgroundColor = '#3B82F6';
            break;
    }

    // 添加到页面
    document.body.appendChild(toast);

    // 显示提示
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 10);

    // 3秒后隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%)';

        // 移除元素
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}