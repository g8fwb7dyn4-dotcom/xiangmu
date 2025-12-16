<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="system-settings.aspx.cs" Inherits="KLBAPP.管理员.web.system_settings" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 系统设置</title>
  <!-- 外部样式引用 -->
  <link rel="stylesheet" href="../../用户/css/home.css" />
  <link rel="stylesheet" href="../css/Console.css" />
  <link rel="stylesheet" href="../css/system-settings.css" />
  <link href="../../Content/font-awesome.css" rel="stylesheet" />
  <link rel="icon" href="../../用户/images/图标.ico" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 - 与其他管理员页面保持一致 -->
  <header class="navbar">
    <div class="logo">
      <h1>KLUOBO 管理员</h1>
    </div>

    <!-- 桌面端导航 -->
    <nav class="nav-menu">
      <a href="Console.aspx" class="nav-link" data-page="admin-home">控制台</a>
      <a href="user-management.aspx" class="nav-link" data-page="user-management">用户管理</a>
      <a href="driver-management.aspx" class="nav-link" data-page="driver-management">司机管理</a>
      <a href="order-management.aspx" class="nav-link" data-page="order-management">订单管理</a>
      <a href="#" class="nav-link active" data-page="system-settings">系统设置</a>
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
        <a href="用户管理.html" class="mobile-nav-link" data-page="user-management">用户管理</a>
        <a href="司机管理.html" class="mobile-nav-link" data-page="driver-management">司机管理</a>
        <a href="订单管理.html" class="mobile-nav-link" data-page="order-management">订单管理</a>
        <a href="#" class="mobile-nav-link active" data-page="system-settings">系统设置</a>
        <div class="mobile-user-actions">
          <a href="管理员信息.html" class="btn btn-outline">管理员信息</a>
          <a href="#" class="btn btn-primary logout-btn">退出登录</a>
        </div>
      </nav>
    </div>
  </div>

  <!-- 主要内容区 -->
  <main class="system-settings">
    <div class="settings-header">
      <h2>系统设置</h2>
      <button class="btn btn-primary save-settings-btn">
        <i class="fa fa-save"></i> 保存设置
      </button>
    </div>

    <!-- 设置标签页导航 -->
    <div class="settings-tabs">
      <button class="tab-btn active" data-tab="general">基本设置</button>
      <button class="tab-btn" data-tab="notifications">通知设置</button>
      <button class="tab-btn" data-tab="security">安全设置</button>
      <button class="tab-btn" data-tab="backup">数据备份</button>
    </div>

    <!-- 设置内容区域 -->
    <div class="settings-content">
      <!-- 基本设置 -->
      <div class="settings-tab active" id="general-tab">
        <div class="setting-group">
          <h3>网站信息</h3>
          <div class="form-group">
            <label for="site-name">网站名称</label>
            <input type="text" id="site-name" value="KLUOBO 拼车平台"/>
          </div>
          <div class="form-group">
            <label for="site-description">网站描述</label>
            <textarea id="site-description" rows="3">专业的拼车出行服务平台，为用户提供便捷、安全、经济的出行选择。</textarea>
          </div>
          <div class="form-group">
            <label for="site-logo">网站Logo</label>
            <div class="file-upload">
              <input type="file" id="site-logo" accept="image/*"/>
              <span class="file-placeholder">选择图片文件</span>
            </div>
            <div class="current-logo">
              <img src="../../用户/images/图标.ico" alt="当前Logo"/>
              <button class="remove-logo btn btn-outline">移除</button>
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h3>联系信息</h3>
          <div class="form-group">
            <label for="contact-email">联系邮箱</label>
            <input type="email" id="contact-email" value="support@kluobo.com"/>
          </div>
          <div class="form-group">
            <label for="contact-phone">联系电话</label>
            <input type="tel" id="contact-phone" value="400-123-4567"/>
          </div>
          <div class="form-group">
            <label for="working-hours">工作时间</label>
            <input type="text" id="working-hours" value="周一至周日 08:00-22:00"/>
          </div>
        </div>
      </div>

      <!-- 通知设置 -->
      <div class="settings-tab" id="notifications-tab">
        <div class="setting-group">
          <h3>系统通知</h3>
          
          <div class="form-group toggle-group">
            <label>新用户注册通知</label>
            <label class="switch">
              <input type="checkbox" checked="checked" id="notify-new-user"/>
              <span class="slider round"></span>
            </label>
          </div>
          
          <div class="form-group toggle-group">
            <label>司机认证通知</label>
            <label class="switch">
              <input type="checkbox" checked id="notify-driver-verification"/>
              <span class="slider round"></span>
            </label>
          </div>
          
          <div class="form-group toggle-group">
            <label>用户投诉通知</label>
            <label class="switch">
              <input type="checkbox" checked id="notify-complaints"/>
              <span class="slider round"></span>
            </label>
          </div>
          
          <div class="form-group toggle-group">
            <label>系统错误通知</label>
            <label class="switch">
              <input type="checkbox" checked id="notify-errors"/>
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div class="setting-group">
          <h3>邮件通知模板</h3>
          <div class="form-group">
            <label for="welcome-email">新用户欢迎邮件</label>
            <textarea id="welcome-email" rows="4">欢迎加入KLUOBO拼车平台，您的账号已成功创建。点击链接完成激活：{activation_link}</textarea>
          </div>
          
          <div class="form-group">
            <label for="driver-approved">司机认证通过邮件</label>
            <textarea id="driver-approved" rows="4">恭喜您，您的司机认证已通过审核，现在可以开始接单了。登录平台查看详情：{login_link}</textarea>
          </div>
        </div>
      </div>

      <!-- 安全设置 -->
      <div class="settings-tab" id="security-tab">
        <div class="setting-group">
          <h3>密码策略</h3>
          
          <div class="form-group toggle-group">
            <label>强制密码复杂度</label>
            <label class="switch">
              <input type="checkbox" checked id="enforce-password-complexity"/>
              <span class="slider round"></span>
            </label>
          </div>
          
          <div class="form-group">
            <label for="password-expiry">密码有效期（天）</label>
            <input type="number" id="password-expiry" value="90" min="0"/>
            <small>设置为0表示永不过期</small>
          </div>
          
          <div class="form-group toggle-group">
            <label>登录失败锁定</label>
            <label class="switch">
              <input type="checkbox" checked id="enable-login-lock"/>
              <span class="slider round"></span>
            </label>
          </div>
          
          <div class="form-group">
            <label for="max-failed-attempts">最大失败尝试次数</label>
            <input type="number" id="max-failed-attempts" value="5" min="1" max="10"/>
          </div>
        </div>

        <div class="setting-group">
          <h3>会话管理</h3>
          
          <div class="form-group">
            <label for="session-timeout">会话超时时间（分钟）</label>
            <input type="number" id="session-timeout" value="30" min="5" max="120"/>
          </div>
          
          <div class="form-group toggle-group">
            <label>允许同时登录</label>
            <label class="switch">
              <input type="checkbox" id="allow-multiple-login"/>
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- 数据备份 -->
      <div class="settings-tab" id="backup-tab">
        <div class="setting-group">
          <h3>自动备份设置</h3>
          
          <div class="form-group toggle-group">
            <label>启用自动备份</label>
            <label class="switch">
              <input type="checkbox" checked id="enable-auto-backup"/>
              <span class="slider round"></span>
            </label>
          </div>
          
          <div class="form-group">
            <label for="backup-frequency">备份频率</label>
            <select id="backup-frequency">
              <option value="daily">每天</option>
              <option value="weekly" selected>每周</option>
              <option value="monthly">每月</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="backup-time">备份时间</label>
            <input type="time" id="backup-time" value="02:00"/>
          </div>
          
          <div class="form-group">
            <label for="backup-retention">备份保留天数</label>
            <input type="number" id="backup-retention" value="30" min="1" max="365"/>
          </div>
        </div>

        <div class="setting-group">
          <h3>手动备份</h3>
          <button class="btn btn-outline" id="manual-backup-btn">
            <i class="fa fa-database"></i> 创建手动备份
          </button>
          
          <h4 style="margin-top: 1.5rem;">备份历史</h4>
          <div class="backup-history">
            <div class="backup-item">
              <div class="backup-info">
                <span class="backup-type">自动备份</span>
                <span class="backup-date">2023-11-15 02:00</span>
                <span class="backup-size">245 MB</span>
              </div>
              <div class="backup-actions">
                <button class="btn btn-sm btn-outline restore-btn">恢复</button>
                <button class="btn btn-sm btn-outline download-btn">下载</button>
              </div>
            </div>
            <div class="backup-item">
              <div class="backup-info">
                <span class="backup-type">自动备份</span>
                <span class="backup-date">2023-11-08 02:00</span>
                <span class="backup-size">238 MB</span>
              </div>
              <div class="backup-actions">
                <button class="btn btn-sm btn-outline restore-btn">恢复</button>
                <button class="btn btn-sm btn-outline download-btn">下载</button>
              </div>
            </div>
            <div class="backup-item">
              <div class="backup-info">
                <span class="backup-type">手动备份</span>
                <span class="backup-date">2023-11-05 14:30</span>
                <span class="backup-size">235 MB</span>
              </div>
              <div class="backup-actions">
                <button class="btn btn-sm btn-outline restore-btn">恢复</button>
                <button class="btn btn-sm btn-outline download-btn">下载</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- 保存成功提示 -->
  <div class="toast-notification" id="save-toast">
    设置已成功保存
  </div>

  <!-- 外部脚本引用 -->
  <script src="../js/Console.js"></script>
  <script src="../js/system-settings.js"></script>
    </form>
</body>
</html>
