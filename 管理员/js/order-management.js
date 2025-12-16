// 订单数据 - 模拟后台数据
const ordersData = [
    {
        id: 'KL1678901234567',
        passenger: {
            id: 1,
            name: "张三",
            avatar: "../用户/images/用户1.png",
            phone: "13800138000"
        },
        driver: {
            id: 101,
            name: "张师傅",
            avatar: "../用户/images/司机1.png",
            phone: "13912345678",
            car: "大众朗逸"
        },
        pickup: "中央公园",
        destination: "科技园",
        startTime: "2023-11-15T08:30:00",
        endTime: "2023-11-15T09:15:00",
        distance: 8.5,
        price: 35.5,
        status: "completed",
        rideType: "express",
        paymentMethod: "alipay",
        passengers: 1,
        rating: 5
    },
    {
        id: 'KL1678901234568',
        passenger: {
            id: 2,
            name: "李四",
            avatar: "../用户/images/用户2.png",
            phone: "13900139000"
        },
        driver: {
            id: 102,
            name: "李师傅",
            avatar: "../用户/images/司机2.png",
            phone: "13987654321",
            car: "丰田卡罗拉"
        },
        pickup: "东方广场",
        destination: "大学城",
        startTime: "2023-11-15T10:00:00",
        endTime: null,
        distance: 12.3,
        price: 42.0,
        status: "confirmed",
        rideType: "premium",
        paymentMethod: "wechat",
        passengers: 2,
        rating: null
    },
    {
        id: 'KL1678901234569',
        passenger: {
            id: 3,
            name: "王五",
            avatar: "../用户/images/用户3.png",
            phone: "13700137000"
        },
        driver: null,
        pickup: "西湖景区",
        destination: "火车站",
        startTime: "2023-11-15T14:30:00",
        endTime: null,
        distance: 5.2,
        price: 28.5,
        status: "pending",
        rideType: "share",
        paymentMethod: "wechat",
        passengers: 1,
        rating: null
    },
    {
        id: 'KL1678901234570',
        passenger: {
            id: 4,
            name: "赵六",
            avatar: "../用户/images/用户4.png",
            phone: "13600136000"
        },
        driver: {
            id: 103,
            name: "王师傅",
            avatar: "../用户/images/司机3.png",
            phone: "13956789012",
            car: "本田思域"
        },
        pickup: "北站",
        destination: "南站",
        startTime: "2023-11-14T16:45:00",
        endTime: "2023-11-14T17:30:00",
        distance: 15.8,
        price: 58.0,
        status: "completed",
        rideType: "express",
        paymentMethod: "alipay",
        passengers: 1,
        rating: 4
    },
    {
        id: 'KL1678901234571',
        passenger: {
            id: 5,
            name: "钱七",
            avatar: "../用户/images/用户5.png",
            phone: "13500135000"
        },
        driver: {
            id: 101,
            name: "张师傅",
            avatar: "../用户/images/司机1.png",
            phone: "13912345678",
            car: "大众朗逸"
        },
        pickup: "市政府",
        destination: "体育中心",
        startTime: "2023-11-14T09:15:00",
        endTime: null,
        distance: 3.2,
        price: 18.5,
        status: "cancelled",
        rideType: "express",
        paymentMethod: "wechat",
        passengers: 1,
        rating: null
    },
    {
        id: 'KL1678901234572',
        passenger: {
            id: 6,
            name: "孙八",
            avatar: "../用户/images/用户6.png",
            phone: "13400134000"
        },
        driver: {
            id: 104,
            name: "刘师傅",
            avatar: "../用户/images/司机4.png",
            phone: "13923456789",
            car: "别克君威"
        },
        pickup: "阳光小区",
        destination: "第一医院",
        startTime: "2023-11-13T11:30:00",
        endTime: "2023-11-13T11:50:00",
        distance: 4.7,
        price: 22.0,
        status: "completed",
        rideType: "premium",
        paymentMethod: "alipay",
        passengers: 3,
        rating: 5
    },
    {
        id: 'KL1678901234573',
        passenger: {
            id: 7,
            name: "周九",
            avatar: "../用户/images/用户7.png",
            phone: "13300133000"
        },
        driver: null,
        pickup: "幸福路",
        destination: "科技园",
        startTime: "2023-11-15T16:00:00",
        endTime: null,
        distance: 7.8,
        price: 32.0,
        status: "pending",
        rideType: "share",
        paymentMethod: "wechat",
        passengers: 2,
        rating: null
    },
    {
        id: 'KL1678901234574',
        passenger: {
            id: 8,
            name: "吴十",
            avatar: "../用户/images/用户8.png",
            phone: "13200132000"
        },
        driver: {
            id: 105,
            name: "陈师傅",
            avatar: "../用户/images/司机5.png",
            phone: "13934567890",
            car: "现代伊兰特"
        },
        pickup: "东方商场",
        destination: "湿地公园",
        startTime: "2023-11-12T15:45:00",
        endTime: "2023-11-12T16:20:00",
        distance: 9.2,
        price: 38.5,
        status: "completed",
        rideType: "express",
        paymentMethod: "alipay",
        passengers: 1,
        rating: 4
    }
];

