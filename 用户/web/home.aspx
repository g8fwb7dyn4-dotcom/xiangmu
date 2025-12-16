<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="KLBAPP.用户.web.home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>KLUOBO - 拼车出行</title>
    <link href="../css/home.css" rel="stylesheet" />
    <link href="../images/图标.ico" rel="icon" />
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
      <a href="home.aspx" class="nav-link active" data-page="home">首页</a>
      <a href="order.aspx" class="nav-link" data-page="orders">订单</a>
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
      <div class="dropdown" id="user-dropdown">
        <button id="login-btn" class="btn btn-outline">登录</button>
        <div class="dropdown-menu">
          <a href="#" class="dropdown-item">个人中心</a>
          <a href="#" class="dropdown-item">我的订单</a>
          <a href="#" class="dropdown-item">设置</a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item logout-btn">退出登录</a>
        </div>
      </div>
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
        <a href="#" class="mobile-nav-link active" data-page="home">首页</a>
        <a href="#" class="mobile-nav-link" data-page="orders">订单</a>
        <a href="行程.html" class="mobile-nav-link" data-page="trips">行程</a>
        <a href="#" class="mobile-nav-link" data-page="messages">消息</a>
        <a href="#" class="mobile-nav-link" data-page="profile">我的</a>
        <div class="mobile-user-actions">
          <button id="mobile-login-btn" class="btn btn-outline">登录</button>
          <button id="mobile-register-btn" class="btn btn-primary">
            注册
          </button>
        </div>
      </nav>
    </div>
  </div>

        <!-- 主要内容区 -->
        <main class="main-content">
    <!-- 轮播广告 -->
    <div class="banner-slider">
      <div class="banner-item active">
        <img src="../images/优惠1.png" alt="新用户专享优惠" />
        <!-- <div class="banner-text">新用户首单立减15元</div> -->
      </div>
      <div class="banner-item">
        <img src="../images/优惠2.png" alt="拼车优惠活动" />
        <!-- <div class="banner-text">拼车出行，每人立减5元</div> -->
      </div>
      <div class="banner-item">
        <img src="../images/优惠3.png" alt="拼团活动" />
        <!-- <div class="banner-text">欢迎拼团，一起出行！</div> -->
      </div>
      <div class="banner-controls">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <!-- 打车表单卡片 -->
    <div class="ride-card">
      <div class="ride-form">
        <div class="form-group location-input">
          <label>出发地</label>
          <div class="input-container">
            <i class="fa fa-map-marker"></i>
            <input type="text" placeholder="输入您的位置" id="pickup-location" />
          </div>
          <p class="error-message" id="pickup-error"></p>
        </div>

        <div class="form-group location-input">
          <label>目的地</label>
          <div class="input-container">
            <i class="fa fa-flag"></i>
            <input type="text" placeholder="输入您要去的地方" id="destination" />
          </div>
          <p class="error-message" id="destination-error"></p>
        </div>

        <div class="form-row">
          <div class="form-group time-selector">
            <label>出发时间</label>
            <div class="input-container">
              <i class="fa fa-calendar"></i>
              <select id="departure-time">
                <option value="now">立即出发</option>
                <option value="later">稍后出发</option>
              </select>
              <div class="input-container" id="scheduled-time-container" style="display: none;">
                <i class="fa fa-clock-o"></i>
                <input type="datetime-local" id="scheduled-time" />
              </div>
            </div>
          </div>

          <div class="form-group passenger-count">
            <label>乘车人数</label>
            <div class="input-container">
              <i class="fa fa-user"></i>
              <select id="passengers">
                <option value="1">1人</option>
                <option value="2">2人</option>
                <option value="3">3人</option>
                <option value="4">4人及以上</option>
              </select>
            </div>
          </div>
        </div>

        <button id="find-ride-btn" class="btn btn-primary">立即叫车</button>
      </div>

      <!-- 车型选择 -->
      <div class="ride-types">
        <div class="ride-type active" data-type="express">
          <i class="fa fa-car"></i>
          <span>快车</span>
        </div>
        <div class="ride-type" data-type="premium">
          <i class="fa fa-taxi"></i>
          <span>专车</span>
        </div>
        <div class="ride-type" data-type="share">
          <i class="fa fa-users"></i>
          <span>拼车</span>
        </div>
        <div class="ride-type" data-type="ride-share">
          <i class="fa fa-car"></i>
          <span>顺风车</span>
        </div>
      </div>
    </div>
    
    <!-- 附近司机 -->
    <div class="nearby-drivers">
      <h2>附近的司机</h2>
      <div class="drivers-list">
        <div class="driver-card">
          <img src="../images/司机头像.png" alt="司机头像" class="driver-avatar" />
          <div class="driver-info">
            <h3>
              张师傅
              <span class="rating">4.9 <i class="fa fa-star"></i></span>
            </h3>
            <p>大众 · 3年驾龄</p>
            <p class="distance">0.8公里 · 约2分钟</p>
          </div>
          <button class="contact-btn">联系司机</button>
        </div>

        <div class="driver-card">
          <img src="../images/司机头像.png" alt="司机头像" class="driver-avatar" />
          <div class="driver-info">
            <h3>
              李师傅
              <span class="rating">4.8 <i class="fa fa-star"></i></span>
            </h3>
            <p>丰田 · 5年驾龄</p>
            <p class="distance">1.2公里 · 约3分钟</p>
          </div>
          <button class="contact-btn">联系司机</button>
        </div>

        <div class="driver-card">
          <img src="../images/司机头像.png" alt="司机头像" class="driver-avatar" />
          <div class="driver-info">
            <h3>
              王师傅
              <span class="rating">4.7 <i class="fa fa-star"></i></span>
            </h3>
            <p>本田 · 7年驾龄</p>
            <p class="distance">1.5公里 · 约5分钟</p>
          </div>
          <button class="contact-btn">联系司机</button>
        </div>
      </div>
      <button class="view-more-btn">查看更多司机</button>
    </div>

    <!-- 服务优势 -->
    <div class="service-advantages">
      <h2>我们的优势</h2>
      <div class="advantages-list">
        <div class="advantage-item">
          <i class="fa fa-bolt"></i>
          <h3>快速响应</h3>
          <p>平均3分钟内接单</p>
        </div>
        <div class="advantage-item">
          <i class="fa fa-shield"></i>
          <h3>安全保障</h3>
          <p>所有司机实名认证</p>
        </div>
        <div class="advantage-item">
          <i class="fa fa-money"></i>
          <h3>价格透明</h3>
          <p>无隐藏收费</p>
        </div>
        <div class="advantage-item">
          <i class="fa fa-credit-card"></i>
          <h3>多种支付</h3>
          <p>支持多种支付方式</p>
        </div>
        
        <div class="advantage-item">
          <i class="fa fa-clock-o"></i>
          <h3>方便快捷</h3>
          <p>15分钟内司机快速到达</p>
        </div>
      </div>
    </div>
  </main>

        <!-- 背景视频容器 -->
        <div class="background-container">
    <video src="./images/登录背景.mp4" class="background-video" autoplay muted loop playsinline></video>
  </div>

        <!-- 页脚 -->
        <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <h2>KLUOBO</h2>
        <p>让出行更简单</p>
      </div>
      <div class="footer-links">
        <div class="link-group">
          <h3>关于我们</h3>
          <a href="#">公司介绍</a>
          <a href="#">加入我们</a>
          <a href="#">联系方式</a>
        </div>
        <div class="link-group">
          <h3>帮助中心</h3>
          <a href="#">用户指南</a>
          <a href="#">常见问题</a>
          <a href="#">投诉建议</a>
        </div>
        <div class="link-group">
          <h3>法律信息</h3>
          <a href="#">服务条款</a>
          <a href="#">隐私政策</a>
          <a href="#">法律声明</a>
        </div>
      </div>
      <div class="footer-social">
        <a href="#"><i class="fa fa-weixin"></i></a>
        <a href="#"><i class="fa fa-weibo"></i></a>
        <a href="#"><i class="fa fa-qq"></i></a>
      </div>
    </div>
    <div class="copyright">
      <p>&copy; 2023 KLUOBO 拼车出行. 保留所有权利.</p>
    </div>
  </footer>

        <script src="../js/home.js"></script>
    </form>
</body>
</html>
