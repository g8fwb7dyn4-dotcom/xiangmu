<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="profile.aspx.cs" Inherits="KLBAPP.车主.web.message" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 车主信息</title>
  <link rel="stylesheet" href="../../用户/css/home.css" />
  <link rel="stylesheet" href="../css/profile.css" />
  <link rel="icon" href="../../用户/images/图标.ico" />
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> -->
   <link href="../../Content/font-awesome.css" rel="stylesheet" />
</head>
<body style="padding-top: 0;">
    <form id="form1" runat="server">
        <!-- 顶部导航栏 -->
  <header class="navbar">
    <div class="logo">
      <h1>KLUOBO 车主</h1>
    </div>

    <nav class="nav-menu">
      <a href="driver.aspx" class="nav-link" data-page="driver-home">主页</a>
      <a href="earnings.aspx" class="nav-link" data-page="driver-earnings">收入统计</a>
      <a href="#" class="nav-link active" data-page="driver-profile">我的信息</a>
      <a href="message.aspx" class="nav-link" data-page="driver-messages">消息</a>
    </nav>

    <!-- 下拉菜单 - 与用户端保持一致 -->
      <div class="dropdown">
        <a href="我的信息.html" class="nav-link dropdown-toggle" data-page="driver-profile">账户</a>
        <div class="dropdown-menu">
          <a href="我的信息.html" class="dropdown-item">个人中心</a>
          <a href="#" class="dropdown-item">设置</a>
          <a href="#" class="dropdown-item">帮助中心</a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item logout-btn">退出登录</a>
        </div>
      </div>
    </nav>
  </header>

  <!-- 主要内容区 -->
  <main class="main-content profile-page">
    <!-- 已登录状态 -->
    <div class="logged-in-content" id="logged-in-content">
      <!-- 车主信息卡片 -->
      <div class="profile-card card-shadow">
        <div class="avatar-container">
          <div class="avatar-upload">
            <img src="../../用户/images/司机头像.png" alt="车主头像" class="profile-avatar" id="profile-avatar" />
            <label for="avatar-upload" class="avatar-upload-overlay">
              <i class="fa fa-camera"></i>
            </label>
            <input type="file" id="avatar-upload" accept="image/*" class="avatar-upload-input" />
          </div>
        </div>
        
        <div class="profile-info">
          <div class="profile-header">
            <h2 id="profile-name">张师傅</h2>
            <span class="driver-badge">五星司机</span>
          </div>
          
          <p class="verification-status">
            <i class="fa fa-check-circle"></i> 已完成实名认证 · 已通过车辆审核
          </p>
          
          <div class="user-stats">
            <div class="stat-item">
              <span class="stat-value" id="total-completed">128</span>
              <span class="stat-label">完成订单</span>
            </div>
            <div class="stat-item">
              <span class="stat-value" id="completion-rate">98%</span>
              <span class="stat-label">完成率</span>
            </div>
            <div class="stat-item">
              <span class="stat-value" id="driver-rating">4.9</span>
              <span class="stat-label">评分</span>
            </div>
          </div>
        </div>
        
        <button id="edit-profile" class="btn btn-outline">
          <i class="fa fa-edit"></i> 编辑资料
        </button>
      </div>

      <!-- 数据概览卡片组 -->
      <div class="dashboard-cards">
        <!-- 收入卡片 -->
        <div class="earnings-card card-shadow">
          <div class="card-header">
            <h3 class="card-title">本月收入</h3>
            <span class="card-subtitle">2025年11月</span>
          </div>
          <div class="earnings-amount">¥12,580.00</div>
          <div class="earnings-stats">
            <div class="earnings-stat">
              <div class="earnings-stat-value">+12.5%</div>
              <div class="earnings-stat-label">较上月</div>
            </div>
            <div class="earnings-stat">
              <div class="earnings-stat-value">32单</div>
              <div class="earnings-stat-label">本月订单</div>
            </div>
            <div class="earnings-stat">
              <div class="earnings-stat-value">¥393</div>
              <div class="earnings-stat-label">平均每单</div>
            </div>
          </div>
        </div>

        <!-- 车辆信息卡片 -->
        <div class="vehicle-card card-shadow">
          <img src="../../用户/images/car-example.jpg" alt="车辆照片" class="vehicle-image" />
          <div class="vehicle-info">
            <div class="vehicle-model">大众 · 朗逸 2020款</div>
            <div class="vehicle-details">
              <div class="detail-item">
                <i class="fa fa-key"></i>
                <span>粤A12345</span>
              </div>
              <div class="detail-item">
                <i class="fa fa-paint-brush"></i>
                <span>黑色</span>
              </div>
              <div class="detail-item">
                <i class="fa fa-calendar"></i>
                <span>2022-03-15注册</span>
              </div>
            </div>
          </div>
          <a href="#" class="arrow-link">
            <i class="fa fa-chevron-right"></i>
          </a>
        </div>
      </div>

      <!-- 车主功能菜单 -->
      <div class="profile-menu">
        <div class="menu-section">
          <h3 class="section-title">订单管理</h3>
          <div class="menu-items">
            <a href="#" class="menu-item hover-effect">
              <i class="fa fa-clock-o icon-primary"></i>
              <span>待接订单</span>
              <span class="badge badge-primary">3</span>
            </a>
            <a href="#" class="menu-item hover-effect">
              <i class="fa fa-car icon-primary"></i>
              <span>进行中订单</span>
              <span class="badge badge-warning">1</span>
            </a>
            <a href="#" class="menu-item hover-effect">
              <i class="fa fa-history icon-primary"></i>
              <span>历史订单</span>
              <i class="fa fa-chevron-right icon-secondary"></i>
            </a>
            <a href="#" class="menu-item hover-effect">
              <i class="fa fa-star icon-primary"></i>
              <span>乘客评价</span>
              <i class="fa fa-chevron-right icon-secondary"></i>
            </a>
          </div>
        </div>

        <div class="menu-section">
          <h3 class="section-title">账户与设置</h3>
          <div class="menu-items">
            <a href="#" class="menu-item hover-effect">
              <i class="fa fa-money icon-primary"></i>
              <span>我的钱包</span>
              <span class="balance">¥5,680.00</span>
            </a>
            <a href="#" class="menu-item hover-effect">
              <i class="fa fa-bank icon-primary"></i>
              <span>银行卡管理</span>
              <i class="fa fa-chevron-right icon-secondary"></i>
            </a>
            <a href="#" class="menu-item hover-effect">
              <i class="fa fa-cog icon-primary"></i>
              <span>车主设置</span>
              <i class="fa fa-chevron-right icon-secondary"></i>
            </a>
            <a href="#" class="menu-item hover-effect logout-item">
              <i class="fa fa-sign-out icon-primary"></i>
              <span>退出登录</span>
              <i class="fa fa-chevron-right icon-secondary"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script src="../js/profile.js"></script>
  <script src="../../用户/js/home.js"></script>
    </form>
</body>
</html>
