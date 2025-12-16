<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="message.aspx.cs" Inherits="KLBAPP.车主.web.message1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 车主消息中心</title>
    <link rel="stylesheet" href="../../用户/css/home.css"/>
    <link rel="stylesheet" href="../css/message.css"/>
    <link rel="icon" href="../../用户/images/图标.ico"/>
    <link href="../../Content/font-awesome.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <!-- 顶部导航栏 - 车主端导航 -->
    <header class="navbar">
        <div class="logo">
            <h1>KLUOBO 车主</h1>
        </div>

        <!-- 桌面端导航 -->
        <nav class="nav-menu">
            <a href="driver.aspx" class="nav-link" data-page="driver-home">主页</a>
            <a href="earnings.aspx" class="nav-link" data-page="driver-earnings">收入统计</a>
            <a href="profile.aspx" class="nav-link" data-page="driver-profile">我的信息</a>
            <a href="message.aspx" class="nav-link active" data-page="driver-messages">消息</a>
        </nav>

        <!-- 下拉菜单 -->
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
                <a href="车主主页.html" class="mobile-nav-link" data-page="driver-home">主页</a>
                <a href="收入统计.html" class="mobile-nav-link" data-page="driver-earnings">收入统计</a>
                <a href="我的信息.html" class="mobile-nav-link" data-page="driver-profile">我的信息</a>
                <a href="消息.html" class="mobile-nav-link active" data-page="driver-messages">消息</a>
                <div class="mobile-user-actions">
                    <button id="mobile-login-btn" class="btn btn-outline">登录</button>
                </div>
            </nav>
        </div>
    </div>

    <!-- 主要内容区 -->
    <main class="main-content message-page">
        <div class="message-container">
            <!-- 消息列表侧边栏 -->
            <div class="message-sidebar active">
                <h2 class="section-title">消息中心</h2>
                
                <!-- 搜索框 -->
                <div class="message-search">
                    <i class="fa fa-search"></i>
                    <input type="text" placeholder="搜索消息..."/>
                </div>
                
                <!-- 消息分类标签 -->
                <div class="message-tabs">
                    <button class="tab-btn active" data-tab="all">全部消息</button>
                    <button class="tab-btn" data-tab="user">用户消息</button>
                    <button class="tab-btn" data-tab="system">系统消息</button>
                </div>
                
                <!-- 消息列表 -->
                <div class="messages-list">
                    <!-- 消息内容将通过JS动态生成 -->
                </div>
            </div>
            
            <!-- 聊天区域 -->
            <div class="chat-area">
                <!-- 聊天头部 -->
                <div class="chat-header">
                    <div class="chat-partner">
                        <img src="../../用户/images/图标.ico" alt="" class="partner-avatar"/>
                        <div class="partner-info">
                            <h3 class="partner-name">选择一个对话</h3>
                            <span class="online-status">点击左侧消息开始聊天</span>
                        </div>
                    </div>
                    <div class="chat-actions">
                        <button class="action-btn" title="语音通话">
                            <i class="fa fa-phone"></i>
                        </button>
                        <button class="action-btn" title="更多选项">
                            <i class="fa fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 聊天内容区 -->
                <div class="chat-messages">
                    <div class="empty-chat">
                        <img src="../../用户/images/司机头像.png" alt="开始聊天"/>
                        <p>选择一个对话查看用户消息</p>
                    </div>
                    <!-- 聊天消息将通过JS动态生成 -->
                </div>
                
                <!-- 消息输入区 - 车主可以回复用户消息 -->
                <div class="chat-input-area">
                    <div class="input-tools">
                        <button class="tool-btn" title="表情">
                            <i class="fa fa-smile-o"></i>
                        </button>
                        <button class="tool-btn" title="图片">
                            <i class="fa fa-picture-o"></i>
                        </button>
                    </div>
                    <div class="message-input-container">
                        <textarea id="message-input" placeholder="回复用户..."></textarea>
                    </div>
                    <button id="send-message" class="send-btn" disabled>
                        <i class="fa fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </main>

    <script src="../js/message.js"></script>
    </form>
</body>
</html>