// 全局状态变量
let currentPage = 1;
const ordersPerPage = 5;
let filteredOrders = [...ordersData];

// DOM元素缓存
const DOM = {
    ordersTableBody: document.getElementById('orders-table-body'),
    paginationContainer: document.getElementById('pagination'),
    searchInput: document.getElementById('search-input'),
    statusFilter: document.getElementById('status-filter'),
    sortFilter: document.getElementById('sort-filter'),
    refreshOrdersBtn: document.getElementById('refresh-orders'),
    exportOrdersBtn: document.getElementById('export-orders'),
    orderModal: document.getElementById('order-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalFooter: document.getElementById('modal-footer'),
    closeModal: document.getElementById('close-modal')
};

/**
 * 初始化页面
 */
function initOrderManagement() {
    // 初始化导航高亮
    initAdminNav();

    // 渲染订单列表
    renderOrders();

    // 绑定所有事件
    bindAllEvents();
}

/**
 * 渲染订单列表
 */
function renderOrders() {
    // 计算分页参数
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = Math.min(startIndex + ordersPerPage, filteredOrders.length);
    const currentOrders = filteredOrders.slice(startIndex, endIndex);

    // 清空表格
    DOM.ordersTableBody.innerHTML = '';

    // 渲染空状态
    if (currentOrders.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
      <td colspan="8" style="text-align: center; padding: 2rem; color: #616E7C;">
        <i class="fa fa-file-text-o" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        没有找到匹配的订单数据
      </td>
    `;
        DOM.ordersTableBody.appendChild(emptyRow);
    } else {
        // 渲染订单数据行
        currentOrders.forEach(order => {
            const row = createOrderRow(order);
            DOM.ordersTableBody.appendChild(row);
        });
    }

    // 渲染分页控件
    renderPagination(totalPages);
}

/**
 * 创建订单表格行
 * @param {Object} order - 订单数据对象
 * @returns {HTMLElement} tr元素
 */
function createOrderRow(order) {
    const row = document.createElement('tr');
    row.dataset.orderId = order.id;

    // 格式化时间
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // 订单状态文本
    const statusTextMap = {
        'pending': '待接单',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    };

    // 车型文本
    const rideTypeMap = {
        'express': '快车',
        'premium': '专车',
        'share': '拼车',
        'ride-share': '顺风车'
    };

    row.innerHTML = `
    <td>${escapeHtml(order.id)}</td>
    <td>
      <div class="user-info">
        <img src="${order.passenger.avatar}" alt="${order.passenger.name}" class="user-avatar" loading="lazy">
        <span>${escapeHtml(order.passenger.name)}</span>
      </div>
    </td>
    <td class="hidden-mobile">
      ${order.driver ? `
        <div class="user-info">
          <img src="${order.driver.avatar}" alt="${order.driver.name}" class="user-avatar" loading="lazy">
          <span>${escapeHtml(order.driver.name)}</span>
        </div>
      ` : '<span>未分配</span>'}
    </td>
    <td>
      <div>${escapeHtml(order.pickup)}</div>
      <div style="color: #6B7280; font-size: 12px;">→ ${escapeHtml(order.destination)}</div>
    </td>
    <td>${formatDate(order.startTime)}</td>
    <td>¥${order.price.toFixed(2)}</td>
    <td>
      <span class="status-badge status-${order.status}">
        ${statusTextMap[order.status]}
      </span>
    </td>
    <td>
      <button class="action-btn view-btn" data-action="view" data-id="${order.id}">
        <i class="fa fa-eye"></i> 查看
      </button>
      ${order.status !== 'completed' && order.status !== 'cancelled' ? `
        <button class="action-btn edit-btn" data-action="edit" data-id="${order.id}">
          <i class="fa fa-edit"></i> 编辑
        </button>
        <button class="action-btn cancel-btn" data-action="cancel" data-id="${order.id}">
          <i class="fa fa-times"></i> 取消
        </button>
      ` : ''}
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

    // 存储总页数用于分页逻辑
    DOM.paginationContainer.dataset.totalPages = totalPages;
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
            renderOrders();
        });
    } else if (type === 'prev') {
        btn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderOrders();
            }
        });
    } else if (type === 'next') {
        btn.addEventListener('click', () => {
            const totalPages = parseInt(DOM.paginationContainer.dataset.totalPages);
            if (currentPage < totalPages) {
                currentPage++;
                renderOrders();
            }
        });
    }

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
 * 显示订单详情
 * @param {string} orderId - 订单ID
 */
