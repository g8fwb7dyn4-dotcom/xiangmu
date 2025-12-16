<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="KLBAPP.用户.web.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 拼车出行</title>
    <link href="../css/login.css" rel="stylesheet" />
    <link href="../images/图标.ico" rel="icon" />
    <link href="../../Content/font-awesome.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 背景视频 -->
        <div class="background-container">
      <video
        src="../images/登录背景.mp4"
        class="background-video"
        autoplay
        muted
        loop
        playsinline
      ></video>
    </div>

        <div class="auth-container">
      <!-- Logo -->
      <div class="logo">
        <h1>KLUOBO - 拼车出行</h1>
        <p>探索无限拼车可能</p>
      </div>

      <!-- 表单容器 -->
      <div class="form-container">
        <!-- 登录表单 -->
        <div id="login-form" class="form-card form-card-active">
          <h2 class="form-title">登录</h2>

          <div id="loginForm" class="auth-form">
            <div class="form-group">
              <label for="login-email">邮箱/手机号</label>
              <div class="input-container">
                <span class="input-icon">
                  <i class="fa fa-user"></i>
                </span>
                <input
                  type="text"
                  id="login-email"
                  name="email"
                  placeholder="请输入邮箱或手机号"
                  class="form-input"
                  required
                />
              </div>
              <p class="error-message" id="login-email-error"></p>
            </div>

            <div class="form-group">
              <label for="login-password">密码</label>
              <div class="input-container">
                <span class="input-icon">
                  <i class="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="请输入密码"
                  class="form-input"
                  required
                />
                <button
                  type="button"
                  id="toggle-login-password"
                  class="password-toggle"
                >
                  <i class="fa fa-eye-slash"></i>
                </button>
              </div>
              <p class="error-message" id="login-password-error"></p>
            </div>

            <div class="remember-forgot">
              <div class="remember-me">
                <input type="checkbox" id="remember-me" name="remember" />
                <label for="remember-me">记住我</label>
              </div>
              <a href="#" id="show-forgot-password" class="forgot-password"
                >忘记密码?</a
              >
            </div>

            <div>
                <asp:Button ID="btnOK" runat="server" Text="登录" CssClass="btn btn-primary" OnClick="btnOK_Click"/>
            </div>
          </div>

          <div class="form-switch">
            <p>还没有账号? <a href="#" id="show-register">立即注册</a></p>
          </div>
        </div>

        <!-- 忘记密码表单 -->
        <div id="forgot-password-form" class="form-card">
          <h2 class="form-title">忘记密码</h2>

          <div id="forgotPasswordForm" class="auth-form">
            <div class="form-group">
              <p class="forgot-password-desc">
                请输入您的邮箱，我们将发送验证码到您的邮箱以重置密码。
              </p>
            </div>

            <div class="form-group">
              <label for="forgot-email">邮箱</label>
              <div class="input-container">
                <span class="input-icon">
                  <i class="fa fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="forgot-email"
                  name="email"
                  placeholder="请输入邮箱"
                  class="form-input"
                  required
                />
              </div>
              <p class="error-message" id="forgot-email-error"></p>
            </div>

            <div id="verification-code-section" style="display: none">
              <div class="form-group">
                <label for="verification-code">验证码</label>
                <div class="input-container">
                  <span class="input-icon">
                    <i class="fa fa-shield"></i>
                  </span>
                  <input
                    type="text"
                    id="verification-code"
                    name="verificationCode"
                    placeholder="请输入验证码"
                    class="form-input"
                    required
                  />
                  <button type="button" id="resend-code" class="resend-code">
                    重新发送
                  </button>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 0.25rem;
                  "
                >
                  <p class="error-message" id="verification-code-error"></p>
                  <p class="countdown" id="countdown">60秒后重新发送</p>
                </div>
              </div>
            </div>

            <div id="new-password-section" style="display: none">
              <div class="form-group">
                <label for="new-password">新密码</label>
                <div class="input-container">
                  <span class="input-icon">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="new-password"
                    name="newPassword"
                    placeholder="请输入新密码"
                    class="form-input"
                    required
                  />
                  <button
                    type="button"
                    id="toggle-new-password"
                    class="password-toggle"
                  >
                    <i class="fa fa-eye-slash"></i>
                  </button>
                </div>
                <div class="password-strength-container">
                  <div class="password-strength-bar">
                    <div
                      id="new-password-strength-level"
                      class="password-strength-level"
                    ></div>
                  </div>
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin-top: 0.25rem;
                    "
                  >
                    <p class="error-message" id="new-password-error"></p>
                    <p
                      class="password-strength-text"
                      id="new-password-strength-text"
                    >
                      密码强度: 弱
                    </p>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="confirm-new-password">确认新密码</label>
                <div class="input-container">
                  <span class="input-icon">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    id="confirm-new-password"
                    name="confirmNewPassword"
                    placeholder="请再次输入新密码"
                    class="form-input"
                    required
                  />
                  <button
                    type="button"
                    id="toggle-confirm-new-password"
                    class="password-toggle"
                  >
                    <i class="fa fa-eye-slash"></i>
                  </button>
                </div>
                <p class="error-message" id="confirm-new-password-error"></p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                id="forgot-password-submit"
                class="btn btn-secondary"
              >
                <span>发送验证码</span>
              </button>
            </div>
          </div>

          <div class="form-switch">
            <p>
              想起密码了? <a href="#" id="show-login-from-forgot">立即登录</a>
            </p>
          </div>
        </div>

        <!-- 注册表单 -->
        <div id="register-form" class="form-card">
          <h2 class="form-title">注册</h2>

          <div id="registerForm" class="auth-form">
            <div class="form-group">
              <label for="register-name">用户名</label>
              <div class="input-container">
                <span class="input-icon">
                  <i class="fa fa-user-plus"></i>
                </span>
                <input
                  type="text"
                  id="register-name"
                  name="name"
                  placeholder="请输入用户名"
                  class="form-input"
                  required
                />
              </div>
              <p class="error-message" id="register-name-error"></p>
            </div>

            <div class="form-group">
              <label for="register-email">邮箱</label>
              <div class="input-container">
                <span class="input-icon">
                  <i class="fa fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  placeholder="请输入邮箱"
                  class="form-input"
                  required
                />
              </div>
              <p class="error-message" id="register-email-error"></p>
            </div>

            <div class="form-group">
              <label for="register-password">密码</label>
              <div class="input-container">
                <span class="input-icon">
                  <i class="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  placeholder="请输入密码"
                  class="form-input"
                  required
                />
                <button
                  type="button"
                  id="toggle-register-password"
                  class="password-toggle"
                >
                  <i class="fa fa-eye-slash"></i>
                </button>
              </div>
              <div class="password-strength-container">
                <div class="password-strength-bar">
                  <div
                    id="password-strength-level"
                    class="password-strength-level"
                  ></div>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 0.25rem;
                  "
                >
                  <p class="error-message" id="register-password-error"></p>
                  <p class="password-strength-text" id="password-strength-text">
                    密码强度: 弱
                  </p>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="register-confirm-password">确认密码</label>
              <div class="input-container">
                <span class="input-icon">
                  <i class="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="register-confirm-password"
                  name="confirmPassword"
                  placeholder="请再次输入密码"
                  class="form-input"
                  required
                />
                <button
                  type="button"
                  id="toggle-confirm-password"
                  class="password-toggle"
                >
                  <i class="fa fa-eye-slash"></i>
                </button>
              </div>
              <p class="error-message" id="register-confirm-password-error"></p>
            </div>

            <div>
              <button type="submit" class="btn btn-secondary">
                <span>注册</span>
              </button>
            </div>
          </div>

          <div class="form-switch">
            <p>已有账号? <a href="#" id="show-login">立即登录</a></p>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <div class="footer">
        <p>&copy; 2025 KLUOBO. 保留所有权利。</p>
      </div>
    </div>

        <script src="../js/login.js"></script>
    </form>
</body>
</html>
