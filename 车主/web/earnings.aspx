<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="earnings.aspx.cs" Inherits="KLBAPP.车主.web.earnings" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 收入统计</title>
  <link rel="stylesheet" href="../../用户/css/home.css" />
  <link rel="stylesheet" href="../css/driver.css" />
  <link rel="stylesheet" href="../css/earnings.css" />
  <link rel="icon" href="../../用户/images/图标.ico" />
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"> -->
   <link href="../../Content/font-awesome.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 -->
  <header class="navbar">
    <div class="logo">
      <h1>KLUOBO 车主</h1>
    </div>

    <nav class="nav-menu">
      <a href="driver.aspx" class="nav-link" data-page="driver-home">主页</a>
      <a href="#" class="nav-link active" data-page="driver-earnings">收入统计</a>
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
    <!-- 收入概览卡片 -->
    <div class="earnings-overview">
      <h2>收入概览</h2>
      <div class="date-filter">
        <button class="filter-btn active" data-period="day">今日</button>
        <button class="filter-btn" data-period="week">本周</button>
        <button class="filter-btn" data-period="month">本月</button>
        <button class="filter-btn" data-period="year">全年</button>
      </div>
      
      <div class="earnings-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span>总收入</span>
            <i class="fa fa-money"></i>
          </div>
          <div class="stat-value" id="total-earnings">¥1,256.00</div>
          <div class="stat-change positive">
            <i class="fa fa-arrow-up"></i> 12.5% 较上期
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <span>订单数量</span>
            <i class="fa fa-list-alt"></i>
          </div>
          <div class="stat-value" id="order-count">28</div>
          <div class="stat-change positive">
            <i class="fa fa-arrow-up"></i> 8 单 较上期
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <span>平均每单</span>
            <i class="fa fa-tachometer"></i>
          </div>
          <div class="stat-value" id="avg-per-order">¥44.86</div>
          <div class="stat-change negative">
            <i class="fa fa-arrow-down"></i> 3.2% 较上期
          </div>
        </div>
      </div>
    </div>

    <!-- 收入趋势图表 -->
    <div class="chart-container">
      <h2>收入趋势</h2>
      <div class="chart-wrapper">
        <canvas id="earnings-chart"></canvas>
      </div>
    </div>

    <!-- 收入明细 -->
    <div class="earnings-details">
      <h2>收入明细</h2>
      <div class="detail-filters">
        <select id="order-type-filter">
          <option value="all">全部订单类型</option>
          <option value="express">快车</option>
          <option value="premium">专车</option>
          <option value="share">拼车</option>
        </select>
      </div>
      
      <div class="earnings-list" id="earnings-list">
        <div class="earning-item">
          <div class="earning-info">
            <div class="earning-header">
              <span class="order-number">订单 #OD789456</span>
              <span class="earning-time">今天 14:35</span>
            </div>
            <div class="earning-details">
              <span class="order-type">快车</span>
              <span class="route">东方广场 → 大学城科技园</span>
            </div>
          </div>
          <div class="earning-amount positive">+¥35.50</div>
        </div>
        
        <div class="earning-item">
          <div class="earning-info">
            <div class="earning-header">
              <span class="order-number">订单 #OD789321</span>
              <span class="earning-time">今天 11:20</span>
            </div>
            <div class="earning-details">
              <span class="order-type">专车</span>
              <span class="route">中央公园 → 星河小区</span>
            </div>
          </div>
          <div class="earning-amount positive">+¥68.00</div>
        </div>
        
        <div class="earning-item">
          <div class="earning-info">
            <div class="earning-header">
              <span class="order-number">订单 #OD789156</span>
              <span class="earning-time">昨天 19:45</span>
            </div>
            <div class="earning-details">
              <span class="order-type">拼车</span>
              <span class="route">火车站 → 会展中心</span>
            </div>
          </div>
          <div class="earning-amount positive">+¥28.00</div>
        </div>
        
        <div class="earning-item">
          <div class="earning-info">
            <div class="earning-header">
              <span class="order-number">平台服务费</span>
              <span class="earning-time">昨天 23:59</span>
            </div>
            <div class="earning-details">
              <span class="order-type">系统扣除</span>
              <span class="route">当日订单服务费</span>
            </div>
          </div>
          <div class="earning-amount negative">-¥15.60</div>
        </div>
      </div>
      
      <button class="view-more-btn" id="load-more-earnings">
        <i class="fa fa-refresh"></i> 查看更多记录
      </button>
    </div>
  </main>

  <script src="../js/chart.umd.min.js"></script>
  <script src="../js/earnings.js"></script>
    </form>
</body>
</html>
