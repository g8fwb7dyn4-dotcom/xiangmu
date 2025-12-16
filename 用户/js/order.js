// 订单页面逻辑
document.addEventListener('DOMContentLoaded', function () {
    // 检查用户登录状态
    checkUserLoginStatus();

    // 初始化订单数据
    initOrderData();

    // 加载并显示订单
    loadOrders();

    // 订单筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // 更新活跃状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选订单
            const filter = this.getAttribute('data-filter');
            filterOrders(filter);
        });
    });

    // 移动端菜单交互
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 退出登录功能
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', function () {
        if (confirm('确定要退出登录吗？')) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            checkUserLoginStatus();
            window.location.href = '主页.html';
        }
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 订单详情模态框交互
    const modal = document.querySelector('.order-detail-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');

    // 关闭模态框
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // 点击ESC键关闭模态框
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 订单卡片点击事件 - 打开详情
    document.querySelector('.orders-container').addEventListener('click', function (e) {
        const orderCard = e.target.closest('.order-card');
        if (orderCard && !e.target.closest('.order-actions')) {
            const orderId = orderCard.getAttribute('data-id');
            openOrderDetail(orderId);
        }
    });

    // 订单操作按钮事件委托
    document.querySelector('.orders-container').addEventListener('click', function (e) {
        const cancelBtn = e.target.closest('.btn-cancel');
        const contactBtn = e.target.closest('.btn-secondary');

        if (cancelBtn) {
            e.stopPropagation();
            const orderId = cancelBtn.getAttribute('data-id');
            cancelOrder(orderId);
        }

        if (contactBtn) {
            e.stopPropagation();
            const orderId = contactBtn.getAttribute('data-id');
            contactDriver(orderId);
        }
    });
});

// 检查用户登录状态
function checkUserLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const registerBtn = document.getElementById('register-btn');
    const mobileRegisterBtn = document.getElementById('mobile-register-btn');

    if (isLoggedIn) {
        // 已登录，显示用户名
        const username = localStorage.getItem('username') || '用户';
        loginBtn.textContent = username;
        mobileLoginBtn.textContent = username;

        // 隐藏注册按钮
        registerBtn.style.display = 'none';
        mobileRegisterBtn.style.display = 'none';

        // 登录按钮点击事件（已登录状态）
        loginBtn.addEventListener('click', function () {
            alert('跳转到个人中心');
        });

        mobileLoginBtn.addEventListener('click', function () {
            alert('跳转到个人中心');
        });
    } else {
        // 未登录，显示登录按钮
        loginBtn.textContent = '登录';
        mobileLoginBtn.textContent = '登录';

        // 显示注册按钮
        registerBtn.style.display = 'inline-block';
        mobileRegisterBtn.style.display = 'inline-block';

        // 登录按钮点击事件（未登录状态）
        loginBtn.addEventListener('click', function () {
            window.location.href = '登录注册界面.html';
        });

        mobileLoginBtn.addEventListener('click', function () {
            window.location.href = '登录注册界面.html';
        });

        // 注册按钮点击事件
        registerBtn.addEventListener('click', function () {
            window.location.href = '登录注册界面.html#register';
        });

        mobileRegisterBtn.addEventListener('click', function () {
            window.location.href = '登录注册界面.html#register';
        });
    }
}

