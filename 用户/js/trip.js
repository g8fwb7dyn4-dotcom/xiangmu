// 行程页面逻辑
document.addEventListener('DOMContentLoaded', function () {
    // 检查用户登录状态
    checkUserLoginStatus();

    // 初始化行程数据
    initTripData();

    // 加载并显示历史行程
    loadPastTrips();

    // 行程状态模拟更新
    simulateTripStatusUpdates();

    // 行程操作按钮事件
    document.getElementById('cancel-trip').addEventListener('click', function () {
        if (confirm('确定要取消当前行程吗？可能会产生取消费用。')) {
            updateTripStatus('cancelled');
            showToast('行程已取消');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });

    document.getElementById('confirm-pickup').addEventListener('click', function () {
        updateTripStatus('pickup');
        this.style.display = 'none';
        document.getElementById('confirm-arrival').style.display = 'block';
        showToast('已确认上车，祝旅途愉快！');
    });

    document.getElementById('confirm-arrival').addEventListener('click', function () {
        updateTripStatus('arrived');
        this.style.display = 'none';
        document.getElementById('cancel-trip').style.display = 'none';

        // 显示评价提示
        setTimeout(() => {
            if (confirm('行程已完成，是否为司机评分？')) {
                showToast('跳转到评分页面');
                // 实际应用中这里会跳转到评分页面
            }
        }, 1000);
    });

    // 司机联系按钮事件
    document.querySelector('.btn-call').addEventListener('click', function () {
        showToast('正在拨打李师傅电话...');
    });

    document.querySelector('.btn-message').addEventListener('click', function () {
        showToast('打开与李师傅的聊天窗口');
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
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (confirm('确定要退出登录吗？')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                checkUserLoginStatus();
                window.location.href = '主页.html';
            }
        });
    }
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
        loginBtn.classList.add('logged-in-user');

        if (mobileLoginBtn) {
            mobileLoginBtn.textContent = username;
            mobileLoginBtn.classList.add('logged-in-user');
        }

        // 隐藏注册按钮
        if (registerBtn) registerBtn.style.display = 'none';
        if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'none';

        // 登录按钮点击事件（已登录状态）
        loginBtn.addEventListener('click', function () {
            window.location.href = '我的.html';
        });

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                window.location.href = '我的.html';
            });
        }
    } else {
        // 未登录，显示登录按钮
        loginBtn.textContent = '登录';
        if (mobileLoginBtn) mobileLoginBtn.textContent = '登录';

        // 显示注册按钮
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'inline-block';

        // 登录按钮点击事件（未登录状态）
        loginBtn.addEventListener('click', function () {
            window.location.href = '登录注册界面.html';
        });

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                window.location.href = '登录注册界面.html';
            });
        }

        // 注册按钮点击事件
        if (registerBtn) {
            registerBtn.addEventListener('click', function () {
                window.location.href = '登录注册界面.html#register-form';
            });
        }

        if (mobileRegisterBtn) {
            mobileRegisterBtn.addEventListener('click', function () {
                window.location.href = '登录注册界面.html#register-form';
            });
        }
    }
}

// 初始化行程数据
function initTripData() {
    // 如果没有当前行程，创建一个
    if (!localStorage.getItem('currentTrip')) {
        const currentTrip = {
            id: 'TP' + Date.now(),
            status: 'waiting', // waiting, pickup, arrived, cancelled
            pickup: '东方广场A座',
            destination: '大学城科技园B区',
            startTime: new Date().toISOString(),
            estimatedArrivalTime: new Date(Date.now() + 3600000).toISOString(), // 1小时后
            driver: {
                name: '李师傅',
                avatar: './images/司机头像.png',
                car: '丰田卡罗拉',
                licensePlate: '粤A12345',
                rating: 4.8,
                distance: 1.2, // 公里
                estimatedTime: 3 // 分钟
            },
            price: 42.0,
            passengers: 2,
            rideType: 'premium'
        };
        localStorage.setItem('currentTrip', JSON.stringify(currentTrip));
    } else {
        // 同步当前行程状态到UI
        const currentTrip = JSON.parse(localStorage.getItem('currentTrip'));
        updateTripStatus(currentTrip.status);
    }

    // 如果没有历史行程，创建一些示例数据
    if (!localStorage.getItem('pastTrips')) {
        const pastTrips = [
            {
                id: 'TP' + (Date.now() - 86400000), // 昨天
                pickup: '中央公园南门',
                destination: '科技园大厦',
                startTime: new Date(Date.now() - 86400000 - 3600000).toISOString(), // 昨天的1小时前
                endTime: new Date(Date.now() - 86400000).toISOString(), // 昨天
                duration: '45分钟',
                driver: {
                    name: '张师傅',
                    car: '大众朗逸'
                },
                price: 35.5,
                rideType: 'express',
                rating: 5
            },
            {
                id: 'TP' + (Date.now() - 2 * 86400000), // 前天
                pickup: '西湖景区东门',
                destination: '火车站',
                startTime: new Date(Date.now() - 2 * 86400000 - 5400000).toISOString(), // 前天的1.5小时前
                endTime: new Date(Date.now() - 2 * 86400000).toISOString(), // 前天
                duration: '55分钟',
                driver: {
                    name: '王师傅',
                    car: '本田思域'
                },
                price: 48.0,
                rideType: 'share',
                rating: 4
            }
        ];
        localStorage.setItem('pastTrips', JSON.stringify(pastTrips));
    }
}

