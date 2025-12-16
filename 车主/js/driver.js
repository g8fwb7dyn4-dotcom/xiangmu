// 初始化车主数据
function initDriverData() {
    // 如果没有车主信息，创建一个
    if (!localStorage.getItem('driverInfo')) {
        const driverInfo = {
            id: 'DR' + Date.now(),
            name: '张师傅',
            avatar: '../images/司机头像.png',
            rating: 4.9,
            totalOrders: 128,
            completionRate: '98%',
            status: 'offline', // online/offline
            todayOrders: 3,
            todayEarnings: 156,
            totalEarnings: 2568,
            car: {
                model: '大众 · 朗逸 2020款',
                licensePlate: '粤A12345',
                color: '黑色'
            }
        };
        localStorage.setItem('driverInfo', JSON.stringify(driverInfo));
    }

    // 如果没有订单数据，创建一些示例数据
    if (!localStorage.getItem('driverOrders')) {
        const orders = [
            {
                id: 'OD' + Date.now(),
                status: 'pending', // pending/confirmed/completed/cancelled
                type: 'express',
                pickup: '东方广场A座',
                destination: '大学城科技园B区',
                distance: '5.2公里',
                estimatedTime: '15分钟',
                estimatedPrice: 35.5,
                time: new Date().toISOString(),
                passenger: {
                    name: '李先生',
                    rating: 4.8
                }
            },
            {
                id: 'OD' + (Date.now() - 300000), // 5分钟前
                status: 'pending',
                type: 'share',
                pickup: '中央公园南门',
                destination: '星河小区',
                distance: '3.8公里',
                estimatedTime: '10分钟',
                estimatedPrice: 28.0,
                time: new Date(Date.now() - 300000).toISOString(),
                passenger: {
                    name: '王女士',
                    rating: 4.7
                }
            },
            {
                id: 'OD' + (Date.now() - 900000), // 15分钟前
                status: 'confirmed',
                type: 'premium',
                pickup: '火车站西广场',
                destination: '国际会展中心',
                distance: '8.5公里',
                estimatedTime: '25分钟',
                estimatedPrice: 68.0,
                time: new Date(Date.now() - 900000).toISOString(),
                passenger: {
                    name: '张先生',
                    rating: 4.9
                }
            },
            {
                id: 'OD' + (Date.now() - 86400000), // 昨天
                status: 'completed',
                type: 'express',
                pickup: '西湖景区东门',
                destination: '市政府',
                distance: '4.2公里',
                estimatedTime: '12分钟',
                estimatedPrice: 32.5,
                time: new Date(Date.now() - 86400000).toISOString(),
                passenger: {
                    name: '赵女士',
                    rating: 4.6
                }
            }
        ];
        localStorage.setItem('driverOrders', JSON.stringify(orders));
    }
}

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

// 格式化时间
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

// 渲染订单卡片
function renderOrderCard(order) {
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.dataset.orderId = order.id;

    let actionButtons = '';
    if (order.status === 'pending') {
        actionButtons = `
            <button class="btn btn-primary accept-order" data-id="${order.id}">接单</button>
            <button class="btn btn-secondary decline-order" data-id="${order.id}">拒绝</button>
        `;
    } else if (order.status === 'confirmed') {
        actionButtons = `
            <button class="btn btn-primary start-trip" data-id="${order.id}">开始行程</button>
            <button class="btn btn-secondary cancel-order" data-id="${order.id}">取消</button>
        `;
    } else if (order.status === 'in-progress') {
        actionButtons = `
            <button class="btn btn-primary complete-trip" data-id="${order.id}">完成行程</button>
        `;
    }

    orderCard.innerHTML = `
        <div class="order-header">
            <span class="order-id">订单 #${order.id.substring(order.id.length - 6)}</span>
            <span class="order-time">${formatTime(order.time)}</span>
        </div>
        
        <div class="order-route">
            <div class="route-point start">
                <div class="point-marker">
                    <i class="fa fa-map-marker"></i>
                </div>
                <div class="point-info">
                    <p>${order.pickup}</p>
                </div>
            </div>
            <div class="route-point end">
                <div class="point-marker">
                    <i class="fa fa-flag"></i>
                </div>
                <div class="point-info">
                    <p>${order.destination}</p>
                </div>
            </div>
        </div>
        
        <div class="order-details">
            <div>
                <span class="order-type">${getRideTypeName(order.type)}</span>
                <span style="margin-left: 10px;">${order.distance} · ${order.estimatedTime}</span>
            </div>
            <div class="order-price">¥${order.estimatedPrice.toFixed(2)}</div>
            <div class="order-actions">
                ${actionButtons}
            </div>
        </div>
    `;

    return orderCard;
}