// 初始化订单数据（如果本地存储中没有）
function initOrderData() {
    if (!localStorage.getItem('orders')) {
        const sampleOrders = [
            {
                id: 'KL' + Date.now(),
                status: 'completed',
                pickup: '中央公园',
                destination: '科技园',
                startTime: new Date(Date.now() - 86400000).toISOString(), // 昨天
                endTime: new Date(Date.now() - 82800000).toISOString(), // 昨天提前1小时
                driver: {
                    name: '张师傅',
                    car: '大众朗逸',
                    rating: 4.9,
                    phone: '138****5678'
                },
                price: 35.5,
                passengers: 1,
                rideType: 'express',
                paymentMethod: '微信支付',
                distance: 8.5,
                timeline: [
                    { time: new Date(Date.now() - 86400000 - 1800000).toISOString(), content: '订单创建成功' },
                    { time: new Date(Date.now() - 86400000 - 1200000).toISOString(), content: '张师傅已接单' },
                    { time: new Date(Date.now() - 86400000 - 600000).toISOString(), content: '司机已到达出发点' },
                    { time: new Date(Date.now() - 86400000).toISOString(), content: '开始行程' },
                    { time: new Date(Date.now() - 82800000).toISOString(), content: '行程结束' },
                    { time: new Date(Date.now() - 82800000 + 60000).toISOString(), content: '支付完成，金额35.5元' }
                ]
            },
            {
                id: 'KL' + (Date.now() + 1),
                status: 'confirmed',
                pickup: '东方广场',
                destination: '大学城',
                startTime: new Date(Date.now() + 3600000).toISOString(), // 1小时后
                endTime: null,
                driver: {
                    name: '李师傅',
                    car: '丰田卡罗拉',
                    rating: 4.8,
                    phone: '139****1234'
                },
                price: 42.0,
                passengers: 2,
                rideType: 'premium',
                paymentMethod: '支付宝',
                distance: 12.3,
                timeline: [
                    { time: new Date(Date.now() - 1800000).toISOString(), content: '订单创建成功' },
                    { time: new Date(Date.now() - 1500000).toISOString(), content: '李师傅已接单' },
                    { time: new Date(Date.now() - 1440000).toISOString(), content: '订单已确认' }
                ]
            },
            {
                id: 'KL' + (Date.now() + 2),
                status: 'pending',
                pickup: '西湖景区',
                destination: '火车站',
                startTime: new Date(Date.now() + 7200000).toISOString(), // 2小时后
                endTime: null,
                driver: null,
                price: 28.5,
                passengers: 1,
                rideType: 'share',
                paymentMethod: '微信支付',
                distance: 5.2,
                timeline: [
                    { time: new Date(Date.now() - 600000).toISOString(), content: '订单创建成功，等待司机接单' }
                ]
            }
        ];

        localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
}

// 加载并显示订单
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordersContainer = document.querySelector('.orders-container');
    const noOrdersMsg = document.querySelector('.no-orders');

    // 清空容器
    ordersContainer.innerHTML = '';

    if (orders.length === 0) {
        // 没有订单时显示提示
        noOrdersMsg.style.display = 'block';
        return;
    }

    // 隐藏无订单提示
    noOrdersMsg.style.display = 'none';

    // 按时间排序（最新的在前）
    orders.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    // 渲染订单
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersContainer.appendChild(orderCard);
    });
}

