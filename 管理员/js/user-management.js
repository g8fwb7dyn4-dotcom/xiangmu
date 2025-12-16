// 用户数据 - 模拟后台数据
const usersData = [
    {
        id: 1,
        name: "张三",
        avatar: "../用户/images/用户1.png",
        phone: "13800138000",
        email: "zhangsan@example.com",
        registerDate: "2023-05-12",
        orders: 28,
        spending: 1560,
        status: "active"
    },
    {
        id: 2,
        name: "李四",
        avatar: "../用户/images/用户2.png",
        phone: "13900139000",
        email: "lisi@example.com",
        registerDate: "2023-06-15",
        orders: 15,
        spending: 890,
        status: "active"
    },
    {
        id: 3,
        name: "王五",
        avatar: "../用户/images/用户3.png",
        phone: "13700137000",
        email: "wangwu@example.com",
        registerDate: "2023-07-20",
        orders: 5,
        spending: 320,
        status: "inactive"
    },
    {
        id: 4,
        name: "赵六",
        avatar: "../用户/images/用户4.png",
        phone: "13600136000",
        email: "zhaoliu@example.com",
        registerDate: "2023-08-05",
        orders: 42,
        spending: 2150,
        status: "active"
    },
    {
        id: 5,
        name: "钱七",
        avatar: "../用户/images/用户5.png",
        phone: "13500135000",
        email: "qianqi@example.com",
        registerDate: "2023-09-18",
        orders: 12,
        spending: 680,
        status: "active"
    },
    {
        id: 6,
        name: "孙八",
        avatar: "../用户/images/用户6.png",
        phone: "13400134000",
        email: "sunba@example.com",
        registerDate: "2023-10-22",
        orders: 3,
        spending: 150,
        status: "inactive"
    },
    {
        id: 7,
        name: "周九",
        avatar: "../用户/images/用户7.png",
        phone: "13300133000",
        email: "zhoujiu@example.com",
        registerDate: "2023-11-30",
        orders: 25,
        spending: 1320,
        status: "active"
    },
    {
        id: 8,
        name: "吴十",
        avatar: "../用户/images/用户8.png",
        phone: "13200132000",
        email: "wushi@example.com",
        registerDate: "2023-12-05",
        orders: 8,
        spending: 450,
        status: "active"
    }
];

// 全局状态变量
let currentPage = 1;
const usersPerPage = 5;
let filteredUsers = [...usersData];