// 加载并显示历史行程
function loadPastTrips() {
    const pastTrips = JSON.parse(localStorage.getItem('pastTrips') || '[]');
    const container = document.querySelector('.past-trips-container');
    const emptyState = document.querySelector('.empty-state');

    // 清空容器
    container.innerHTML = '';

    // 检查是否有历史行程
    if (pastTrips.length === 0) {
        emptyState.style.display = 'block';
        return;
    } else {
        emptyState.style.display = 'none';
    }

    // 按时间排序（最新的在前）
    pastTrips.sort((a, b) => new Date(b.endTime) - new Date(a.endTime));

    // 渲染历史行程
    pastTrips.forEach((trip, index) => {
        // 添加延迟以创建顺序动画效果
        setTimeout(() => {
            const tripCard = createPastTripCard(trip);
            container.appendChild(tripCard);
        }, index * 100);
    });
}

// 创建历史行程卡片
function createPastTripCard(trip) {
    const card = document.createElement('div');
    card.className = 'past-trip-card animate-fade-in';

    // 格式化日期
    const formatDate = (dateString) => {
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

    card.innerHTML = `
        <div class="past-trip-header">
            <div class="trip-date"><i class="fa fa-clock-o"></i>${formatDate(trip.endTime)}</div>
            <div class="trip-type">${getRideTypeName(trip.rideType)}</div>
        </div>
        
        <div class="past-trip-route">
            <div class="route-point start-point">
                <div class="point-marker">
                    <i class="fa fa-map-marker"></i>
                </div>
                <div class="point-info">
                    <p>${trip.pickup}</p>
                </div>
            </div>
            <div class="route-point end-point">
                <div class="point-marker">
                    <i class="fa fa-flag"></i>
                </div>
                <div class="point-info">
                    <p>${trip.destination}</p>
                </div>
            </div>
        </div>
        
        <div class="past-trip-footer">
            <div class="trip-duration"><i class="fa fa-clock-o"></i> ${trip.duration}</div>
            <div class="trip-driver">${trip.driver.name} · ${trip.driver.car}</div>
            <div class="trip-price">¥${trip.price.toFixed(2)}</div>
        </div>
    `;

    // 添加点击事件查看详情
    card.addEventListener('click', function () {
        showTripDetails(trip);
    });

    return card;
}

// 显示行程详情
function showTripDetails(trip) {
    // 这里可以实现行程详情弹窗
    alert(`行程详情:\nID: ${trip.id}\n从 ${trip.pickup} 到 ${trip.destination}\n价格: ¥${trip.price.toFixed(2)}`);
}

// 更新行程状态
function updateTripStatus(status) {
    // 更新本地存储
    let currentTrip = JSON.parse(localStorage.getItem('currentTrip') || '{}');
    if (currentTrip) {
        currentTrip.status = status;
        localStorage.setItem('currentTrip', JSON.stringify(currentTrip));
    }

    // 更新UI状态点
    const statusDots = document.querySelectorAll('.status-dot');
    statusDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.status === status) {
            dot.classList.add('active');
        } else if (status === 'pickup' && dot.dataset.status === 'waiting') {
            dot.classList.add('active');
        } else if (status === 'arrived' && (dot.dataset.status === 'waiting' || dot.dataset.status === 'pickup')) {
            dot.classList.add('active');
        }
    });

    // 根据状态更新按钮显示
    const cancelBtn = document.getElementById('cancel-trip');
    const confirmPickupBtn = document.getElementById('confirm-pickup');
    const confirmArrivalBtn = document.getElementById('confirm-arrival');

    switch (status) {
        case 'waiting':
            cancelBtn.style.display = 'block';
            confirmPickupBtn.style.display = 'none';
            confirmArrivalBtn.style.display = 'none';
            break;
        case 'pickup':
            cancelBtn.style.display = 'block';
            confirmPickupBtn.style.display = 'none';
            confirmArrivalBtn.style.display = 'block';
            break;
        case 'arrived':
            cancelBtn.style.display = 'none';
            confirmPickupBtn.style.display = 'none';
            confirmArrivalBtn.style.display = 'none';
            break;
        case 'cancelled':
            cancelBtn.style.display = 'none';
            confirmPickupBtn.style.display = 'none';
            confirmArrivalBtn.style.display = 'none';
            break;
    }
}

// 模拟行程状态更新
function simulateTripStatusUpdates() {
    const currentTrip = JSON.parse(localStorage.getItem('currentTrip') || '{}');

    if (currentTrip.status === 'waiting') {
        // 模拟司机距离更新
        let distance = currentTrip.driver.distance || 1.2;
        const distanceElement = document.getElementById('driver-distance');

        const updateDistance = () => {
            // 只有在等待状态下才更新距离
            if (currentTrip.status === 'waiting') {
                distance -= 0.1;
                let minutes = Math.round(distance * 2.5); // 假设每公里需要2.5分钟

                if (distance <= 0) {
                    distance = 0;
                    minutes = 1;
                    distanceElement.textContent = `已到达出发地，等待您上车`;
                    distanceElement.parentElement.classList.add('animate-pulse');
                    clearInterval(interval);

                    // 自动切换到已接驾状态（实际应用中应该由司机确认）
                    setTimeout(() => {
                        updateTripStatus('pickup');
                        document.getElementById('confirm-pickup').style.display = 'none';
                        document.getElementById('confirm-arrival').style.display = 'block';
                    }, 5000);
                } else {
                    distanceElement.textContent = `距离您${distance.toFixed(1)}公里，约${minutes}分钟到达`;
                }
            }
        };

        const interval = setInterval(updateDistance, 3000);
    }
}

// 显示提示消息
function showToast(message) {
    // 检查是否已有toast
    let toast = document.querySelector('.toast-notification');
    if (toast) {
        toast.remove();
    }

    // 创建新toast
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 添加样式
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';

    // 显示toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);

    // 3秒后隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}