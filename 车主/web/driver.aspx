<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="driver.aspx.cs" Inherits="KLBAPP.车主.web.driver" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 车主中心</title>
  <link rel="stylesheet" href="../../用户/css/home.css" />
  <link rel="stylesheet" href="../css/driver.css" />
  <link rel="icon" href="../../用户/images/图标.ico" />
  <link href="../../Content/font-awesome.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 -->
  <header class="navbar">
    <div class="logo">
      <h1>KLUOBO 车主</h1>
    </div>

    <!-- 桌面端导航 -->
    <nav class="nav-menu">
      <a href="#" class="nav-link active" data-page="driver-home">主页</a>
      <a href="earnings.aspx" class="nav-link" data-page="driver-earnings">收入统计</a>
      <a href="profile.aspx" class="nav-link" data-page="driver-profile">我的信息</a>
      <a href="message.aspx" class="nav-link" data-page="driver-messages">消息</a>
    </nav>

    <div class="user-actions">
      <div class="dropdown" id="driver-dropdown">
        <button id="driver-menu-btn" class="btn btn-outline">张师傅</button>
        <div class="dropdown-menu">
          <a href="我的信息.html" class="dropdown-item">个人中心</a>
          <a href="#" class="dropdown-item">设置</a>
          <a href="#" class="dropdown-item">帮助中心</a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item logout-btn">退出登录</a>
        </div>
      </div>
    </div>
  </header>

  <!-- 主要内容区 -->
  <main class="main-content">
    <!-- 司机状态卡片 -->
    <div class="driver-status-card">
      <div class="status-info">
        <h2>当前状态</h2>
        <div class="status-toggle">
          <span id="current-status">离线</span>
          <label class="switch">
            <input type="checkbox" id="status-switch">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-value" id="today-orders">0</span>
          <span class="stat-label">今日订单</span>
        </div>
        <div class="stat-item">
          <span class="stat-value" id="today-earnings">¥0</span>
          <span class="stat-label">今日收入</span>
        </div>
        <div class="stat-item">
          <span class="stat-value" id="total-orders">0</span>
          <span class="stat-label">总订单</span>
        </div>
        <div class="stat-item">
          <span class="stat-value" id="rating">0</span>
          <span class="stat-label">评分</span>
        </div>
      </div>
    </div>

    <!-- 附近订单 -->
    <div class="nearby-orders">
      <h2>附近的订单</h2>
      <div class="orders-list" id="orders-container">
        <!-- 订单将通过JS动态生成 -->
      </div>
      <button class="view-more-btn" id="load-more-orders">
        <i class="fa fa-refresh"></i> 查看更多订单
      </button>
    </div>

    <!-- 待处理订单 -->
    <div class="pending-orders">
      <h2>待处理订单</h2>
      <div class="pending-orders-list" id="pending-orders-container">
        <!-- 待处理订单将通过JS动态生成 -->
      </div>
    </div>
  </main>

  <script src="./js/driver.js"></script>
    </form>
</body>
</html>
