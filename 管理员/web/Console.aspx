<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Console.aspx.cs" Inherits="KLBAPP.管理员.web.Console" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 管理员中心</title>
    <link rel="stylesheet" href="../../用户/css/home.css" />
    <link rel="stylesheet" href="../css/Console.css" />
    <link rel="icon" href="../../用户/images/图标.ico" />
    <link href="../../Content/font-awesome.css" rel="stylesheet" />
    <script src="../js/chart.umd.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 -->
    <header class="navbar">
        <div class="logo">
            <h1>KLUOBO 管理员</h1>
        </div>

        <!-- 桌面端导航 -->
        <nav class="nav-menu">
            <a href="#" class="nav-link active" data-page="admin-home">控制台</a>
            <a href="user-management.aspx" class="nav-link" data-page="user-management">用户管理</a>
            <a href="driver-management.aspx" class="nav-link" data-page="driver-management">司机管理</a>
            <a href="order-management.aspx" class="nav-link" data-page="order-management">订单管理</a>
            <a href="system-settings.aspx" class="nav-link" data-page="system-settings">系统设置</a>
        </nav>

        <div class="user-actions">
            <div class="dropdown" id="admin-dropdown">
                <button id="admin-menu-btn" class="btn btn-outline logged-in-user">
                    <i class="fa fa-user-circle mr-2"></i>管理员
                </button>
                <div class="dropdown-menu">
                    <a href="管理员信息.html" class="dropdown-item">个人中心</a>
                    <a href="#" class="dropdown-item">账户设置</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item logout-btn">退出登录</a>
                </div>
            </div>
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
                <a href="#" class="mobile-nav-link active" data-page="admin-home">控制台</a>
                <a href="用户管理.html" class="mobile-nav-link" data-page="user-management">用户管理</a>
                <a href="司机管理.html" class="mobile-nav-link" data-page="driver-management">司机管理</a>
                <a href="订单管理.html" class="mobile-nav-link" data-page="order-management">订单管理</a>
                <a href="系统设置.html" class="mobile-nav-link" data-page="system-settings">系统设置</a>
                <div class="mobile-user-actions">
                    <a href="管理员信息.html" class="btn btn-outline">管理员信息</a>
                    <a href="#" class="btn btn-primary logout-btn">退出登录</a>
                </div>
            </nav>
        </div>
    </div>

    <!-- 主要内容区 -->
    <main class="main-content admin-dashboard">
        <!-- 页面标题和日期 -->
        <div class="dashboard-header">
            <h2>控制台概览</h2>
            <div class="dashboard-date" id="current-date"></div>
        </div>

        <!-- 数据概览卡片 -->
        <div class="stats-overview">
            <div class="stat-card card-shadow hover-lift">
                <div class="stat-icon user-icon">
                    <i class="fa fa-users"></i>
                </div>
                <div class="stat-info">
                    <h3>总用户数</h3>
                    <p class="stat-value" id="total-users">12,580</p>
                    <p class="stat-change">
                        <i class="fa fa-arrow-up"></i> 12.5% 较上月
                    </p>
                </div>
            </div>

            <div class="stat-card card-shadow hover-lift">
                <div class="stat-icon driver-icon">
                    <i class="fa fa-car"></i>
                </div>
                <div class="stat-info">
                    <h3>总司机数</h3>
                    <p class="stat-value" id="total-drivers">1,286</p>
                    <p class="stat-change">
                        <i class="fa fa-arrow-up"></i> 8.2% 较上月
                    </p>
                </div>
            </div>

            <div class="stat-card card-shadow hover-lift">
                <div class="stat-icon order-icon">
                    <i class="fa fa-list-alt"></i>
                </div>
                <div class="stat-info">
                    <h3>今日订单</h3>
                    <p class="stat-value" id="today-orders">1,842</p>
                    <p class="stat-change">
                        <i class="fa fa-arrow-up"></i> 5.3% 较昨日
                    </p>
                </div>
            </div>

            <div class="stat-card card-shadow hover-lift">
                <div class="stat-icon revenue-icon">
                    <i class="fa fa-money"></i>
                </div>
                <div class="stat-info">
                    <h3>今日营收</h3>
                    <p class="stat-value" id="today-revenue">¥86,520</p>
                    <p class="stat-change">
                        <i class="fa fa-arrow-up"></i> 3.7% 较昨日
                    </p>
                </div>
            </div>
        </div>

        <!-- 图表区域 -->
        <div class="charts-section">
            <div class="chart-card card-shadow hover-lift">
                <div class="chart-header">
                    <h3>订单趋势 (近7天)</h3>
                    <div class="chart-filter">
                        <select class="period-select">
                            <option value="7">近7天</option>
                            <option value="30">近30天</option>
                            <option value="90">近90天</option>
                        </select>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="orders-chart"></canvas>
                </div>
            </div>

            <div class="chart-card card-shadow hover-lift">
                <div class="chart-header">
                    <h3>用户与司机增长</h3>
                    <div class="chart-filter">
                        <select class="period-select">
                            <option value="6">近6个月</option>
                            <option value="12">近12个月</option>
                        </select>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="growth-chart"></canvas>
                </div>
            </div>
        </div>

        <!-- 最近活动和待处理事项 -->
        <div class="dashboard-grid">
            <!-- 最近活动 -->
            <div class="recent-activities card-shadow hover-lift">
                <div class="section-header">
                    <h3>最近活动</h3>
                    <a href="#" class="view-all-link">查看全部</a>
                </div>
                <div class="activities-list" id="activities-container">
                    <!-- 活动记录将通过JS动态生成 -->
                </div>
                <button class="view-more-btn">查看更多活动</button>
            </div>

            <!-- 待处理事项 -->
            <div class="pending-tasks card-shadow hover-lift">
                <div class="section-header">
                    <h3>待处理事项</h3>
                    <span class="task-count">3 项任务</span>
                </div>
                <div class="tasks-list">
                    <div class="task-item">
                        <span class="task-type driver-verification">司机认证</span>
                        <span class="task-content">新司机认证待审核 (12)</span>
                        <button class="task-action btn btn-outline">处理</button>
                    </div>
                    <div class="task-item">
                        <span class="task-type complaint">用户投诉</span>
                        <span class="task-content">用户投诉待处理 (5)</span>
                        <button class="task-action btn btn-outline">处理</button>
                    </div>
                    <div class="task-item">
                        <span class="task-type system">系统通知</span>
                        <span class="task-content">系统更新提醒</span>
                        <button class="task-action btn btn-outline">查看</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script src="../js/Console.js"></script>
    </form>
</body>
</html>
