// 初始化收入统计页面
document.addEventListener('DOMContentLoaded', function () {
    // 初始化图表
    initEarningsChart();

    // 日期筛选按钮事件
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加active类
            this.classList.add('active');

            // 根据选择的时间段更新数据
            const period = this.getAttribute('data-period');
            updateEarningsData(period);
        });
    });

    // 订单类型筛选事件
    const typeFilter = document.getElementById('order-type-filter');
    typeFilter.addEventListener('change', function () {
        filterEarningsByType(this.value);
    });

    // 加载更多按钮事件
    document.getElementById('load-more-earnings').addEventListener('click', function () {
        loadMoreEarnings();
    });
});

// 初始化收入趋势图表
function initEarningsChart() {
    const ctx = document.getElementById('earnings-chart').getContext('2d');

    // 示例数据 - 最近7天
    const labels = ['6/1', '6/2', '6/3', '6/4', '6/5', '6/6', '6/7'];
    const data = [185, 230, 156, 320, 280, 210, 356];

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(46, 125, 50, 0.2)');
    gradient.addColorStop(1, 'rgba(46, 125, 50, 0)');

    window.earningsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '收入 (¥)',
                data: data,
                backgroundColor: gradient,
                borderColor: '#2E7D32',
                borderWidth: 2,
                pointBackgroundColor: '#2E7D32',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1E293B',
                    bodyColor: '#6B7280',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `收入: ¥${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function (value) {
                            return '¥' + value;
                        }
                    }
                }
            }
        }
    });
}

// 更新收入数据
function updateEarningsData(period) {
    // 模拟不同时间段的数据
    const data = {
        day: {
            total: 356.50,
            orders: 8,
            avg: 44.56,
            chart: {
                labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                data: [45, 60, 85, 35, 50, 72, 9]
            }
        },
        week: {
            total: 1256.00,
            orders: 28,
            avg: 44.86,
            chart: {
                labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                data: [185, 230, 156, 320, 280, 210, 356]
            }
        },
        month: {
            total: 5280.75,
            orders: 126,
            avg: 41.91,
            chart: {
                labels: ['第1周', '第2周', '第3周', '第4周'],
                data: [1256, 1180, 1350, 1494.75]
            }
        },
        year: {
            total: 68520.30,
            orders: 1580,
            avg: 43.37,
            chart: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                data: [4850, 5200, 5680, 5120, 5850, 5280, 6120, 6850, 5980, 6250, 5890, 5450]
            }
        }
    };

    // 更新统计数据
    document.getElementById('total-earnings').textContent = `¥${data[period].total.toFixed(2)}`;
    document.getElementById('order-count').textContent = data[period].orders;
    document.getElementById('avg-per-order').textContent = `¥${data[period].avg.toFixed(2)}`;

    // 更新图表
    window.earningsChart.data.labels = data[period].chart.labels;
    window.earningsChart.data.datasets[0].data = data[period].chart.data;
    window.earningsChart.update();
}

// 按订单类型筛选收入记录
function filterEarningsByType(type) {
    const earningsItems = document.querySelectorAll('.earning-item');

    earningsItems.forEach(item => {
        const itemType = item.querySelector('.order-type').textContent;
        const typeMap = {
            '快车': 'express',
            '专车': 'premium',
            '拼车': 'share',
            '系统扣除': 'system'
        };

        if (type === 'all' || typeMap[itemType] === type) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 加载更多收入记录
function loadMoreEarnings() {
    const earningsList = document.getElementById('earnings-list');
    const loadMoreBtn = document.getElementById('load-more-earnings');

    // 显示加载状态
    loadMoreBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 加载中...';

    // 模拟加载延迟
    setTimeout(() => {
        // 模拟更多记录
        const moreEarnings = [
            {
                order: 'OD788952',
                time: '昨天 16:30',
                type: '快车',
                route: '西湖景区 → 市政府',
                amount: 32.50
            },
            {
                order: 'OD788741',
                time: '昨天 14:15',
                type: '拼车',
                route: '北站 → 商业中心',
                amount: 22.30
            },
            {
                order: 'OD788632',
                time: '前天 20:10',
                type: '专车',
                route: '大剧院 → 滨江酒店',
                amount: 78.00
            }
        ];

        // 添加更多记录到列表
        moreEarnings.forEach(earning => {
            const earningItem = document.createElement('div');
            earningItem.className = 'earning-item';
            earningItem.innerHTML = `
                <div class="earning-info">
                    <div class="earning-header">
                        <span class="order-number">订单 #${earning.order}</span>
                        <span class="earning-time">${earning.time}</span>
                    </div>
                    <div class="earning-details">
                        <span class="order-type">${earning.type}</span>
                        <span class="route">${earning.route}</span>
                    </div>
                </div>
                <div class="earning-amount positive">+¥${earning.amount.toFixed(2)}</div>
            `;
            earningsList.appendChild(earningItem);
        });

        // 恢复按钮状态
        loadMoreBtn.innerHTML = '<i class="fa fa-refresh"></i> 查看更多记录';

        // 如果没有更多数据可加载，隐藏按钮
        // loadMoreBtn.style.display = 'none';
    }, 1000);
}