// 创建订单卡片
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.setAttribute('data-id', order.id);
    card.setAttribute('data-status', order.status);

    // 格式化时间
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // 获取车型名称
    const getRideTypeName = (type) => {
        const typeMap = {
            'express': '快车',
            'premium': '专车',
            'share': '拼车',
            'ride-share': '顺风车'
        };
        return typeMap[type] || type;
    };

    // 订单状态文本
    const statusTextMap = {
        'pending': '待接单',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    };

    card.innerHTML = `
        <div class="order-header">
            <div class="order-id">订单编号: ${order.id}</div>
            <div class="order-status status-${order.status}">${statusTextMap[order.status]}</div>
        </div>
        
        <div class="order-info">
            <div class="location-info">
                <div class="location-icon">
                    <i class="fa fa-map-marker"></i>
                </div>
                <div class="location-details">
                    <div class="location-place">${order.pickup}</div>
                    <div class="location-time">出发时间: ${formatTime(order.startTime)}</div>
                </div>
            </div>
            
            <div class="location-info">
                <div class="location-icon">
                    <i class="fa fa-flag"></i>
                </div>
                <div class="location-details">
                    <div class="location-place">${order.destination}</div>
                    <div class="location-time">${order.endTime ? `到达时间: ${formatTime(order.endTime)}` : ''}</div>
                </div>
            </div>
        </div>
        
        <div class="order-details">
            <div class="detail-item"><i class="fa fa-car"></i> 车型: <span>${getRideTypeName(order.rideType)}</span></div>
            <div class="detail-item"><i class="fa fa-user"></i> 乘车人数: <span>${order.passengers}人</span></div>
            ${order.driver ? `<div class="detail-item"><i class="fa fa-id-card"></i> 司机: <span>${order.driver.name} (${order.driver.car})</span></div>` : ''}
        </div>
        
        <div class="order-footer">
            <div class="order-price"><i class="fa fa-rmb"></i> ¥${order.price.toFixed(2)}</div>
            <div class="order-actions">
                ${order.status === 'pending' || order.status === 'confirmed' ? `
                    <button class="order-btn btn-cancel" data-id="${order.id}"><i class="fa fa-times"></i> 取消订单</button>
                ` : ''}
                ${order.status === 'confirmed' ? `
                    <button class="order-btn btn-secondary" data-id="${order.id}"><i class="fa fa-phone"></i> 联系司机</button>
                ` : ''}
                ${order.status === 'completed' ? `
                    <button class="order-btn btn-primary" data-id="${order.id}"><i class="fa fa-comment"></i> 评价</button>
                ` : ''}
            </div>
        </div>
    `;

    return card;
}

// 筛选订单
function filterOrders(filter) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordersContainer = document.querySelector('.orders-container');
    const noOrdersMsg = document.querySelector('.no-orders');

    // 清空容器
    ordersContainer.innerHTML = '';

    // 筛选订单
    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(order => order.status === filter);
    }

    // 按时间排序
    filteredOrders.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    if (filteredOrders.length === 0) {
        // 没有匹配的订单时显示提示
        noOrdersMsg.style.display = 'block';
        return;
    }

    // 隐藏无订单提示
    noOrdersMsg.style.display = 'none';

    // 渲染筛选后的订单
    filteredOrders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersContainer.appendChild(orderCard);
    });
}

