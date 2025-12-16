<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="user-management.aspx.cs" Inherits="KLBAPP.管理员.web.user_management" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 用户管理</title>
  <!-- 外部样式引用 -->
  <link rel="stylesheet" href="../../用户/css/home.css" />
  <link rel="stylesheet" href="../css/Console.css" />
  <link rel="stylesheet" href="../css/user-management.css" />
  <link href="../../Content/font-awesome.css" rel="stylesheet" />
  <link rel="icon" href="../../用户/images/图标.ico" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 - 与控制台页面保持一致 -->
  <header class="navbar">
    <div class="logo">
      <h1>KLUOBO 管理员</h1>
    </div>

    <!-- 桌面端导航 -->
    <nav class="nav-menu">
      <a href="Console.aspx" class="nav-link" data-page="admin-home">控制台</a>
      <a href="#" class="nav-link active" data-page="user-management">用户管理</a>
      <a href="driver-management.aspx" class="nav-link" data-page="driver-management">司机管理</a>
      <a href="order-management.aspx" class="nav-link" data-page="order-management">订单管理</a>
      <a href="system-settings.aspx" class="nav-link" data-page="system-settings">系统设置</a>
    </nav>

    <div class="user-actions">
      <div class="dropdown" id="admin-dropdown">
        <button id="admin-menu-btn" class="btn btn-outline logged-in-user">管理员</button>
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
        <a href="控制台.html" class="mobile-nav-link" data-page="admin-home">控制台</a>
        <a href="#" class="mobile-nav-link active" data-page="user-management">用户管理</a>
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
  <main class="user-management">
    <div class="management-header">
      <h2>用户管理</h2>
      <button class="btn btn-primary" id="add-user-btn">
        <i class="fa fa-plus"></i> 添加用户
      </button>
    </div>

    <div class="search-filter">
      <div class="search-box">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="搜索用户名、手机号或邮箱" id="search-input">
      </div>
      <select class="filter-select" id="status-filter">
        <option value="all">全部状态</option>
        <option value="active">已激活</option>
        <option value="inactive">未激活</option>
      </select>
      <select class="filter-select" id="sort-filter">
        <option value="latest">最新注册</option>
        <option value="orders">订单数量</option>
        <option value="spending">消费金额</option>
      </select>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>用户信息</th>
          <th>手机号</th>
          <th class="hidden-mobile">邮箱</th>
          <th>注册时间</th>
          <th class="hidden-mobile">订单数</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="users-table-body">
        <!-- 用户数据将通过JS动态生成 -->
      </tbody>
    </table>

    <div class="pagination" id="pagination">
      <!-- 分页按钮将通过JS动态生成 -->
    </div>
  </main>

  <!-- 用户详情/编辑模态框 -->
  <div class="modal" id="user-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="modal-title">用户详情</h3>
        <button class="close-modal" id="close-modal">&times;</button>
      </div>
      <div class="modal-body" id="modal-body">
        <!-- 模态框内容将通过JS动态生成 -->
      </div>
      <div class="modal-footer" id="modal-footer">
        <!-- 模态框按钮将通过JS动态生成 -->
      </div>
    </div>
  </div>

  <!-- 外部脚本引用 -->
  <script src="../js/Console.js"></script>
  <script src="../js/user-management.js"></script>
    </form>
</body>
</html>
