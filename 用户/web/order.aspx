<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="order.aspx.cs" Inherits="KLBAPP.用户.web.order" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 我的订单</title>
    <link rel="stylesheet" href="../css/home.css"/>
    <link rel="stylesheet" href="../css/order.css"/>
    <link rel="icon" href="../images/图标.ico"/>
    <link href="../../Content/font-awesome.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 -->
    <header class="navbar">
        <div class="logo">
            <h1>KLUOBO</h1>
        </div>

        <!-- 桌面端导航 -->
        <nav class="nav-menu">
            <a href="home.aspx" class="nav-link" data-page="home">首页</a>
            <a href="order.aspx" class="nav-link active" data-page="orders">订单</a>
            <a href="trip.aspx" class="nav-link" data-page="trips">行程</a>
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
                <a href="订单.html" class="mobile-nav-link active" data-page="orders">订单</a>
                <a href="行程.html" class="mobile-nav-link" data-page="trips">行程</a>
                <a href="#" class="mobile-nav-link" data-page="messages">消息</a>
                <a href="#" class="mobile-nav-link" data-page="profile">我的</a>
                <div class="mobile-user-actions">
                    <button id="mobile-login-btn" class="btn btn-outline">登录</button>
                    <button id="mobile-register-btn" class="btn btn-primary">注册</button>
                </div>
            </nav>
        </div>
    </div>

    <!-- 主要内容区 -->
    <main class="main-content order-page">
        <div class="order-filters">
            <button class="filter-btn active" data-filter="all">全部订单</button>
            <button class="filter-btn" data-filter="confirmed">已确认</button>
            <button class="filter-btn" data-filter="completed">已完成</button>
            <button class="filter-btn" data-filter="cancelled">已取消</button>
        </div>

        <div class="orders-container">
            <!-- 订单列表将通过JS动态生成 -->
            <div class="no-orders" style="display: none;">
                <i class="fa fa-file-text-o"></i>
                <p>暂无订单记录</p>
                <a href="主页.html" class="btn btn-primary">去叫车</a>
            </div>
        </div>
    </main>

    <!-- 订单详情模态框 -->
    <div class="order-detail-modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>订单详情</h3>
                <button class="close-modal">
                    <i class="fa fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <!-- 订单详情内容将通过JS动态生成 -->
            </div>
            <div class="modal-footer">
                <!-- 操作按钮将通过JS动态生成 -->
            </div>
        </div>
    </div>

    <script src="../js/order.js"></script>
    </form>
</body>
</html>