function showOrderDetail(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;

    // 格式化时间
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // 订单状态文本
    const statusTextMap = {
        'pending': '待接单',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    };

    // 车型文本
    const rideTypeMap = {
        'express': '快车',
        'premium': '专车',
        'share': '拼车',
        'ride-share': '顺风车'
    };

    // 支付方式文本
    const paymentMethodMap = {
        'alipay': '支付宝',
        'wechat': '微信支付',
        'cash': '现金支付'
    };

    DOM.modalTitle.textContent = `订单详情 #${order.id}`;
    DOM.modalBody.innerHTML = `
    <div class="order-detail-section">
      <h4>基本信息</h4>
      <div class="detail-info">
        <div>
          <div class="detail-label">订单编号</div>
          <div class="detail-value">${escapeHtml(order.id)}</div>
        </div>
        <div>
          <div class="detail-label">订单状态</div>
          <div class="detail-value"><span class="status-badge status-${order.status}">${statusTextMap[order.status]}</span></div>
        </div>
        <div>
          <div class="detail-label">车型</div>
          <div class="detail-value">${rideTypeMap[order.rideType]}</div>
        </div>
        <div>
          <div class="detail-label">支付方式</div>
          <div class="detail-value">${paymentMethodMap[order.paymentMethod]}</div>
        </div>
        <div>
          <div class="detail-label">金额</div>
          <div class="detail-value">¥${order.price.toFixed(2)}</div>
        </div>
        <div>
          <div class="detail-label">距离</div>
          <div class="detail-value">${order.distance} 公里</div>
        </div>
      </div>
    </div>
    
    <div class="order-detail-section">
      <h4>乘客信息</h4>
      <div class="detail-info">
        <div>
          <div class="detail-label">姓名</div>
          <div class="detail-value">${escapeHtml(order.passenger.name)}</div>
        </div>
        <div>
          <div class="detail-label">手机号</div>
          <div class="detail-value">${escapeHtml(order.passenger.phone)}</div>
        </div>
        <div>
          <div class="detail-label">乘车人数</div>
          <div class="detail-value">${order.passengers} 人</div>
        </div>
        ${order.rating ? `
        <div>
          <div class="detail-label">乘客评分</div>
          <div class="detail-value">
            <span style="color: #F59E0B;">${'★'.repeat(order.rating)}${'☆'.repeat(5 - order.rating)}</span>
            ${order.rating}分
          </div>
        </div>
        ` : ''}
      </div>
    </div>
    
    ${order.driver ? `
    <div class="order-detail-section">
      <h4>司机信息</h4>
      <div class="detail-info">
        <div>
          <div class="detail-label">姓名</div>
          <div class="detail-value">${escapeHtml(order.driver.name)}</div>
        </div>
        <div>
          <div class="detail-label">手机号</div>
          <div class="detail-value">${escapeHtml(order.driver.phone)}</div>
        </div>
        <div>
          <div class="detail-label">车辆</div>
          <div class="detail-value">${escapeHtml(order.driver.car)}</div>
        </div>
      </div>
    </div>
    ` : ''}
    
    <div class="order-detail-section">
      <h4>行程信息</h4>
      <div class="route-info">
        <div class="route-point">
          <div class="point-marker">
            <i class="fa fa-map-marker" style="font-size: 12px;"></i>
          </div>
          <div class="point-info">
            <div class="point-address">${escapeHtml(order.pickup)}</div>
            <div class="point-time">出发时间: ${formatDate(order.startTime)}</div>
          </div>
        </div>
        <div class="route-point">
          <div class="point-marker end">
            <i class="fa fa-flag" style="font-size: 12px;"></i>
          </div>
          <div class="point-info">
            <div class="point-address">${escapeHtml(order.destination)}</div>
            <div class="point-time">${order.endTime ? `到达时间: ${formatDate(order.endTime)}` : '尚未到达'}</div>
          </div>
        </div>
      </div>
    </div>
  `;

    // 设置模态框按钮
    DOM.modalFooter.innerHTML = `
    <button class="btn btn-outline close-modal-btn">关闭</button>
    ${(order.status === 'pending' || order.status === 'confirmed') && order.status !== 'cancelled' ? `
      <button class="btn btn-primary cancel-order-btn" data-id="${order.id}">取消订单</button>
    ` : ''}
  `;

    // 显示模态框
    DOM.orderModal.classList.add('active');

    // 绑定模态框内按钮事件
    DOM.modalFooter.querySelector('.close-modal-btn').addEventListener('click', hideModal);

    const cancelBtn = DOM.modalFooter.querySelector('.cancel-order-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            confirmCancelOrder(orderId);
        });
    }
}

