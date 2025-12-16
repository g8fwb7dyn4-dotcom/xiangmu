<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="trip.aspx.cs" Inherits="KLBAPP.用户.web.trip" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 我的行程</title>
    <link rel="stylesheet" href="../css/home.css"/>
    <link rel="stylesheet" href="../css/trip.css"/>
    <link rel="icon" href="../images/图标.ico"/>
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
            <a href="trip.aspx" class="nav-link active" data-page="trips">行程</a>
            <a href="message.aspx" class="nav-link" data-page="messages">消息</a>

            <!-- 下拉菜单 -->
            <div class="dropdown">
                <a href="profile.aspx" class="nav-link dropdown-toggle" data-page="profile">我的</a>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item">个人中心</a>
                    <a href="#" class="dropdown-item">设置</a>
                    <a href="#" class="dropdown-item">帮助中心</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout-btn">退出登录</a>
                </div>
            </div>
        </nav>

        <div class="user-actions">
            <button id="login-btn" class="btn btn-outline">登录</button>
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
                <a href="订单.html" class="mobile-nav-link" data-page="orders">订单</a>
                <a href="行程.html" class="mobile-nav-link active" data-page="trips">行程</a>
                <a href="消息.html" class="mobile-nav-link" data-page="messages">消息</a>
                <a href="#" class="mobile-nav-link" data-page="profile">我的</a>
                <div class="mobile-user-actions">
                    <button id="mobile-login-btn" class="btn btn-outline">登录</button>
                    <button id="mobile-register-btn" class="btn btn-primary">注册</button>
                </div>
            </nav>
        </div>
    </div>

    <!-- 主要内容区 -->
    <main class="main-content trip-page">
        <!-- 当前行程状态 -->
        <div class="trip-status-header">
            <h2>当前行程</h2>
            <div class="trip-status-indicator">
                <span class="status-dot active" data-status="waiting">待接驾</span>
                <span class="status-line"></span>
                <span class="status-dot" data-status="pickup">已接驾</span>
                <span class="status-line"></span>
                <span class="status-dot" data-status="arrived">已到达</span>
            </div>
        </div>

        <!-- 当前行程卡片 -->
        <div class="current-trip-card animate-fade-in">
            <div class="trip-route">
                <div class="route-point start-point">
                    <div class="point-marker">
                        <i class="fa fa-map-marker"></i>
                    </div>
                    <div class="point-info">
                        <h3>出发地</h3>
                        <p id="current-trip-pickup">东方广场A座</p>
                    </div>
                </div>
                <div class="route-line"></div>
                <div class="route-point end-point">
                    <div class="point-marker">
                        <i class="fa fa-flag"></i>
                    </div>
                    <div class="point-info">
                        <h3>目的地</h3>
                        <p id="current-trip-destination">大学城科技园B区</p>
                    </div>
                </div>
            </div>

            <div class="trip-meta">
                <div class="meta-item">
                    <i class="fa fa-clock-o"></i>
                    <span>预计行程时间: <strong>45分钟</strong></span>
                </div>
                <div class="meta-item">
                    <i class="fa fa-credit-card"></i>
                    <span>预计费用: <strong>¥42.00</strong></span>
                </div>
                <div class="meta-item">
                    <i class="fa fa-users"></i>
                    <span>乘客数量: <strong>2人</strong></span>
                </div>
            </div>

            <div class="driver-info-card">
                <img src="../images/司机头像.png" alt="司机头像" class="driver-avatar">
                <div class="driver-details">
                    <h3>李师傅 <span class="rating">4.8 <i class="fa fa-star"></i></span></h3>
                    <p>丰田卡罗拉 · 粤A12345</p>
                    <div class="driver-location">
                        <i class="fa fa-location-arrow"></i>
                        <span id="driver-distance">距离您1.2公里，约3分钟到达</span>
                    </div>
                </div>
                <div class="driver-actions">
                    <button class="btn btn-call"><i class="fa fa-phone"></i></button>
                    <button class="btn btn-message"><i class="fa fa-comment"></i></button>
                </div>
            </div>

            <div class="trip-actions">
                <button class="btn btn-secondary" id="cancel-trip">取消行程</button>
                <button class="btn btn-primary" id="confirm-pickup" style="display:none">确认上车</button>
                <button class="btn btn-primary" id="confirm-arrival" style="display:none">确认到达</button>
            </div>
        </div>

        <h2 class="section-title">历史行程</h2>
        <div class="past-trips-container">
            <!-- 历史行程将通过JS动态生成 -->
        </div>

        <!-- 空状态提示 -->
        <div class="empty-state" style="display: none;">
            <i class="fa fa-calendar-o"></i>
            <h3>暂无历史行程</h3>
            <p>您的所有行程记录将显示在这里</p>
            <button class="btn btn-primary" onclick="window.location.href='主页.html'">立即打车</button>
        </div>
    </main>

    <script src="../js/trip.js"></script>
    </form>
</body>
</html>
