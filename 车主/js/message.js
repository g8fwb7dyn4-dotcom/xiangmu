// 车主消息页面逻辑 - 专注于接收用户消息
document.addEventListener('DOMContentLoaded', function () {
    // 检查车主登录状态
    checkDriverLoginStatus();

    // 初始化消息数据（仅用户相关消息）
    initMessageData();

    // 加载并显示消息列表（默认显示全部）
    loadMessages('all');

    // 初始化聊天功能
    initChatFunctionality();

    // 消息分类标签切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // 更新标签状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 加载对应分类的消息
            const tabType = this.dataset.tab;
            loadMessages(tabType);
        });
    });

    // 移动端菜单交互
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
    });

    // 退出登录功能
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (confirm('确定要退出登录吗？')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                checkDriverLoginStatus();
                window.location.href = '../用户/主页.html';
            }
        });
    }

    // 搜索功能
    const searchInput = document.querySelector('.message-search input');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.trim().toLowerCase();
        const tabType = document.querySelector('.tab-btn.active').dataset.tab;
        filterMessages(tabType, searchTerm);
    });
});

// 初始化聊天功能
function initChatFunctionality() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.querySelector('.chat-messages');
    const messageItems = document.querySelectorAll('.message-item');
    const messageSidebar = document.querySelector('.message-sidebar');

    // 监听输入框变化，控制发送按钮状态
    messageInput.addEventListener('input', function () {
        sendButton.disabled = this.value.trim() === '';
    });

    // 发送消息
    sendButton.addEventListener('click', function () {
        sendMessage();
    });

    // 按Enter发送消息，Shift+Enter换行
    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 移动端适配 - 聊天区域返回按钮
    if (window.innerWidth <= 768) {
        const chatHeader = document.querySelector('.chat-header');
        const backBtn = document.createElement('button');
        backBtn.className = 'mobile-back-btn';
        backBtn.innerHTML = '<i class="fa fa-arrow-left"></i>';
        backBtn.addEventListener('click', function () {
            messageSidebar.classList.add('active');
        });
        chatHeader.insertBefore(backBtn, chatHeader.firstChild);
    }

    // 点击消息项打开聊天
    document.querySelector('.messages-list').addEventListener('click', function (e) {
        const messageItem = e.target.closest('.message-item');
        if (messageItem) {
            openChat(messageItem.dataset.id);

            // 在移动端隐藏侧边栏
            if (window.innerWidth <= 768) {
                messageSidebar.classList.remove('active');
            }
        }
    });
}

// 发送消息给用户
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    const chatMessages = document.querySelector('.chat-messages');
    const activeChatId = document.querySelector('.message-item.active')?.dataset.id;

    if (!messageText || !activeChatId) return;

    // 获取当前时间
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 创建消息气泡
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble sent';
    messageBubble.innerHTML = `
        ${messageText}
        <div class="message-time">
            ${timeString} <i class="fa fa-check-circle"></i>
        </div>
    `;

    // 添加到聊天区域并滚动到底部
    chatMessages.appendChild(messageBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 清空输入框
    messageInput.value = '';
    document.getElementById('send-message').disabled = true;

    // 保存消息到本地存储
    saveMessage(activeChatId, messageText, 'sent', now.toISOString());
}

// 初始化消息数据
function initMessageData() {
    // 检查本地存储中是否已有消息数据
    if (!localStorage.getItem('driverMessages')) {
        // 初始化一些示例用户消息
        const defaultMessages = [
            {
                id: 'user1',
                name: '李乘客',
                avatar: '../用户/images/user1.jpg',
                text: '我的行程大概会晚10分钟，可以等我一下吗？',
                time: new Date(Date.now() - 30 * 60000).toISOString(), // 30分钟前
                read: false,
                type: 'user'
            },
            {
                id: 'user2',
                name: '王乘客',
                avatar: '../用户/images/user2.jpg',
                text: '请问车上可以放婴儿车吗？',
                time: new Date(Date.now() - 2 * 3600000).toISOString(), // 2小时前
                read: true,
                type: 'user'
            },
            {
                id: 'system1',
                name: '系统通知',
                avatar: '../用户/images/system.png',
                text: '您已成功接单，请注意准时到达接车点',
                time: new Date(Date.now() - 24 * 3600000).toISOString(), // 1天前
                read: true,
                type: 'system'
            }
        ];

        // 保存到本地存储
        localStorage.setItem('driverMessages', JSON.stringify(defaultMessages));
    }

    // 初始化聊天记录
    if (!localStorage.getItem('driverChatHistories')) {
        localStorage.setItem('driverChatHistories', JSON.stringify({}));
    }
}

