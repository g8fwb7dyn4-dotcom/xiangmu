<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="message.aspx.cs" Inherits="KLBAPP.用户.web.message" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 消息中心</title>
    <link rel="stylesheet" href="../css/home.css"/>
    <link rel="stylesheet" href="../css/message.css"/>
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
            <a href="trip.aspx" class="nav-link" data-page="trips">行程</a>
            <a href="message.aspx" class="nav-link active" data-page="messages">消息</a>

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
                <a href="行程.html" class="mobile-nav-link" data-page="trips">行程</a>
                <a href="消息.html" class="mobile-nav-link active" data-page="messages">消息</a>
                <a href="#" class="mobile-nav-link" data-page="profile">我的</a>
                <div class="mobile-user-actions">
                    <button id="mobile-login-btn" class="btn btn-outline">登录</button>
                    <button id="mobile-register-btn" class="btn btn-primary">注册</button>
                </div>
            </nav>
        </div>
    </div>

    <!-- 主要内容区 -->
    <main class="main-content message-page">
        <div class="message-container">
            <!-- 消息列表侧边栏 -->
            <div class="message-sidebar">
                <h2 class="section-title">消息中心</h2>
                
                <!-- 搜索框 -->
                <div class="message-search">
                    <i class="fa fa-search"></i>
                    <input type="text" placeholder="搜索消息...">
                </div>
                
                <!-- 消息分类标签 -->
                <div class="message-tabs">
                    <button class="tab-btn active" data-tab="all">全部消息</button>
                    <button class="tab-btn" data-tab="order">订单消息</button>
                    <button class="tab-btn" data-tab="system">系统消息</button>
                    <button class="tab-btn" data-tab="driver">司机消息</button>
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
                        <img src="../images/图标.ico" alt="" class="partner-avatar">
                        <div class="partner-info">
                            <h3 class="partner-name">选择一个对话</h3>
                            <span class="online-status">点击左侧消息开始聊天</span>
                        </div>
                    </div>
                    <div class="chat-actions">
                        <button class="action-btn" title="语音通话">
                            <i class="fa fa-phone"></i>
                        </button>
                        <button class="action-btn" title="视频通话">
                            <i class="fa fa-video-camera"></i>
                        </button>
                        <button class="action-btn" title="更多选项">
                            <i class="fa fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 聊天内容区 -->
                <div class="chat-messages">
                    <div class="empty-chat">
                        <img src="../images/user-avatar.png" alt="开始聊天">
                        <p>选择一个对话开始聊天</p>
                    </div>
                    <!-- 聊天消息将通过JS动态生成 -->
                </div>
                
                <!-- 消息输入区 -->
                <div class="chat-input-area">
                    <div class="input-tools">
                        <button class="tool-btn" title="表情">
                            <i class="fa fa-smile-o"></i>
                        </button>
                        <button class="tool-btn" title="图片">
                            <i class="fa fa-picture-o"></i>
                        </button>
                        <button class="tool-btn" title="位置">
                            <i class="fa fa-map-marker"></i>
                        </button>
                    </div>
                    <div class="message-input-container">
                        <textarea id="message-input" placeholder="输入消息..."></textarea>
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