/**
 * 确认取消订单
 * @param {string} orderId - 订单ID
 */
function confirmCancelOrder(orderId) {
    if (confirm('确定要取消这个订单吗？')) {
        // 更新订单状态
        const orderIndex = ordersData.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            ordersData[orderIndex].status = 'cancelled';
            filteredOrders = [...ordersData];
            applyFiltersAndSort();
            renderOrders();
            hideModal();
            showNotification('订单已成功取消');
        }
    }
}

/**
 * 隐藏模态框
 */
function hideModal() {
    DOM.orderModal.classList.remove('active');
}

/**
 * 处理搜索
 */
function handleSearch() {
    const searchTerm = DOM.searchInput.value.trim().toLowerCase();

    // 过滤订单数据
    filteredOrders = ordersData.filter(order =>
        order.id.toLowerCase().includes(searchTerm) ||
        order.passenger.name.toLowerCase().includes(searchTerm) ||
        (order.driver && order.driver.name.toLowerCase().includes(searchTerm))
    );

    applyFiltersAndSort();
}

/**
 * 处理状态筛选
 */
function handleStatusFilter() {
    applyFiltersAndSort();
}

/**
 * 处理排序
 */
function handleSort() {
    applyFiltersAndSort();
}

/**
 * 应用筛选和排序
 */
function applyFiltersAndSort() {
    // 状态筛选
    const status = DOM.statusFilter.value;
    let result = [...filteredOrders];

    if (status !== 'all') {
        result = result.filter(order => order.status === status);
    }

    // 排序
    const sortType = DOM.sortFilter.value;
    switch (sortType) {
        case 'latest':
            result.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
            break;
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'distance':
            result.sort((a, b) => a.distance - b.distance);
            break;
    }

    filteredOrders = result;
    currentPage = 1; // 重置到第一页
    renderOrders();
}

/**
 * 刷新订单列表
 */
function refreshOrders() {
    // 模拟刷新效果
    DOM.refreshOrdersBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 刷新中...';

    setTimeout(() => {
        filteredOrders = [...ordersData];
        applyFiltersAndSort();
        DOM.refreshOrdersBtn.innerHTML = '<i class="fa fa-refresh"></i> 刷新';
        showNotification('订单已刷新');
    }, 800);
}

/**
 * 导出订单数据
 */
function exportOrders() {
    // 模拟导出功能
    DOM.exportOrdersBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 导出中...';

    setTimeout(() => {
        DOM.exportOrdersBtn.innerHTML = '<i class="fa fa-download"></i> 导出数据';
        showNotification('订单数据已导出');
    }, 1000);
}

/**
 * 显示通知
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 检查是否已存在通知元素
    let notification = document.querySelector('.notification');

    if (!notification) {
        // 创建通知元素
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#10B981';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '6px';
        notification.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        notification.style.transform = 'translateY(20px)';
        document.body.appendChild(notification);
    }

    // 设置通知内容并显示
    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';

    // 3秒后隐藏通知
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
    }, 3000);
}

/**
 * 绑定所有事件
 */
function bindAllEvents() {
    // 搜索事件
    DOM.searchInput.addEventListener('input', debounce(handleSearch, 300));

    // 状态筛选事件
    DOM.statusFilter.addEventListener('change', handleStatusFilter);

    // 排序事件
    DOM.sortFilter.addEventListener('change', handleSort);

    // 刷新按钮事件
    DOM.refreshOrdersBtn.addEventListener('click', refreshOrders);

    // 导出按钮事件
    DOM.exportOrdersBtn.addEventListener('click', exportOrders);

    // 关闭模态框事件
    DOM.closeModal.addEventListener('click', hideModal);

    // 点击模态框外部关闭
    DOM.orderModal.addEventListener('click', (e) => {
        if (e.target === DOM.orderModal) {
            hideModal();
        }
    });

    // 表格操作按钮事件（事件委托）
    DOM.ordersTableBody.addEventListener('click', handleTableAction);

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
    const orderId = actionBtn.dataset.id;

    switch (action) {
        case 'view':
            showOrderDetail(orderId);
            break;
        case 'edit':
            showOrderDetail(orderId); // 编辑功能在详情页实现
            break;
        case 'cancel':
            confirmCancelOrder(orderId);
            break;
    }
}

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖处理后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

/**
 * HTML转义函数，防止XSS攻击
 * @param {string} html - 要转义的HTML字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtml(html) {
    if (!html) return '';
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initOrderManagement);