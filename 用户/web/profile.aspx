<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="profile.aspx.cs" Inherits="KLBAPP.用户.web.profile" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 个人中心</title>
    <link rel="stylesheet" href="../css/home.css" />
    <link rel="stylesheet" href="../css/profile.css" />
    <link rel="icon" href="../images/图标.ico" />
    <link href="../../Content/font-awesome.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 - 与其他页面保持一致 -->
    <header class="navbar">
      <div class="logo">
        <h1>KLUOBO</h1>
      </div>

      <!-- 桌面端导航 -->
      <nav class="nav-menu">
        <a href="home.aspx" class="nav-link" data-page="home">首页</a>
        <a href="order.aspx" class="nav-link" data-page="orders">订单</a>
        <a href="trip.aspx" class="nav-link" data-page="trips">行程</a>
        <a href="message.aspx" class="nav-link" data-page="messages">消息</a>

        <!-- 下拉菜单 -->
        <div class="dropdown">
          <a
            href="profile.aspx"
            class="nav-link dropdown-toggle active"
            data-page="profile"
            >我的</a
          >
          <div class="dropdown-menu">
            <a href="我的.html" class="dropdown-item">个人中心</a>
            <a href="#" class="dropdown-item settings-btn">设置</a>
            <a href="#" class="dropdown-item help-btn">帮助中心</a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item logout-btn">退出登录</a>
          </div>
        </div>
      </nav>

      <div class="user-actions">
        <button id="login-btn" class="btn btn-outline"></button>
        <button id="register-btn" class="btn btn-primary">注册</button>
      </div>

      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-btn">
        <i class="fa fa-bars"></i>
      </button>
    </header>

    <!-- 移动端导航菜单 -->
    <div class="mobile-menu">
      <div class="mobile-menu-content">
        <button class="close-menu">
          <i class="fa fa-times"></i>
        </button>
        <nav class="mobile-nav">
          <a href="主页.html" class="mobile-nav-link" data-page="home">首页</a>
          <a href="订单.html" class="mobile-nav-link" data-page="orders"
            >订单</a
          >
          <a href="行程.html" class="mobile-nav-link" data-page="trips">行程</a>
          <a href="消息.html" class="mobile-nav-link" data-page="messages"
            >消息</a
          >
          <a href="我的.html" class="mobile-nav-link active" data-page="profile"
            >我的</a
          >
          <div class="mobile-user-actions">
            <button id="mobile-login-btn" class="btn btn-outline">登录</button>
            <button id="mobile-register-btn" class="btn btn-primary">
              注册
            </button>
          </div>
        </nav>
      </div>
    </div>

    <!-- 主要内容区 -->
    <main class="main-content profile-page">
      <!-- 未登录状态 -->
      <div class="not-logged-in" id="not-logged-in">
        <div class="login-prompt">
          <img
            src="../images/司机头像.png"
            alt="用户头像"
            class="placeholder-avatar"
          />
          <h2>请先登录</h2>
          <p>登录后即可查看您的个人信息和行程记录</p>
          <div class="login-actions">
            <button id="prompt-login-btn" class="btn btn-primary">
              立即登录
            </button>
            <button id="prompt-register-btn" class="btn btn-outline">
              注册账号
            </button>
          </div>
        </div>
      </div>

      <!-- 已登录状态 -->
      <div
        class="logged-in-content"
        id="logged-in-content"
        style="display: none"
      >
        <!-- 用户信息卡片 -->
        <div class="profile-card">
          <img
            src="../images/司机头像.png"
            alt="用户头像"
            class="profile-avatar"
          />
          <div class="profile-info">
            <h2 id="profile-username">用户名</h2>
            <p class="member-level">普通会员 <i class="fa fa-star"></i></p>
            <div class="user-stats">
              <div class="stat-item">
                <span id="total-trips">0</span>
                <span>总行程</span>
              </div>
              <div class="stat-item">
                <span id="total-spent">0</span>
                <span>总消费</span>
              </div>
              <div class="stat-item">
                <span id="avg-rating">0</span>
                <span>平均评分</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 功能菜单 -->
        <div class="profile-content">
          <!-- 我的账户部分 -->
          <div class="menu-section">
            <h3>我的账户</h3>
            <div class="menu-items">
              <a href="#" class="menu-item" id="edit-profile">
                <i class="fa fa-user-circle"></i>
                <span>编辑个人资料</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-credit-card"></i>
                <span>支付方式</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-ticket"></i>
                <span>优惠券</span>
                <span class="badge">5</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-star"></i>
                <span>会员中心</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-wallet"></i>
                <span>我的余额</span>
                <span class="balance">¥128.50</span>
                <i class="fa fa-chevron-right"></i>
              </a>
            </div>
          </div>

          <!-- 行程管理部分 -->
          <div class="menu-section">
            <h3>行程管理</h3>
            <div class="menu-items">
              <a href="订单.html" class="menu-item">
                <i class="fa fa-list-alt"></i>
                <span>我的订单</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="行程.html" class="menu-item">
                <i class="fa fa-map-o"></i>
                <span>我的行程</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-clock-o"></i>
                <span>历史记录</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-star-o"></i>
                <span>我的评价</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-heart"></i>
                <span>常用地址</span>
                <i class="fa fa-chevron-right"></i>
              </a>
            </div>
          </div>

          <!-- 系统设置部分 -->
          <div class="menu-section">
            <h3>系统设置</h3>
            <div class="menu-items">
              <a href="#" class="menu-item">
                <i class="fa fa-bell"></i>
                <span>通知设置</span>
                <div class="toggle-switch">
                  <label class="switch">
                    <input type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </div>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-lock"></i>
                <span>隐私设置</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-question-circle"></i>
                <span>帮助中心</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-info-circle"></i>
                <span>关于我们</span>
                <i class="fa fa-chevron-right"></i>
              </a>
              <a href="#" class="menu-item">
                <i class="fa fa-mobile"></i>
                <span>版本信息</span>
                <span class="version">v2.3.5</span>
              </a>
              <a href="#" class="menu-item logout-btn">
                <i class="fa fa-sign-out"></i>
                <span>退出登录</span>
                <i class="fa fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- 编辑个人资料弹窗 -->
        <div class="modal" id="profile-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>编辑个人资料</h3>
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
              <form id="profile-form">
                <div class="form-group">
                  <label>头像</label>
                  <div class="avatar-upload">
                    <img
                      src="../images/司机头像.png"
                      alt="用户头像"
                      id="preview-avatar"
                      class="profile-avatar"
                    />
                    <input type="file" id="avatar-upload" accept="image/*" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="username">用户名</label>
                  <input type="text" id="username" value="用户名" />
                </div>
                <div class="form-group">
                  <label for="phone">手机号码</label>
                  <input type="tel" id="phone" value="138****6789" />
                </div>
                <div class="form-group">
                  <label for="email">电子邮箱</label>
                  <input type="email" id="email" value="user@example.com" />
                </div>
                <div class="form-group">
                  <label for="gender">性别</label>
                  <select id="gender">
                    <option value="male">男</option>
                    <option value="female">女</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">保存修改</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

    <script src="./js/profile.js"></script>
    </form>
</body>
</html>
