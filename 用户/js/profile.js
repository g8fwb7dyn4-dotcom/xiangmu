// 个人中心页面逻辑
document.addEventListener('DOMContentLoaded', function () {
    // 检查用户登录状态
    checkUserLoginStatus();

    // 移动端菜单交互
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
    });

    // 登录提示按钮事件
    document.getElementById('prompt-login-btn').addEventListener('click', function () {
        window.location.href = '登录注册界面.html#login-form';
    });

    document.getElementById('prompt-register-btn').addEventListener('click', function () {
        window.location.href = '登录注册界面.html#register-form';
    });

    // 功能按钮事件
    document.querySelectorAll('.settings-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            alert('跳转到设置页面');
        });
    });

    document.querySelectorAll('.help-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            alert('跳转到帮助中心');
        });
    });

    document.querySelectorAll('.about-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            alert('关于我们：KLUOBO 拼车出行服务平台');
        });
    });

    // 退出登录功能
    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('确定要退出登录吗？')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.reload();
            }
        });
    });

    // 编辑个人资料弹窗
    const profileModal = document.getElementById('profile-modal');
    const editProfileBtn = document.getElementById('edit-profile');
    const closeModalBtn = document.querySelector('.close-modal');
    const profileForm = document.getElementById('profile-form');

    // 打开弹窗
    editProfileBtn.addEventListener('click', function (e) {
        e.preventDefault();
        profileModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭弹窗
    closeModalBtn.addEventListener('click', function () {
        profileModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // 点击弹窗外部关闭
    profileModal.addEventListener('click', function (e) {
        if (e.target === profileModal) {
            profileModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // 头像上传预览
    const avatarUpload = document.getElementById('avatar-upload');
    const previewAvatar = document.getElementById('preview-avatar');

    avatarUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                previewAvatar.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 表单提交
    profileForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        if (username) {
            localStorage.setItem('username', username);
            document.getElementById('profile-username').textContent = username;
        }

        // 显示成功提示
        alert('个人资料更新成功！');

        // 关闭弹窗
        profileModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // 模拟数据加载 - 历史行程
    loadPastTrips();
});

// 检查用户登录状态
function checkUserLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const registerBtn = document.getElementById('register-btn');
    const mobileRegisterBtn = document.getElementById('mobile-register-btn');
    const notLoggedIn = document.getElementById('not-logged-in');
    const loggedInContent = document.getElementById('logged-in-content');

    if (isLoggedIn) {
        // 已登录状态
        notLoggedIn.style.display = 'none';
        loggedInContent.style.display = 'block';

        // 显示用户名
        const username = localStorage.getItem('username') || '用户';
        loginBtn.textContent = username;
        if (mobileLoginBtn) mobileLoginBtn.textContent = username;

        // 更新个人资料信息
        updateProfileInfo();

        // 隐藏注册按钮
        if (registerBtn) registerBtn.style.display = 'none';
        if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'none';

        // 登录按钮点击事件（已登录状态）
        loginBtn.addEventListener('click', function () {
            document.querySelector('.dropdown').classList.toggle('active');
        });

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                alert('已在个人中心页面');
            });
        }
    } else {
        // 未登录状态
        notLoggedIn.style.display = 'block';
        loggedInContent.style.display = 'none';

        // 显示登录按钮
        loginBtn.textContent = '登录';
        if (mobileLoginBtn) mobileLoginBtn.textContent = '登录';

        // 显示注册按钮
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'inline-block';

        // 登录按钮点击事件（未登录状态）
        loginBtn.addEventListener('click', function () {
            window.location.href = '登录注册界面.html#login-form';
        });

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                window.location.href = '登录注册界面.html#login-form';
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

// 更新个人资料信息
function updateProfileInfo() {
    // 获取用户数据，如无则初始化
    let userData = JSON.parse(localStorage.getItem('userData') || 'null');
    if (!userData) {
        // 初始化用户数据
        userData = {
            username: localStorage.getItem('username') || '用户',
            totalTrips: 12,
            totalSpent: 568,
            avgRating: 4.8
        };
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    // 更新页面显示
    document.getElementById('profile-username').textContent = userData.username;
    document.getElementById('total-trips').textContent = userData.totalTrips;
    document.getElementById('total-spent').textContent = '¥' + userData.totalSpent;
    document.getElementById('avg-rating').textContent = userData.avgRating;
}

function loadPastTrips() {
    // 模拟历史行程数据
    const pastTrips = [
        {
            id: 'T20230515001',
            date: '2023-05-15',
            time: '09:30',
            pickup: '东方广场A座',
            destination: '大学城科技园B区',
            driver: '张师傅',
            car: '丰田卡罗拉',
            plate: '粤A12345',
            price: '35.50',
            status: 'completed'
        },
        {
            id: 'T20230512042',
            date: '2023-05-12',
            time: '18:45',
            pickup: '中央公园南门',
            destination: '星河小区',
            driver: '李师傅',
            car: '大众朗逸',
            plate: '粤A67890',
            price: '28.00',
            status: 'completed'
        },
        {
            id: 'T20230510027',
            date: '2023-05-10',
            time: '14:20',
            pickup: '火车站西广场',
            destination: '国际会展中心',
            driver: '王师傅',
            car: '本田思域',
            plate: '粤A24680',
            price: '42.30',
            status: 'completed'
        }
    ];

    // 保存到本地存储
    localStorage.setItem('pastTrips', JSON.stringify(pastTrips));
}