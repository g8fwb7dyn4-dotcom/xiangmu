// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 检查用户登录状态
    checkUserLoginStatus();

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 移动端菜单控制
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    closeMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // 恢复滚动
    });

    // 点击移动菜单外部关闭菜单
    mobileMenu.addEventListener('click', function (e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 轮播图功能
    const bannerItems = document.querySelectorAll('.banner-item');
    const dots = document.querySelectorAll('.dot');
    let currentBanner = 0;
    let bannerInterval;

    function showBanner(index) {
        // 隐藏所有轮播项
        bannerItems.forEach(item => {
            item.classList.remove('active');
        });

        // 移除所有指示点的active类
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // 显示当前轮播项和激活当前指示点
        bannerItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentBanner = index;
    }

    function nextBanner() {
        let nextIndex = (currentBanner + 1) % bannerItems.length;
        showBanner(nextIndex);
    }

    // 为每个指示点添加点击事件
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showBanner(index);
            resetBannerInterval();
        });
    });

    // 设置轮播定时器
    function startBannerInterval() {
        bannerInterval = setInterval(nextBanner, 5000);
    }

    // 重置轮播定时器
    function resetBannerInterval() {
        clearInterval(bannerInterval);
        startBannerInterval();
    }

    // 启动轮播
    startBannerInterval();

    // 出发时间选择逻辑
    const departureTimeSelect = document.getElementById('departure-time');
    const scheduledTimeContainer = document.getElementById('scheduled-time-container');

    departureTimeSelect.addEventListener('change', function () {
        if (this.value === 'later') {
            scheduledTimeContainer.style.display = 'block';
            // 设置默认时间为当前时间加30分钟
            const now = new Date();
            now.setMinutes(now.getMinutes() + 30);
            const formattedTime = now.toISOString().slice(0, 16);
            document.getElementById('scheduled-time').value = formattedTime;
        } else {
            scheduledTimeContainer.style.display = 'none';
        }
    });

    // 车型选择功能
    const rideTypes = document.querySelectorAll('.ride-type');
    rideTypes.forEach(type => {
        type.addEventListener('click', function () {
            // 移除所有车型的active类
            rideTypes.forEach(t => t.classList.remove('active'));
            // 为当前点击的车型添加active类
            this.classList.add('active');
        });
    });

    // 叫车按钮点击事件
    const findRideBtn = document.getElementById('find-ride-btn');
    findRideBtn.addEventListener('click', function () {
        const pickupLocation = document.getElementById('pickup-location').value.trim();
        const destination = document.getElementById('destination').value.trim();
        let isValid = true;

        // 验证出发地
        if (!pickupLocation) {
            document.getElementById('pickup-error').textContent = '请输入出发地';
            document.getElementById('pickup-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('pickup-error').style.display = 'none';
        }

        // 验证目的地
        if (!destination) {
            document.getElementById('destination-error').textContent = '请输入目的地';
            document.getElementById('destination-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('destination-error').style.display = 'none';
        }

        // 如果验证通过
        if (isValid) {
            // 获取选中的车型
            const selectedRideType = document.querySelector('.ride-type.active').dataset.type;
            // 获取乘车人数
            const passengers = document.getElementById('passengers').value;

            // 创建叫车信息对象
            const rideInfo = {
                pickup: pickupLocation,
                destination: destination,
                time: departureTimeSelect.value === 'now' ? '立即出发' : document.getElementById('scheduled-time').value,
                passengers: passengers,
                type: selectedRideType
            };

            // 这里可以添加实际叫车逻辑，比如发送API请求
            console.log('叫车信息:', rideInfo);

            // 显示成功提示
            alert('叫车请求已发出，正在为您寻找附近的司机...');

            // 模拟跳转到订单页面
            setTimeout(() => {
                window.location.href = '订单.html';
            }, 1500);
        }
    });

    // 联系司机按钮点击事件
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const driverName = this.closest('.driver-card').querySelector('h3').textContent.split(' ')[0];
            alert(`正在联系${driverName}...`);
        });
    });

    // 查看更多司机按钮点击事件
    document.querySelector('.view-more-btn').addEventListener('click', function () {
        alert('正在加载更多司机信息...');
        // 这里可以添加加载更多司机的逻辑
    });

    // 登录/注册按钮点击事件
    document.getElementById('login-btn').addEventListener('click', function () {
        //alert('跳转到登录页面');
        // 实际项目中应跳转到登录页面
        // window.location.href = 'login.html';
    });

    document.getElementById('register-btn').addEventListener('click', function () {
        //alert('跳转到注册页面');
        // 实际项目中应跳转到注册页面
        // window.location.href = 'register.html';
    });

    document.getElementById('mobile-login-btn').addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        //alert('跳转到登录页面');
        // 实际项目中应跳转到登录页面
        // window.location.href = 'login.html';
    });

    document.getElementById('mobile-register-btn').addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        //alert('跳转到注册页面');
        // 实际项目中应跳转到注册页面
        // window.location.href = 'register.html';
    });

    // 退出登录按钮点击事件
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('确定要退出登录吗？')) {
                alert('已退出登录');
                // 这里可以添加实际的退出登录逻辑
                checkUserLoginStatus();
            }
        });
    });

    // 滚动动画效果
    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }

    // 初始化需要动画的元素
    document.querySelectorAll('.driver-card, .advantage-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // 初始检查
    handleScrollAnimation();

    // 滚动时检查
    window.addEventListener('scroll', handleScrollAnimation);
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