// 加载附近订单
function loadNearbyOrders() {
    const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
    const container = document.getElementById('orders-container');

    if (!container) return;

    container.innerHTML = '';

    // 只显示待接单的订单
    const pendingOrders = orders.filter(order => order.status === 'pending');

    if (pendingOrders.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">当前没有附近的订单</p>';
        return;
    }

    pendingOrders.forEach(order => {
        const orderCard = renderOrderCard(order);
        container.appendChild(orderCard);
    });

    // 添加接单事件监听
    document.querySelectorAll('.accept-order').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            acceptOrder(orderId);
        });
    });

    // 添加拒绝事件监听
    document.querySelectorAll('.decline-order').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            declineOrder(orderId);
        });
    });
}

// 加载待处理订单
function loadPendingOrders() {
    const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
    const container = document.getElementById('pending-orders-container');

    if (!container) return;

    container.innerHTML = '';

    // 只显示已接单但未完成的订单
    const pendingOrders = orders.filter(order =>
        order.status === 'confirmed' || order.status === 'in-progress'
    );

    if (pendingOrders.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">当前没有待处理的订单</p>';
        return;
    }

    pendingOrders.forEach(order => {
        const orderCard = renderOrderCard(order);
        container.appendChild(orderCard);
    });

    // 添加开始行程事件监听
    document.querySelectorAll('.start-trip').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            startTrip(orderId);
        });
    });

    // 添加完成行程事件监听
    document.querySelectorAll('.complete-trip').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            completeTrip(orderId);
        });
    });

    // 添加取消订单事件监听
    document.querySelectorAll('.cancel-order').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            cancelOrder(orderId);
        });
    });
}

// 加载所有订单
function loadAllOrders(status = 'all') {
    const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
    const container = document.getElementById('all-orders-container');

    if (!container) return;

    container.innerHTML = '';

    // 根据筛选条件过滤订单
    let filteredOrders = orders;
    if (status !== 'all') {
        filteredOrders = orders.filter(order => order.status === status);
    }

    // 按时间排序，最新的在前面
    filteredOrders.sort((a, b) => new Date(b.time) - new Date(a.time));

    if (filteredOrders.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">没有找到相关订单</p>';
        return;
    }

    filteredOrders.forEach(order => {
        const orderCard = renderOrderCard(order);
        container.appendChild(orderCard);
    });

    // 添加事件监听
    document.querySelectorAll('.accept-order').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            acceptOrder(orderId);
        });
    });

    document.querySelectorAll('.start-trip').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            startTrip(orderId);
        });
    });

    document.querySelectorAll('.complete-trip').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('data-id');
            completeTrip(orderId);
        });
    });
}

// 接单
function acceptOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex].status = 'confirmed';
        localStorage.setItem('driverOrders', JSON.stringify(orders));

        // 更新车主统计数据
        const driverInfo = JSON.parse(localStorage.getItem('driverInfo') || '{}');
        driverInfo.todayOrders = (driverInfo.todayOrders || 0) + 1;
        localStorage.setItem('driverInfo', JSON.stringify(driverInfo));

        // 重新加载订单列表
        loadNearbyOrders();
        loadPendingOrders();
        loadAllOrders();

        alert('接单成功！');
    }
}

// 拒绝订单
function declineOrder(orderId) {
    if (confirm('确定要拒绝此订单吗？')) {
        const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
        const orderIndex = orders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            orders.splice(orderIndex, 1);
            localStorage.setItem('driverOrders', JSON.stringify(orders));

            // 重新加载订单列表
            loadNearbyOrders();
            loadAllOrders();
        }
    }
}

// 开始行程
function startTrip(orderId) {
    const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex].status = 'in-progress';
        localStorage.setItem('driverOrders', JSON.stringify(orders));

        // 重新加载订单列表
        loadPendingOrders();
        loadAllOrders();

        alert('已开始行程，请前往接乘客');
    }
}