// 加载消息列表
function loadMessages(type) {
    const messagesList = document.querySelector('.messages-list');
    const messages = JSON.parse(localStorage.getItem('driverMessages') || '[]');

    // 根据类型筛选消息
    let filteredMessages = messages;
    if (type !== 'all') {
        filteredMessages = messages.filter(msg => msg.type === type);
    }

    // 清空列表
    messagesList.innerHTML = '';

    // 如果没有消息
    if (filteredMessages.length === 0) {
        messagesList.innerHTML = '<div class="no-messages">没有相关消息</div>';
        return;
    }

    // 按时间排序（最新的在前）
    filteredMessages.sort((a, b) => new Date(b.time) - new Date(a.time));

    // 添加消息项
    filteredMessages.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.className = `message-item ${!msg.read ? 'unread' : ''}`;
        messageItem.dataset.id = msg.id;
        messageItem.dataset.type = msg.type;

        // 格式化时间显示
        const messageDate = new Date(msg.time);
        let timeText = '';
        const now = new Date();

        if (messageDate.toDateString() === now.toDateString()) {
            // 今天的消息显示时间
            timeText = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            // 其他日期显示月/日
            timeText = `${messageDate.getMonth() + 1}/${messageDate.getDate()}`;
        }

        messageItem.innerHTML = `
            <img src="${msg.avatar}" alt="${msg.name}" class="message-avatar">
            <div class="message-content">
                <div class="message-sender">
                    <span>${msg.name}</span>
                    <span class="message-time">${timeText}</span>
                </div>
                <div class="message-text">
                    ${msg.text} ${!msg.read ? '<span class="unread-indicator"></span>' : ''}
                </div>
            </div>
        `;

        messagesList.appendChild(messageItem);
    });
}

// 筛选消息
function filterMessages(tabType, searchTerm) {
    const messagesList = document.querySelector('.messages-list');
    const messages = JSON.parse(localStorage.getItem('driverMessages') || '[]');

    // 先按类型筛选，再按搜索词筛选
    let filteredMessages = messages;
    if (tabType !== 'all') {
        filteredMessages = messages.filter(msg => msg.type === tabType);
    }

    if (searchTerm) {
        filteredMessages = filteredMessages.filter(msg =>
            msg.name.toLowerCase().includes(searchTerm) ||
            msg.text.toLowerCase().includes(searchTerm)
        );
    }

    // 清空列表
    messagesList.innerHTML = '';

    // 如果没有匹配的消息
    if (filteredMessages.length === 0) {
        messagesList.innerHTML = '<div class="no-messages">没有找到匹配的消息</div>';
        return;
    }

    // 按时间排序
    filteredMessages.sort((a, b) => new Date(b.time) - new Date(a.time));

    // 添加消息项
    filteredMessages.forEach(msg => {
        // 与loadMessages函数中相同的消息项生成逻辑
        const messageItem = document.createElement('div');
        messageItem.className = `message-item ${!msg.read ? 'unread' : ''}`;
        messageItem.dataset.id = msg.id;
        messageItem.dataset.type = msg.type;

        const messageDate = new Date(msg.time);
        let timeText = '';
        const now = new Date();

        if (messageDate.toDateString() === now.toDateString()) {
            timeText = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            timeText = `${messageDate.getMonth() + 1}/${messageDate.getDate()}`;
        }

        messageItem.innerHTML = `
            <img src="${msg.avatar}" alt="${msg.name}" class="message-avatar">
            <div class="message-content">
                <div class="message-sender">
                    <span>${msg.name}</span>
                    <span class="message-time">${timeText}</span>
                </div>
                <div class="message-text">
                    ${msg.text} ${!msg.read ? '<span class="unread-indicator"></span>' : ''}
                </div>
            </div>
        `;

        messagesList.appendChild(messageItem);
    });
}