// 打开订单详情
function openOrderDetail(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    // 格式化时间
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // 获取车型名称
    const getRideTypeName = (type) => {
        const typeMap = {
            'express': '快车',
            'premium': '专车',
            'share': '拼车',
            'ride-share': '顺风车'
        };
        return typeMap[type] || type;
    };

    // 订单状态文本
    const statusTextMap = {
        'pending': '待接单',
        'confirmed': '已确认',
        'completed': '已完成',
        'cancelled': '已取消'
    };

    // 填充详情内容
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="detail-section">
            <h4><i class="fa fa-info-circle"></i> 基本信息</h4>
            <div class="detail-list">
                <div class="detail-item">
                    <div class="detail-label">订单编号</div>
                    <div class="detail-value">${order.id}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">订单状态</div>
                    <div class="detail-value"><span class="order-status status-${order.status}">${statusTextMap[order.status]}</span></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">车型</div>
                    <div class="detail-value">${getRideTypeName(order.rideType)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">乘车人数</div>
                    <div class="detail-value">${order.passengers}人</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">支付方式</div>
                    <div class="detail-value">${order.paymentMethod || '未支付'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">总金额</div>
                    <div class="detail-value">¥${order.price.toFixed(2)}</div>
                </div>
                ${order.distance ? `
                <div class="detail-item">
                    <div class="detail-label">预计里程</div>
                    <div class="detail-value">${order.distance}公里</div>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div class="detail-section">
            <h4><i class="fa fa-map"></i> 行程信息</h4>
            <div class="detail-list">
                <div class="detail-item-full route-detail">
                    <div class="route-point">
                        <div class="route-marker">
                            <i class="fa fa-map-marker"></i>
                        </div>
                        <div class="route-info">
                            <div class="route-address">${order.pickup}</div>
                            <div class="route-time">出发时间: ${formatTime(order.startTime)}</div>
                        </div>
                    </div>
                    <div class="route-point">
                        <div class="route-marker end">
                            <i class="fa fa-flag"></i>
                        </div>
                        <div class="route-info">
                            <div class="route-address">${order.destination}</div>
                            <div class="route-time">${order.endTime ? `到达时间: ${formatTime(order.endTime)}` : '到达时间: 未到达'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        ${order.driver ? `
        <div class="detail-section">
            <h4><i class="fa fa-user"></i> 司机信息</h4>
            <div class="detail-list">
                <div class="detail-item">
                    <div class="detail-label">司机姓名</div>
                    <div class="detail-value">${order.driver.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">车辆信息</div>
                    <div class="detail-value">${order.driver.car}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">司机评分</div>
                    <div class="detail-value">${order.driver.rating} <i class="fa fa-star" style="color: #FFC107;"></i></div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">联系电话</div>
                    <div class="detail-value">${order.driver.phone}</div>
                </div>
            </div>
        </div>
        ` : ''}
        
        <div class="detail-section">
            <h4><i class="fa fa-history"></i> 订单历史记录</h4>
            <div class="timeline">
                ${order.timeline && order.timeline.length ? order.timeline.map(item => `
                <div class="timeline-item">
                    <div class="timeline-time">${formatTime(item.time)}</div>
                    <div class="timeline-content">${item.content}</div>
                </div>
                `).join('') : '<div class="timeline-item"><div class="timeline-content">暂无记录</div></div>'}
            </div>
        </div>
    `;

    // 填充底部按钮
    const modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = '';

    if (order.status === 'pending' || order.status === 'confirmed') {
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'order-btn btn-cancel';
        cancelBtn.innerHTML = '<i class="fa fa-times"></i> 取消订单';
        cancelBtn.setAttribute('data-id', order.id);
        cancelBtn.addEventListener('click', function () {
            cancelOrder(order.id);
            document.querySelector('.order-detail-modal').classList.remove('active');
        });
        modalFooter.appendChild(cancelBtn);
    }

    if (order.status === 'confirmed' && order.driver) {
        const contactBtn = document.createElement('button');
        contactBtn.className = 'order-btn btn-secondary';
        contactBtn.innerHTML = '<i class="fa fa-phone"></i> 联系司机';
        contactBtn.setAttribute('data-id', order.id);
        contactBtn.addEventListener('click', function () {
            contactDriver(order.id);
        });
        modalFooter.appendChild(contactBtn);
    }

    if (order.status === 'completed') {
        const rateBtn = document.createElement('button');
        rateBtn.className = 'order-btn btn-primary';
        rateBtn.innerHTML = '<i class="fa fa-comment"></i> 评价此次行程';
        rateBtn.setAttribute('data-id', order.id);
        rateBtn.addEventListener('click', function () {
            alert('跳转到评价页面');
        });
        modalFooter.appendChild(rateBtn);
    }

    // 显示模态框
    document.querySelector('.order-detail-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 取消订单
function cancelOrder(orderId) {
    if (confirm('确定要取消订单吗？取消订单可能会产生违约金。')) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                // 添加取消时间线记录
                const cancelTime = new Date().toISOString();
                const newTimeline = order.timeline || [];
                newTimeline.push({
                    time: cancelTime,
                    content: '订单已取消'
                });

                return {
                    ...order,
                    status: 'cancelled',
                    timeline: newTimeline
                };
            }
            return order;
        });

        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        loadOrders();

        // 如果有活跃的筛选条件，重新应用筛选
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            filterOrders(activeFilter.getAttribute('data-filter'));
        }
    }
}

// 联系司机
function contactDriver(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);

    if (order && order.driver && order.driver.phone) {
        alert(`司机电话：${order.driver.phone}\n是否拨打电话？`);
    } else {
        alert('无法联系司机，司机信息不存在');
    }
}