/* KLUOBO 拼车出行网站 - 用户认证系统脚本 */
document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const showForgotPasswordBtn = document.getElementById('show-forgot-password');
    const showLoginFromForgotBtn = document.getElementById('show-login-from-forgot');

    const loginFormElement = document.getElementById('loginForm');
    const registerFormElement = document.getElementById('registerForm');
    const forgotPasswordFormElement = document.getElementById('forgotPasswordForm');

    const toggleLoginPassword = document.getElementById('toggle-login-password');
    const toggleRegisterPassword = document.getElementById('toggle-register-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const toggleNewPassword = document.getElementById('toggle-new-password');
    const toggleConfirmNewPassword = document.getElementById('toggle-confirm-new-password');

    const loginPassword = document.getElementById('login-password');
    const registerPassword = document.getElementById('register-password');
    const confirmPassword = document.getElementById('register-confirm-password');
    const newPassword = document.getElementById('new-password');
    const confirmNewPassword = document.getElementById('confirm-new-password');

    const passwordStrengthLevel = document.getElementById('password-strength-level');
    const passwordStrengthText = document.getElementById('password-strength-text');
    const newPasswordStrengthLevel = document.getElementById('new-password-strength-level');
    const newPasswordStrengthText = document.getElementById('new-password-strength-text');

    // 表单切换功能
    showRegisterBtn.addEventListener('click', function (e) {
        e.preventDefault();
        switchForm(loginForm, registerForm);
    });

    showLoginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        switchForm(registerForm, loginForm);
    });

    showForgotPasswordBtn.addEventListener('click', function (e) {
        e.preventDefault();
        switchForm(loginForm, forgotPasswordForm);
        resetForgotPasswordForm();
    });

    showLoginFromForgotBtn.addEventListener('click', function (e) {
        e.preventDefault();
        switchForm(forgotPasswordForm, loginForm);
        clearCountdown();
    });

    // 表单切换动画
    function switchForm(fromForm, toForm) {
        fromForm.classList.remove('form-card-active');
        fromForm.style.opacity = '0';
        fromForm.style.pointerEvents = 'none';

        toForm.style.opacity = '0';
        toForm.style.pointerEvents = 'auto';

        setTimeout(() => {
            toForm.classList.add('form-card-active');
            toForm.style.opacity = '1';
        }, 50);
    }

    // 密码显示/隐藏功能
    function setupPasswordToggle(toggleBtn, passwordInput) {
        toggleBtn.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // 切换图标
            const icon = toggleBtn.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    setupPasswordToggle(toggleLoginPassword, loginPassword);
    setupPasswordToggle(toggleRegisterPassword, registerPassword);
    setupPasswordToggle(toggleConfirmPassword, confirmPassword);
    setupPasswordToggle(toggleNewPassword, newPassword);
    setupPasswordToggle(toggleConfirmNewPassword, confirmNewPassword);

    // 密码强度检测
    registerPassword.addEventListener('input', function () {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthIndicator(strength);
    });

    newPassword.addEventListener('input', function () {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updateNewPasswordStrengthIndicator(strength);
    });

    function calculatePasswordStrength(password) {
        if (password.length < 6) return 0;

        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        return strength;
    }

    function updatePasswordStrengthIndicator(strength) {
        const levels = [
            { width: '0%', color: '#F44336', text: '密码强度: 弱' },
            { width: '20%', color: '#F44336', text: '密码强度: 弱' },
            { width: '40%', color: '#FF9800', text: '密码强度: 中' },
            { width: '60%', color: '#FFC107', text: '密码强度: 中' },
            { width: '80%', color: '#2196F3', text: '密码强度: 强' },
            { width: '100%', color: '#4CAF50', text: '密码强度: 非常强' }
        ];

        const level = Math.min(strength, 5);
        passwordStrengthLevel.style.width = levels[level].width;
        passwordStrengthLevel.style.backgroundColor = levels[level].color;
        passwordStrengthText.textContent = levels[level].text;

        const passwordError = document.getElementById('register-password-error');
        if (strength < 3 && registerPassword.value.length >= 6) {
            passwordError.textContent = '密码强度不够，请包含数字、字母和特殊字符';
        } else {
            passwordError.textContent = '';
        }
    }

    function updateNewPasswordStrengthIndicator(strength) {
        const levels = [
            { width: '0%', color: '#F44336', text: '密码强度: 弱' },
            { width: '20%', color: '#F44336', text: '密码强度: 弱' },
            { width: '40%', color: '#FF9800', text: '密码强度: 中' },
            { width: '60%', color: '#FFC107', text: '密码强度: 中' },
            { width: '80%', color: '#2196F3', text: '密码强度: 强' },
            { width: '100%', color: '#4CAF50', text: '密码强度: 非常强' }
        ];

        const level = Math.min(strength, 5);
        newPasswordStrengthLevel.style.width = levels[level].width;
        newPasswordStrengthLevel.style.backgroundColor = levels[level].color;
        newPasswordStrengthText.textContent = levels[level].text;

        const passwordError = document.getElementById('new-password-error');
        if (strength < 3 && newPassword.value.length >= 6) {
            passwordError.textContent = '密码强度不够，请包含数字、字母和特殊字符';
        } else {
            passwordError.textContent = '';
        }
    }

    // 表单验证 - 登录
    function validateLoginForm() {
        let isValid = true;
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const emailError = document.getElementById('login-email-error');
        const passwordError = document.getElementById('login-password-error');

        // 邮箱/手机号验证
        if (!email) {
            emailError.textContent = '请输入邮箱或手机号';
            isValid = false;
        } else if (!isValidEmail(email) && !isValidPhone(email)) {
            emailError.textContent = '请输入有效的邮箱或手机号';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // 密码验证
        if (!password) {
            passwordError.textContent = '请输入密码';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = '密码长度不能少于6位';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        return isValid;
    }

    // 表单验证 - 注册
    function validateRegisterForm() {
        let isValid = true;
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        const nameError = document.getElementById('register-name-error');
        const emailError = document.getElementById('register-email-error');
        const passwordError = document.getElementById('register-password-error');
        const confirmPasswordError = document.getElementById('register-confirm-password-error');

        // 用户名验证
        if (!name) {
            nameError.textContent = '请输入用户名';
            isValid = false;
        } else if (name.length < 2) {
            nameError.textContent = '用户名长度不能少于2位';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // 邮箱验证
        if (!email) {
            emailError.textContent = '请输入邮箱';
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = '请输入有效的邮箱';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // 密码验证
        if (!password) {
            passwordError.textContent = '请输入密码';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = '密码长度不能少于6位';
            isValid = false;
        } else if (calculatePasswordStrength(password) < 3) {
            passwordError.textContent = '密码强度不够，请包含数字、字母和特殊字符';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        // 确认密码验证
        if (!confirmPassword) {
            confirmPasswordError.textContent = '请确认密码';
            isValid = false;
        } else if (confirmPassword !== password) {
            confirmPasswordError.textContent = '两次输入的密码不一致';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
        }

        return isValid;
    }

    // 工具函数 - 验证邮箱
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 工具函数 - 验证手机号
    function isValidPhone(phone) {
        const re = /^1[3-9]\d{9}$/;
        return re.test(phone);
    }

    // 登录表单提交事件（核心跳转逻辑）
    loginFormElement.addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止默认提交

        if (validateLoginForm()) {
            // 验证通过，存储登录状态
            const email = document.getElementById('login-email').value;
            const username = email.split('@')[0]; // 提取用户名
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            // 强制跳转到主页
            window.location.href = '主页.html';
        }
    });

    // 注册表单提交事件
    registerFormElement.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateRegisterForm()) {
            alert('注册成功，请登录！');
            switchForm(registerForm, loginForm);
        }
    });

    // 忘记密码表单相关（简化实现）
    function resetForgotPasswordForm() {
        document.getElementById('forgot-email').value = '';
        document.getElementById('verification-code').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-new-password').value = '';
        document.getElementById('verification-code-section').style.display = 'none';
        document.getElementById('new-password-section').style.display = 'none';
        document.getElementById('forgot-password-submit').innerHTML = '<span>发送验证码</span>';
    }

    function clearCountdown() {
        clearInterval(window.countdownInterval);
    }

    document.getElementById('forgot-password-submit').addEventListener('click', function (e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        if (!email || !isValidEmail(email)) {
            document.getElementById('forgot-email-error').textContent = '请输入有效的邮箱';
            return;
        }

        // 显示验证码区域
        document.getElementById('verification-code-section').style.display = 'block';
        this.innerHTML = '<span>验证并重置</span>';

        // 倒计时逻辑（简化）
        let seconds = 60;
        const countdownEl = document.getElementById('countdown');
        const resendBtn = document.getElementById('resend-code');

        window.countdownInterval = setInterval(() => {
            seconds--;
            countdownEl.textContent = `${seconds}秒后重新发送`;
            if (seconds <= 0) {
                clearInterval(window.countdownInterval);
                countdownEl.textContent = '可重新发送';
                resendBtn.disabled = false;
            } else {
                resendBtn.disabled = true;
            }
        }, 1000);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 获取URL哈希值
    const hash = window.location.hash;

    // 选项卡切换函数
    function switchTab(targetId) {
        // 切换选项卡激活状态
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.target === targetId) {
                tab.classList.add('active');
            }
        });

        // 切换表单显示
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
            if (form.id === targetId) {
                form.classList.add('active');
            }
        });
    }

    // 监听选项卡点击
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            switchTab(this.dataset.target);
        });
    });

    // 根据URL哈希自动切换表单
    if (hash === '#register-form') {
        switchTab('register-form');
    } else if (hash === '#login-form' || !hash) {
        switchTab('login-form');
    }
});