// DOM元素缓存
const DOM = {
    usersTableBody: document.getElementById('users-table-body'),
    paginationContainer: document.getElementById('pagination'),
    searchInput: document.getElementById('search-input'),
    statusFilter: document.getElementById('status-filter'),
    sortFilter: document.getElementById('sort-filter'),
    addUserBtn: document.getElementById('add-user-btn'),
    userModal: document.getElementById('user-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalFooter: document.getElementById('modal-footer'),
    closeModal: document.getElementById('close-modal')
};

/**
 * 初始化页面
 */
function initUserManagement() {
    // 初始化导航高亮
    initAdminNav();

    // 渲染用户列表
    renderUsers();

    // 绑定所有事件
    bindAllEvents();
}

/**
 * 渲染用户列表
 */
function renderUsers() {
    // 计算分页参数
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = Math.min(startIndex + usersPerPage, filteredUsers.length);
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // 清空表格
    DOM.usersTableBody.innerHTML = '';

    // 渲染空状态
    if (currentUsers.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
      <td colspan="7" style="text-align: center; padding: 2rem; color: #616E7C;">
        <i class="fa fa-search-minus" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        没有找到匹配的用户数据
      </td>
    `;
        DOM.usersTableBody.appendChild(emptyRow);
    } else {
        // 渲染用户数据行
        currentUsers.forEach(user => {
            const row = createUserRow(user);
            DOM.usersTableBody.appendChild(row);
        });
    }

    // 渲染分页控件
    renderPagination(totalPages);
}

/**
 * 创建用户表格行
 * @param {Object} user - 用户数据对象
 * @returns {HTMLElement} tr元素
 */
function createUserRow(user) {
    const row = document.createElement('tr');
    row.dataset.userId = user.id;

    row.innerHTML = `
    <td>
      <div class="user-info">
        <img src="${user.avatar}" alt="${user.name}" class="user-avatar" loading="lazy">
        <span>${escapeHtml(user.name)}</span>
      </div>
    </td>
    <td>${escapeHtml(user.phone)}</td>
    <td class="hidden-mobile">${escapeHtml(user.email)}</td>
    <td>${user.registerDate}</td>
    <td class="hidden-mobile">${user.orders}</td>
    <td>
      <span class="status-badge status-${user.status}">
        ${user.status === 'active' ? '已激活' : '未激活'}
      </span>
    </td>
    <td>
      <button class="action-btn view-btn" data-action="view" data-id="${user.id}">
        <i class="fa fa-eye"></i> 查看
      </button>
      <button class="action-btn edit-btn" data-action="edit" data-id="${user.id}">
        <i class="fa fa-edit"></i> 编辑
      </button>
      <button class="action-btn delete-btn" data-action="delete" data-id="${user.id}">
        <i class="fa fa-trash"></i> 删除
      </button>
    </td>
  `;

    return row;
}

/**
 * 渲染分页控件
 * @param {number} totalPages - 总页数
 */
function renderPagination(totalPages) {
    DOM.paginationContainer.innerHTML = '';

    // 上一页按钮
    const prevBtn = createPageButton('prev', '<i class="fa fa-chevron-left"></i>', currentPage > 1);
    DOM.paginationContainer.appendChild(prevBtn);

    // 页码按钮
    const pageRange = getPageRange(currentPage, totalPages);
    pageRange.forEach(page => {
        const pageBtn = createPageButton('page', page, true, page === currentPage);
        DOM.paginationContainer.appendChild(pageBtn);
    });

    // 下一页按钮
    const nextBtn = createPageButton('next', '<i class="fa fa-chevron-right"></i>', currentPage < totalPages);
    DOM.paginationContainer.appendChild(nextBtn);
}

/**
 * 创建分页按钮
 * @param {string} type - 按钮类型 (prev, page, next)
 * @param {string} content - 按钮内容
 * @param {boolean} enabled - 是否可用
 * @param {boolean} isActive - 是否当前页
 * @returns {HTMLElement} 按钮元素
 */
function createPageButton(type, content, enabled = true, isActive = false) {
    const btn = document.createElement('button');
    btn.className = `page-btn ${isActive ? 'active' : ''} ${!enabled ? 'disabled' : ''}`;
    btn.innerHTML = content;
    btn.disabled = !enabled;

    if (type === 'page') {
        btn.dataset.page = content;
        btn.addEventListener('click', () => {
            currentPage = parseInt(content);
            renderUsers();
        });
    } else if (type === 'prev') {
        btn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderUsers();
            }
        });
    } else if (type === 'next') {
        btn.addEventListener('click', () => {
            if (currentPage < parseInt(DOM.paginationContainer.dataset.totalPages)) {
                currentPage++;
                renderUsers();
            }
        });
    }

    DOM.paginationContainer.dataset.totalPages = totalPages;
    return btn;
}

/**
 * 获取分页显示范围
 * @param {number} currentPage - 当前页
 * @param {number} totalPages - 总页数
 * @returns {number[]} 页码数组
 */
function getPageRange(currentPage, totalPages) {
    const range = [];
    const visiblePages = 5;

    if (totalPages <= visiblePages) {
        // 总页数小于等于可见页数，显示所有页码
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
    } else {
        // 总页数大于可见页数，显示当前页附近的页码
        let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let endPage = startPage + visiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - visiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
    }

    return range;
}

/**
 * 绑定所有事件
 */
function bindAllEvents() {
    // 搜索事件
    DOM.searchInput.addEventListener('input', debounce(handleSearch, 300));

    // 状态筛选事件
    DOM.statusFilter.addEventListener('change', handleFilter);

    // 排序事件
    DOM.sortFilter.addEventListener('change', handleSort);

    // 添加用户按钮事件
    DOM.addUserBtn.addEventListener('click', showAddUserModal);

    // 关闭模态框事件
    DOM.closeModal.addEventListener('click', hideModal);

    // 点击模态框外部关闭
    DOM.userModal.addEventListener('click', (e) => {
        if (e.target === DOM.userModal) {
            hideModal();
        }
    });

    // 表格操作按钮事件（事件委托）
    DOM.usersTableBody.addEventListener('click', handleTableAction);

    // 阻止模态框内容区域的点击冒泡
    DOM.modalBody.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

/**
 * 处理表格操作按钮点击
 * @param {Event} e - 点击事件
 */
function handleTableAction(e) {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const userId = parseInt(actionBtn.dataset.id);

    switch (action) {
        case 'view':
            showUserDetail(userId);
            break;
        case 'edit':
            showEditUserModal(userId);
            break;
        case 'delete':
            confirmDeleteUser(userId);
            break;
    }
}

/**
 * 处理搜索
 */
function handleSearch() {
    const searchTerm = DOM.searchInput.value.trim().toLowerCase();

    // 过滤用户数据
    filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    // 重置分页到第一页
    currentPage = 1;
    // 重新渲染
    renderUsers();
} // 补充函数闭合

/**
 * 处理状态筛选
 */
function handleFilter() {
    const status = DOM.statusFilter.value;

    if (status !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    // 应用排序
    handleSort();
}

/**
 * 处理排序
 */
function handleSort() {
    const sortBy = DOM.sortFilter.value;

    // 根据选择的排序方式排序
    switch (sortBy) {
        case 'latest':
            filteredUsers.sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate));
            break;
        case 'orders':
            filteredUsers.sort((a, b) => b.orders - a.orders);
            break;
        case 'spending':
            filteredUsers.sort((a, b) => b.spending - a.spending);
            break;
    }

    // 重新渲染
    renderUsers();
}

/**
 * 显示用户详情模态框
 * @param {number} userId - 用户ID
 */
function showUserDetail(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    // 设置模态框标题
    DOM.modalTitle.textContent = '用户详情';

    // 设置模态框内容
    DOM.modalBody.innerHTML = `
    <div class="form-group">
      <div class="user-profile-header">
        <img src="${user.avatar}" alt="${user.name}" class="user-avatar-large">
        <div class="user-profile-info">
          <h3>${escapeHtml(user.name)}</h3>
          <span class="status-badge status-${user.status}">
            ${user.status === 'active' ? '已激活' : '未激活'}
          </span>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>用户ID</label>
      <input type="text" class="form-control" value="U${String(user.id).padStart(6, '0')}" disabled>
    </div>
    <div class="form-group">
      <label>手机号</label>
      <input type="text" class="form-control" value="${escapeHtml(user.phone)}" disabled>
    </div>
    <div class="form-group">
      <label>邮箱</label>
      <input type="email" class="form-control" value="${escapeHtml(user.email)}" disabled>
    </div>
    <div class="form-group">
      <label>注册时间</label>
      <input type="text" class="form-control" value="${user.registerDate}" disabled>
    </div>
    <div class="form-group">
      <label>总订单数</label>
      <input type="number" class="form-control" value="${user.orders}" disabled>
    </div>
    <div class="form-group">
      <label>总消费金额</label>
      <input type="text" class="form-control" value="¥${user.spending.toFixed(2)}" disabled>
    </div>
  `;

    // 设置模态框底部按钮
    DOM.modalFooter.innerHTML = `
    <button class="btn btn-outline modal-close-btn">关闭</button>
  `;

    // 绑定关闭按钮事件
    document.querySelector('.modal-close-btn').addEventListener('click', hideModal);

    // 显示模态框
    showModal();
}

/**
 * 显示编辑用户模态框
 * @param {number} userId - 用户ID
 */
function showEditUserModal(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    // 设置模态框标题
    DOM.modalTitle.textContent = '编辑用户';

    // 设置模态框内容
    DOM.modalBody.innerHTML = `
    <div class="form-group">
      <label for="edit-name">用户名 <span class="required">*</span></label>
      <input type="text" class="form-control" id="edit-name" value="${escapeHtml(user.name)}" required>
    </div>
    <div class="form-group">
      <label for="edit-phone">手机号 <span class="required">*</span></label>
      <input type="tel" class="form-control" id="edit-phone" value="${escapeHtml(user.phone)}" 
             pattern="1[3-9]\\d{9}" required>
    </div>
    <div class="form-group">
      <label for="edit-email">邮箱 <span class="required">*</span></label>
      <input type="email" class="form-control" id="edit-email" value="${escapeHtml(user.email)}" required>
    </div>
    <div class="form-group">
      <label for="edit-status">账户状态 <span class="required">*</span></label>
      <select class="form-control" id="edit-status" required>
        <option value="active" ${user.status === 'active' ? 'selected' : ''}>已激活</option>
        <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>未激活</option>
      </select>
    </div>
  `;

    // 设置模态框底部按钮
    DOM.modalFooter.innerHTML = `
    <button class="btn btn-outline modal-cancel-btn">取消</button>
    <button class="btn btn-primary modal-save-btn" data-id="${user.id}">保存修改</button>
  `;

    // 绑定按钮事件
    document.querySelector('.modal-cancel-btn').addEventListener('click', hideModal);
    document.querySelector('.modal-save-btn').addEventListener('click', saveUserEdit);

    // 显示模态框
    showModal();
}

/**
 * 显示添加用户模态框
 */
function showAddUserModal() {
    // 设置模态框标题
    DOM.modalTitle.textContent = '添加用户';

    // 设置模态框内容
    DOM.modalBody.innerHTML = `
    <div class="form-group">
      <label for="add-name">用户名 <span class="required">*</span></label>
      <input type="text" class="form-control" id="add-name" placeholder="请输入用户名" required>
    </div>
    <div class="form-group">
      <label for="add-phone">手机号 <span class="required">*</span></label>
      <input type="tel" class="form-control" id="add-phone" placeholder="请输入手机号" 
             pattern="1[3-9]\\d{9}" required>
    </div>
    <div class="form-group">
      <label for="add-email">邮箱 <span class="required">*</span></label>
      <input type="email" class="form-control" id="add-email" placeholder="请输入邮箱" required>
    </div>
    <div class="form-group">
      <label for="add-status">账户状态 <span class="required">*</span></label>
      <select class="form-control" id="add-status" required>
        <option value="active" selected>已激活</option>
        <option value="inactive">未激活</option>
      </select>
    </div>
  `;

    // 设置模态框底部按钮
    DOM.modalFooter.innerHTML = `
    <button class="btn btn-outline modal-cancel-btn">取消</button>
    <button class="btn btn-primary modal-add-btn">添加用户</button>
  `;

    // 绑定按钮事件
    document.querySelector('.modal-cancel-btn').addEventListener('click', hideModal);
    document.querySelector('.modal-add-btn').addEventListener('click', saveNewUser);

    // 显示模态框
    showModal();
}

/**
 * 保存用户编辑
 */
function saveUserEdit() {
    const userId = parseInt(this.dataset.id);
    const userIndex = usersData.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        alert('用户不存在');
        return;
    }

    // 获取表单数据
    const name = document.getElementById('edit-name').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const status = document.getElementById('edit-status').value;

    // 表单验证
    if (!validateFormData(name, phone, email)) {
        return;
    }

    // 更新用户数据
    usersData[userIndex] = {
        ...usersData[userIndex],
        name,
        phone,
        email,
        status
    };

    // 重新筛选和渲染
    handleSearch();

    // 关闭模态框
    hideModal();

    // 显示成功提示
    showToast('用户信息修改成功');
}

/**
 * 保存新用户
 */
function saveNewUser() {
    // 获取表单数据
    const name = document.getElementById('add-name').value.trim();
    const phone = document.getElementById('add-phone').value.trim();
    const email = document.getElementById('add-email').value.trim();
    const status = document.getElementById('add-status').value;

    // 表单验证
    if (!validateFormData(name, phone, email)) {
        return;
    }

    // 检查手机号和邮箱是否已存在
    if (usersData.some(u => u.phone === phone)) {
        alert('该手机号已被注册');
        return;
    }

    if (usersData.some(u => u.email === email)) {
        alert('该邮箱已被注册');
        return;
    }

    // 创建新用户
    const newUserId = Math.max(...usersData.map(u => u.id)) + 1;
    const newUser = {
        id: newUserId,
        name,
        avatar: "../用户/images/用户默认.png",
        phone,
        email,
        registerDate: new Date().toISOString().split('T')[0],
        orders: 0,
        spending: 0,
        status
    };

    // 添加到用户数据
    usersData.push(newUser);

    // 重新筛选和渲染
    handleSearch();

    // 关闭模态框
    hideModal();

    // 显示成功提示
    showToast('新用户添加成功');
}

/**
 * 确认删除用户
 * @param {number} userId - 用户ID
 */
function confirmDeleteUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;

    if (confirm(`确定要删除用户「${escapeHtml(user.name)}」吗？\n删除后数据将无法恢复。`)) {
        // 执行删除
        const userIndex = usersData.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            usersData.splice(userIndex, 1);

            // 重新筛选和渲染
            handleSearch();

            // 显示成功提示
            showToast('用户已成功删除');
        }
    }
}

/**
 * 验证表单数据
 * @param {string} name - 用户名
 * @param {string} phone - 手机号
 * @param {string} email - 邮箱
 * @returns {boolean} 验证结果
 */
function validateFormData(name, phone, email) {
    if (!name) {
        alert('请输入用户名');
        return false;
    }

    if (name.length > 20) {
        alert('用户名长度不能超过20个字符');
        return false;
    }

    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(phone)) {
        alert('请输入有效的手机号');
        return false;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
        alert('请输入有效的邮箱地址');
        return false;
    }

    return true;
}

/**
 * 显示模态框
 */
function showModal() {
    DOM.userModal.classList.add('active');
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
}

/**
 * 隐藏模态框
 */
function hideModal() {
    DOM.userModal.classList.remove('active');
    // 恢复页面滚动
    document.body.style.overflow = '';

    // 清空模态框内容（防止残留）
    setTimeout(() => {
        DOM.modalBody.innerHTML = '';
        DOM.modalFooter.innerHTML = '';
    }, 300);
}

/**
 * 显示提示消息
 * @param {string} message - 提示消息
 * @param {string} type - 消息类型 (success, error, info)
 */
function showToast(message, type = 'success') {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // 添加到页面
    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // 3秒后隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';

        // 移除元素
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

/**
 * HTML转义
 * @param {string} str - 要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function () {
    // 确保Console.js中的导航初始化函数可用
    if (typeof initAdminNav !== 'function') {
        console.warn('警告：initAdminNav函数未找到，导航高亮功能可能无法正常工作');

        // 提供降级方案
        window.initAdminNav = function () {
            const currentPage = 'user-management';
            document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === currentPage) {
                    link.classList.add('active');
                }
            });
            // 初始化用户管理页面
            initUserManagement();
        };
    }



    // 添加全局样式（提示框）
    const style = document.createElement('style');
    style.textContent = `
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 0.8rem 1.2rem;
      border-radius: 4px;
      color: white;
      font-size: 0.9rem;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .toast-success {
      background-color: #2E7D32;
    }
    .toast-error {
      background-color: #c62828;
    }
    .toast-info {
      background-color: #1976d2;
    }
    .required {
      color: #c62828;
    }
    .user-profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }
    .user-avatar-large {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 1.2rem;
      border: 3px solid #f0f0f0;
    }
    .user-profile-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.3rem;
    }
  `;
    document.head.appendChild(style);
});

// 确保初始化函数正确执行
document.addEventListener('DOMContentLoaded', function () {
    try {
        initDriverManagement();
    } catch (error) {
        console.error('初始化失败:', error);
        // 手动渲染数据作为备份
        renderDrivers();
    }
});

// 在文件末尾添加
document.addEventListener('DOMContentLoaded', initUserManagement);