// 打开聊天窗口
function openChat(chatId) {
    const messages = JSON.parse(localStorage.getItem('driverMessages') || '[]');
    const chat = messages.find(msg => msg.id === chatId);
    const chatHistories = JSON.parse(localStorage.getItem('driverChatHistories') || '{}');

    if (!chat) return;

    // 更新聊天头部信息
    document.querySelector('.partner-avatar').src = chat.avatar;
    document.querySelector('.partner-name').textContent = chat.name;
    document.querySelector('.online-status').textContent = '在线';

    // 清空聊天区域
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';

    // 如果有聊天历史，加载历史消息
    if (chatHistories[chatId] && chatHistories[chatId].length > 0) {
        chatHistories[chatId].forEach(msg => {
            const messageBubble = document.createElement('div');
            messageBubble.className = `message-bubble ${msg.type}`;

            const messageDate = new Date(msg.time);
            const timeText = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            messageBubble.innerHTML = `
                ${msg.text}
                <div class="message-time">
                    ${timeText} ${msg.type === 'sent' ? '<i class="fa fa-check-circle"></i>' : ''}
                </div>
            `;

            chatMessages.appendChild(messageBubble);
        });
    } else {
        // 没有历史消息，显示第一条消息
        const messageDate = new Date(chat.time);
        const timeText = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble received';
        messageBubble.innerHTML = `
            ${chat.text}
            <div class="message-time">${timeText}</div>
        `;

        chatMessages.appendChild(messageBubble);
    }

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 更新消息状态为已读
    if (!chat.read) {
        markAsRead(chatId);
    }

    // 设置当前激活的聊天
    setActiveChat(chatId);
}

// 标记消息为已读
function markAsRead(chatId) {
    const messages = JSON.parse(localStorage.getItem('driverMessages') || '[]');
    const updatedMessages = messages.map(msg => {
        if (msg.id === chatId) {
            return { ...msg, read: true };
        }
        return msg;
    });

    localStorage.setItem('driverMessages', JSON.stringify(updatedMessages));

    // 刷新当前标签页
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    loadMessages(activeTab);
}

// 设置当前激活的聊天
function setActiveChat(chatId) {
    // 移除所有激活状态
    document.querySelectorAll('.message-item').forEach(item => {
        item.classList.remove('active');
    });

    // 设置当前激活状态
    const activeItem = document.querySelector(`.message-item[data-id="${chatId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// 保存消息到本地存储
function saveMessage(chatId, text, type, time) {
    // 获取或初始化聊天记录
    let chatHistories = JSON.parse(localStorage.getItem('driverChatHistories') || '{}');

    // 如果没有该聊天的记录，创建一个
    if (!chatHistories[chatId]) {
        chatHistories[chatId] = [];
    }

    // 添加新消息
    chatHistories[chatId].push({
        id: 'MSG-' + Date.now(),
        text: text,
        type: type, // 'sent' 或 'received'
        time: time,
        read: type === 'sent' // 自己发送的消息默认已读
    });

    // 保存回本地存储
    localStorage.setItem('driverChatHistories', JSON.stringify(chatHistories));

    // 更新消息列表中的最后一条消息
    updateLastMessage(chatId, text, time, type === 'sent');
}

// 更新消息列表中的最后一条消息
function updateLastMessage(chatId, text, time, read = false) {
    const messages = JSON.parse(localStorage.getItem('driverMessages') || '[]');
    const updatedMessages = messages.map(msg => {
        if (msg.id === chatId) {
            return {
                ...msg,
                text: text,
                time: time,
                read: read
            };
        }
        return msg;
    });

    localStorage.setItem('driverMessages', JSON.stringify(updatedMessages));

    // 刷新当前激活的标签页
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    loadMessages(activeTab);

    // 保持选中状态
    setActiveChat(chatId);
}

// 检查车主登录状态
function checkDriverLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');

    if (isLoggedIn) {
        // 已登录，显示用户名
        const username = localStorage.getItem('username') || '车主';
        if (loginBtn) loginBtn.textContent = username;
        if (mobileLoginBtn) mobileLoginBtn.textContent = username;

        // 登录按钮点击事件（已登录状态）
        if (loginBtn) {
            loginBtn.addEventListener('click', function () {
                window.location.href = '我的信息.html';
            });
        }

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                window.location.href = '我的信息.html';
            });
        }
    } else {
        // 未登录，显示登录按钮
        if (loginBtn) loginBtn.textContent = '登录';
        if (mobileLoginBtn) mobileLoginBtn.textContent = '登录';

        // 登录按钮点击事件（未登录状态）
        if (loginBtn) {
            loginBtn.addEventListener('click', function () {
                window.location.href = '../用户/login.html';
            });
        }

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                window.location.href = '../用户/login.html';
            });
        }
    }
}