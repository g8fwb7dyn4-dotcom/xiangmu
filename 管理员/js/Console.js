// 初始化导航功能
function initAdminNav() {
    // 管理员特定导航逻辑
    const adminDropdown = document.getElementById('admin-dropdown');
    const adminMenuBtn = document.getElementById('admin-menu-btn');

    adminMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        adminDropdown.classList.toggle('active');
        // 添加动画效果
        const menu = adminDropdown.querySelector('.dropdown-menu');
        if (adminDropdown.classList.contains('active')) {
            menu.style.maxHeight = '0';
            setTimeout(() => {
                menu.style.maxHeight = menu.scrollHeight + 'px';
            }, 10);
        } else {
            menu.style.maxHeight = '0';
        }
    });

    // 点击其他区域关闭下拉菜单
    document.addEventListener('click', () => {
        const menu = adminDropdown.querySelector('.dropdown-menu');
        adminDropdown.classList.remove('active');
        menu.style.maxHeight = '0';
    });

    // 退出登录功能
    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('确定要退出登录吗？')) {
                // 添加退出动画
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = '../用户/登录注册界面.html';
                }, 300);
            }
        });
    });

    // 移动端菜单处理
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // 点击移动端菜单外部关闭菜单
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 导航链接激活状态
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 移除所有激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 给当前点击的链接添加激活状态
            link.classList.add('active');

            // 如果是移动端，点击后关闭菜单
            if (link.classList.contains('mobile-nav-link')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// 显示当前日期
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (!dateElement) return;

    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    dateElement.innerHTML = `<i class="fa fa-calendar-o"></i> ${now.toLocaleDateString('zh-CN', options)}`;
}

// 初始化图表
function initCharts() {
    // 检查Chart是否加载
    if (typeof Chart === 'undefined') {
        console.error('Chart.js未加载，请确保已引入Chart.js库');
        return;
    }

    // 订单趋势图表
    const ordersCtx = document.getElementById('orders-chart');
    if (ordersCtx) {
        initOrdersChart(ordersCtx.getContext('2d'));
    }

    // 用户与司机增长图表
    const growthCtx = document.getElementById('growth-chart');
    if (growthCtx) {
        initGrowthChart(growthCtx.getContext('2d'));
    }

    // 图表周期选择器事件
    document.querySelectorAll('.period-select').forEach(select => {
        select.addEventListener('change', function () {
            const chartId = this.closest('.chart-card').querySelector('canvas').id;
            if (chartId === 'orders-chart') {
                updateOrdersChart(this.value);
            } else if (chartId === 'growth-chart') {
                updateGrowthChart(this.value);
            }
        });
    });
}

// 订单趋势图表
let ordersChartInstance;
function initOrdersChart(ctx) {
    // 创建渐变背景
    const orderGradient = ctx.createLinearGradient(0, 0, 0, 300);
    orderGradient.addColorStop(0, 'rgba(46, 125, 50, 0.2)');
    orderGradient.addColorStop(1, 'rgba(46, 125, 50, 0)');

    ordersChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6', '11/7'],
            datasets: [{
                label: '订单数量',
                data: [1520, 1680, 1450, 1780, 1920, 1840, 1842],
                borderColor: '#2E7D32',
                backgroundColor: orderGradient,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#2E7D32',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointHoverShadow: true,
                pointHoverShadowBlur: 5,
                pointHoverShadowColor: 'rgba(0, 0, 0, 0.2)'
            }]
        },
        options: getChartOptions()
    });
}

// 更新订单图表
function updateOrdersChart(days) {
    if (!ordersChartInstance) return;

    // 生成模拟数据
    const labels = [];
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);

        // 生成随机数据，围绕基础值波动
        const baseValue = 1700;
        const fluctuation = Math.floor(Math.random() * 400) - 200;
        data.push(Math.max(1000, baseValue + fluctuation));
    }

    // 更新图表数据并添加动画
    ordersChartInstance.data.labels = labels;
    ordersChartInstance.data.datasets[0].data = data;
    ordersChartInstance.update('none'); // 先清除动画
    ordersChartInstance.update(); // 应用新数据并添加动画
}