// 完成行程
function completeTrip(orderId) {
    const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
    const orderIndex = orders.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex].status = 'completed';
        localStorage.setItem('driverOrders', JSON.stringify(orders));

        // 更新车主统计数据
        const driverInfo = JSON.parse(localStorage.getItem('driverInfo') || '{}');
        driverInfo.totalOrders = (driverInfo.totalOrders || 0) + 1;
        driverInfo.todayEarnings = (driverInfo.todayEarnings || 0) + orders[orderIndex].estimatedPrice;
        driverInfo.totalEarnings = (driverInfo.totalEarnings || 0) + orders[orderIndex].estimatedPrice;
        localStorage.setItem('driverInfo', JSON.stringify(driverInfo));

        // 重新加载订单列表
        loadPendingOrders();
        loadAllOrders();
        updateDriverStats();

        alert('行程已完成，感谢您的服务！');
    }
}

// 取消订单
function cancelOrder(orderId) {
    if (confirm('确定要取消此订单吗？')) {
        const orders = JSON.parse(localStorage.getItem('driverOrders') || '[]');
        const orderIndex = orders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = 'cancelled';
            localStorage.setItem('driverOrders', JSON.stringify(orders));

            // 重新加载订单列表
            loadPendingOrders();
            loadAllOrders();
        }
    }
}

// 更新车主统计数据
function updateDriverStats() {
    const driverInfo = JSON.parse(localStorage.getItem('driverInfo') || '{}');

    // 更新状态显示
    const statusElement = document.getElementById('current-status');
    const statusSwitch = document.getElementById('status-switch');

    if (statusElement && statusSwitch) {
        statusElement.textContent = driverInfo.status === 'online' ? '在线' : '离线';
        statusElement.className = driverInfo.status === 'online' ? 'online' : '';
        statusSwitch.checked = driverInfo.status === 'online';
    }

    // 更新统计数字
    if (document.getElementById('today-orders')) {
        document.getElementById('today-orders').textContent = driverInfo.todayOrders || 0;
        document.getElementById('today-earnings').textContent = `¥${(driverInfo.todayEarnings || 0).toFixed(0)}`;
        document.getElementById('total-orders').textContent = driverInfo.totalOrders || 0;
        document.getElementById('rating').textContent = driverInfo.rating || 0;
    }

    // 更新个人信息页面
    if (document.getElementById('profile-name')) {
        document.getElementById('profile-name').textContent = driverInfo.name || '车主';
        document.getElementById('total-completed').textContent = driverInfo.totalOrders || 0;
        document.getElementById('completion-rate').textContent = driverInfo.completionRate || '0%';
        document.getElementById('driver-rating').textContent = driverInfo.rating || 0;

        // 更新车辆信息
        if (driverInfo.car) {
            document.getElementById('car-model').textContent = driverInfo.car.model || '';
            document.getElementById('license-plate').textContent = driverInfo.car.licensePlate || '';
            document.getElementById('car-color').textContent = driverInfo.car.color || '';
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 初始化数据
    initDriverData();

    // 更新车主状态
    updateDriverStats();

    // 加载订单
    loadNearbyOrders();
    loadPendingOrders();
    loadAllOrders();

    // 状态切换开关事件
    const statusSwitch = document.getElementById('status-switch');
    if (statusSwitch) {
        statusSwitch.addEventListener('change', function () {
            const driverInfo = JSON.parse(localStorage.getItem('driverInfo') || '{}');
            driverInfo.status = this.checked ? 'online' : 'offline';
            localStorage.setItem('driverInfo', JSON.stringify(driverInfo));
            updateDriverStats();

            if (this.checked) {
                alert('已切换为在线状态，可接收新订单');
                loadNearbyOrders();
            } else {
                alert('已切换为离线状态，不会再接收到新订单');
            }
        });
    }

    // 加载更多订单按钮事件
    const loadMoreBtn = document.getElementById('load-more-orders');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 加载中...';

            // 模拟加载延迟
            setTimeout(() => {
                loadNearbyOrders();
                this.innerHTML = '<i class="fa fa-refresh"></i> 查看更多订单';
            }, 1000);
        });
    }

    // 订单筛选事件
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            // 移除所有活跃状态
            document.querySelectorAll('.filter-tab').forEach(t => {
                t.classList.remove('active');
            });

            // 添加当前活跃状态
            this.classList.add('active');

            // 加载对应状态的订单
            const status = this.getAttribute('data-status');
            loadAllOrders(status);
        });
    });

    // 退出登录事件
    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('确定要退出登录吗？')) {
                // 可以在这里清除登录状态
                alert('已退出登录');
                window.location.href = '../登录注册界面.html';
            }
        });
    });
});