// 用户与司机增长图表
let growthChartInstance;
function initGrowthChart(ctx) {
    // 创建用户增长渐变
    const userGradient = ctx.createLinearGradient(0, 0, 0, 300);
    userGradient.addColorStop(0, 'rgba(46, 125, 50, 0.2)');
    userGradient.addColorStop(1, 'rgba(46, 125, 50, 0)');

    // 创建司机增长渐变
    const driverGradient = ctx.createLinearGradient(0, 0, 0, 300);
    driverGradient.addColorStop(0, 'rgba(25, 118, 210, 0.2)');
    driverGradient.addColorStop(1, 'rgba(25, 118, 210, 0)');

    growthChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6月', '7月', '8月', '9月', '10月', '11月'],
            datasets: [
                {
                    label: '用户',
                    data: [8500, 9200, 10500, 11200, 11800, 12580],
                    borderColor: '#2E7D32',
                    backgroundColor: userGradient,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#2E7D32',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: '司机',
                    data: [950, 1020, 1080, 1150, 1220, 1286],
                    borderColor: '#1976D2',
                    backgroundColor: driverGradient,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#1976D2',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: getChartOptions(true)
    });
}

// 更新增长图表
function updateGrowthChart(months) {
    if (!growthChartInstance) return;

    // 生成模拟数据
    const labels = [];
    const userData = [];
    const driverData = [];
    const today = new Date();

    for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        labels.push(`${date.getMonth() + 1}月`);

        // 生成用户数据
        const userBase = 10000;
        const userGrowth = Math.floor(userBase * (1 + (i / months) * 0.3) + Math.random() * 500);
        userData.push(userGrowth);

        // 生成司机数据（约为用户的10%）
        const driverBase = userBase * 0.1;
        const driverGrowth = Math.floor(driverBase * (1 + (i / months) * 0.2) + Math.random() * 50);
        driverData.push(driverGrowth);
    }

    // 更新图表数据
    growthChartInstance.data.labels = labels;
    growthChartInstance.data.datasets[0].data = userData;
    growthChartInstance.data.datasets[1].data = driverData;
    growthChartInstance.update('none');
    growthChartInstance.update();
}

// 图表通用配置
function getChartOptions(showLegend = false) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: {
                display: showLegend,
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 12,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1E293B',
                bodyColor: '#6B7280',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + context.raw.toLocaleString();
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    padding: 10,
                    callback: function (value) {
                        if (value >= 1000) {
                            return value / 1000 + 'k';
                        }
                        return value;
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    padding: 10
                }
            }
        },
        elements: {
            line: {
                borderWidth: 3
            }
        }
    };
}

// 生成最近活动记录
function generateActivities() {
    const activities = [
        { type: 'user', action: '用户注册', name: '张三', time: '5分钟前' },
        { type: 'driver', action: '司机上线', name: '李师傅', time: '15分钟前' },
        { type: 'order', action: '大额订单完成', name: '订单 #85241', time: '30分钟前' },
        { type: 'complaint', action: '新投诉提交', name: '用户投诉', time: '1小时前' },
        { type: 'verification', action: '司机认证通过', name: '王师傅', time: '2小时前' }
    ];

    const container = document.getElementById('activities-container');
    if (!container) return;

    container.innerHTML = '';

    activities.forEach((activity, index) => {
        // 添加延迟，创建顺序动画效果
        setTimeout(() => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';

            item.innerHTML = `
                <div class="activity-icon activity-${activity.type}">
                    <i class="fa ${getIconForActivity(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <p><span class="activity-action">${activity.action}</span> - ${activity.name}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            `;

            container.appendChild(item);

            // 触发动画
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 10);
        }, index * 100);
    });
}

// 根据活动类型获取对应的图标
function getIconForActivity(type) {
    const icons = {
        user: 'fa-user-plus',
        driver: 'fa-car',
        order: 'fa-check-circle',
        complaint: 'fa-exclamation-triangle',
        verification: 'fa-check-square'
    };
    return icons[type] || 'fa-info-circle';
}

// 数字增长动画
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // 格式化数字，添加千位分隔符
        obj.innerHTML = progress === 1
            ? end
            : Math.floor(progress * (end.replace(/,/g, '') - start) + start).toLocaleString();

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 初始化数字动画
function initValueAnimations() {
    // 等待页面加载完成后再执行动画
    setTimeout(() => {
        animateValue('total-users', 0, '12,580', 1500);
        animateValue('total-drivers', 0, '1,286', 1500);
        animateValue('today-orders', 0, '1,842', 1500);
        animateValue('today-revenue', 0, '¥86,520', 1500);
    }, 300);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面载入动画类
    document.body.classList.add('page-loaded');

    initAdminNav();
    displayCurrentDate();
    initCharts();
    generateActivities();
    initValueAnimations();
});