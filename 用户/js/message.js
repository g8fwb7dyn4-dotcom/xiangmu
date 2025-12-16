// 消息页面逻辑
document.addEventListener('DOMContentLoaded', function () {
    // 检查用户登录状态
    checkUserLoginStatus();

    // 初始化消息数据
    initMessageData();

    // 加载并显示消息列表
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
                checkUserLoginStatus();
                window.location.href = '主页.html';
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
}

// 发送消息
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

    // 模拟对方回复
    simulateReply(activeChatId);
}

// 模拟对方回复
function simulateReply(chatId) {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const chat = messages.find(msg => msg.id === chatId);
    if (!chat) return;

    // 预设一些回复内容
    const replies = [
        "好的，我知道了",
        "没问题，马上处理",
        "我稍后回复你",
        "请稍等片刻",
        "已收到你的消息"
    ];

    // 随机选择一个回复并延迟发送
    setTimeout(() => {
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const chatMessages = document.querySelector('.chat-messages');

        // 创建回复消息气泡
        const replyBubble = document.createElement('div');
        replyBubble.className = 'message-bubble received';
        replyBubble.innerHTML = `
            ${randomReply}
            <div class="message-time">${timeString}</div>
        `;

        // 添加到聊天区域并滚动到底部
        chatMessages.appendChild(replyBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 保存回复消息到本地存储
        saveMessage(chatId, randomReply, 'received', now.toISOString());

        // 更新消息列表中的最后一条消息
        updateLastMessage(chatId, randomReply, now.toISOString(), false);

    }, 1000 + Math.random() * 2000); // 1-3秒的随机延迟
}

// 保存消息到本地存储
function saveMessage(chatId, text, type, time) {
    // 获取或初始化聊天记录
    let chatHistories = JSON.parse(localStorage.getItem('chatHistories') || '{}');

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
    localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
}

// 更新消息列表中的最后一条消息
function updateLastMessage(chatId, text, time, read = false) {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
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

    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // 刷新当前激活的标签页
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    loadMessages(activeTab);

    // 如果该聊天正在被查看，保持选中状态
    setActiveChat(chatId);
}

// 检查用户登录状态
function checkUserLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const registerBtn = document.getElementById('register-btn');
    const mobileRegisterBtn = document.getElementById('mobile-register-btn');

    if (isLoggedIn) {
        // 已登录，显示用户名
        const username = localStorage.getItem('username') || '用户';
        loginBtn.textContent = username;
        if (mobileLoginBtn) mobileLoginBtn.textContent = username;

        // 隐藏注册按钮
        if (registerBtn) registerBtn.style.display = 'none';
        if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'none';

        // 登录按钮点击事件（已登录状态）
        loginBtn.addEventListener('click', function () {
            window.location.href = '我的.html';
        });

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                window.location.href = '我的.html';
            });
        }
    } else {
        // 未登录，显示登录按钮
        loginBtn.textContent = '登录';
        if (mobileLoginBtn) mobileLoginBtn.textContent = '登录';

        // 显示注册按钮
        if (registerBtn) registerBtn.style.display = 'inline-block';
        if (mobileRegisterBtn) mobileRegisterBtn.style.display = 'inline-block';

        // 登录按钮点击事件（未登录状态）
        loginBtn.addEventListener('click', function () {
            window.location.href = '登录注册界面.html';
        });

        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', function () {
                window.location.href = '登录注册界面.html';
            });
        }

        // 注册按钮点击事件
        if (registerBtn) {
            registerBtn.addEventListener('click', function () {
                window.location.href = '登录注册界面.html#register-form';
            });
        }

        if (mobileRegisterBtn) {
            mobileRegisterBtn.addEventListener('click', function () {
                window.location.href = '登录注册界面.html#register-form';
            });
        }
    }
}

// 初始化消息数据
function initMessageData() {
    // 如果没有消息数据，创建一些示例数据
    if (!localStorage.getItem('messages')) {
        const messages = [
            {
                id: 'MSG' + Date.now(),
                sender: '系统通知',
                avatar: './images/system-avatar.png',
                text: '您有一张5元优惠券即将过期，请尽快使用！',
                time: new Date().toISOString(),
                type: 'system',
                read: false
            },
            {
                id: 'MSG' + (Date.now() - 3600000), // 1小时前
                sender: '李师傅',
                avatar: './images/司机头像.png',
                text: '我已经到达上车点，请尽快过来',
                time: new Date(Date.now() - 3600000).toISOString(),
                type: 'driver',
                read: false
            },
            {
                id: 'MSG' + (Date.now() - 86400000), // 昨天
                sender: '订单通知',
                avatar: './images/order-avatar.png',
                text: '您的订单TP12345678已完成，感谢使用KLUOBO出行',
                time: new Date(Date.now() - 86400000).toISOString(),
                type: 'order',
                read: true
            },
            {
                id: 'MSG' + (Date.now() - 2 * 86400000), // 前天
                sender: '系统通知',
                avatar: './images/system-avatar.png',
                text: '新用户专享活动开始了，邀请好友可获得10元优惠券',
                time: new Date(Date.now() - 2 * 86400000).toISOString(),
                type: 'system',
                read: true
            },
            {
                id: 'MSG' + (Date.now() - 3 * 86400000), // 3天前
                sender: '张师傅',
                avatar: './images/司机头像.png',
                text: '我可能会迟到5分钟，请您稍等',
                time: new Date(Date.now() - 3 * 86400000).toISOString(),
                type: 'driver',
                read: true
            }
        ];
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}

// 加载并显示消息
function loadMessages(filterType) {
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const container = document.querySelector('.messages-list');

    // 清空容器
    container.innerHTML = '';

    // 根据类型筛选消息
    let filteredMessages = allMessages;
    if (filterType !== 'all') {
        filteredMessages = allMessages.filter(msg => msg.type === filterType);
    }

    // 按时间排序（最新的在前）
    filteredMessages.sort((a, b) => new Date(b.time) - new Date(a.time));

    // 渲染消息
    if (filteredMessages.length === 0) {
        container.innerHTML = '<p class="no-messages">暂无相关消息</p>';
        return;
    }

    filteredMessages.forEach(message => {
        const messageItem = createMessageItem(message);
        container.appendChild(messageItem);
    });

    // 绑定消息项点击事件
    bindMessageItemClicks();
}

// 过滤消息
function filterMessages(filterType, searchTerm) {
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const container = document.querySelector('.messages-list');

    // 清空容器
    container.innerHTML = '';

    // 根据类型和搜索词筛选消息
    let filteredMessages = allMessages;
    if (filterType !== 'all') {
        filteredMessages = filteredMessages.filter(msg => msg.type === filterType);
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredMessages = filteredMessages.filter(msg =>
            msg.sender.toLowerCase().includes(term) ||
            msg.text.toLowerCase().includes(term)
        );
    }

    // 按时间排序（最新的在前）
    filteredMessages.sort((a, b) => new Date(b.time) - new Date(a.time));

    // 渲染消息
    if (filteredMessages.length === 0) {
        container.innerHTML = '<p class="no-messages">没有找到匹配的消息</p>';
        return;
    }

    filteredMessages.forEach(message => {
        const messageItem = createMessageItem(message);
        container.appendChild(messageItem);
    });

    // 绑定消息项点击事件
    bindMessageItemClicks();
}

// 创建消息项
function createMessageItem(message) {
    const item = document.createElement('div');
    item.className = `message-item ${message.read ? '' : 'unread'}`;
    item.dataset.id = message.id;
    item.dataset.sender = message.sender;
    item.dataset.avatar = message.avatar;

    // 格式化时间
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 60) {
            return `${diffMins}分钟前`;
        } else if (diffHours < 24) {
            return `${diffHours}小时前`;
        } else if (diffDays < 7) {
            return `${diffDays}天前`;
        } else {
            return `${date.getMonth() + 1}月${date.getDate()}日`;
        }
    };

    item.innerHTML = `
        <img src="${message.avatar}" alt="${message.sender}" class="message-avatar">
        <div class="message-content">
            <div class="message-sender">
                <span>${message.sender}${!message.read ? '<span class="unread-indicator"></span>' : ''}</span>
                <span class="message-time">${formatTime(message.time)}</span>
            </div>
            <div class="message-text">${message.text}</div>
        </div>
    `;

    return item;
}

// 绑定消息项点击事件
function bindMessageItemClicks() {
    const messageItems = document.querySelectorAll('.message-item');
    messageItems.forEach(item => {
        item.addEventListener('click', function () {
            const messageId = this.dataset.id;
            const sender = this.dataset.sender;
            const avatar = this.dataset.avatar;

            // 打开聊天界面
            openChat(messageId, sender, avatar);

            // 如果是未读消息，标记为已读
            if (!this.classList.contains('read')) {
                markAsRead(messageId);
                this.classList.remove('unread');
                this.querySelector('.unread-indicator')?.remove();
            }

            // 在移动端隐藏消息列表
            if (window.innerWidth <= 768) {
                document.querySelector('.message-sidebar').classList.remove('active');
            }
        });
    });
}

// 打开聊天界面
function openChat(chatId, sender, avatar) {
    // 更新聊天头部信息
    document.querySelector('.partner-name').textContent = sender;
    document.querySelector('.partner-avatar').src = avatar;
    document.querySelector('.partner-avatar').alt = sender;

    // 清空聊天区域
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';

    // 隐藏空聊天提示
    document.querySelector('.empty-chat')?.remove();

    // 加载聊天历史
    loadChatHistory(chatId);

    // 设置当前激活的聊天
    setActiveChat(chatId);
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

// 加载聊天历史
function loadChatHistory(chatId) {
    const chatHistories = JSON.parse(localStorage.getItem('chatHistories') || '{}');
    const messages = chatHistories[chatId] || [];
    const chatMessages = document.querySelector('.chat-messages');

    // 如果没有历史消息，使用初始消息
    if (messages.length === 0) {
        const initialMessages = JSON.parse(localStorage.getItem('messages') || '[]');
        const initialMessage = initialMessages.find(msg => msg.id === chatId);

        if (initialMessage) {
            const messageBubble = document.createElement('div');
            messageBubble.className = 'message-bubble received';
            messageBubble.innerHTML = `
                ${initialMessage.text}
                <div class="message-time">${formatChatTime(initialMessage.time)}</div>
            `;
            chatMessages.appendChild(messageBubble);
        }
    } else {
        // 加载历史消息
        messages.forEach(msg => {
            const messageBubble = document.createElement('div');
            messageBubble.className = `message-bubble ${msg.type === 'sent' ? 'sent' : 'received'}`;

            let readIndicator = '';
            if (msg.type === 'sent' && msg.read) {
                readIndicator = ' <i class="fa fa-check-circle"></i>';
            } else if (msg.type === 'sent') {
                readIndicator = ' <i class="fa fa-check"></i>';
            }

            messageBubble.innerHTML = `
                ${msg.text}
                <div class="message-time">
                    ${formatChatTime(msg.time)}${readIndicator}
                </div>
            `;
            chatMessages.appendChild(messageBubble);
        });
    }

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 格式化聊天时间
function formatChatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// 标记消息为已读
function markAsRead(messageId) {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const updatedMessages = messages.map(msg => {
        if (msg.id === messageId) {
            return { ...msg, read: true };
        }
        return msg;
    });
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // 更新聊天历史中的已读状态
    const chatHistories = JSON.parse(localStorage.getItem('chatHistories') || '{}');
    if (chatHistories[messageId]) {
        chatHistories[messageId] = chatHistories[messageId].map(msg => {
            if (msg.type === 'received') {
                return { ...msg, read: true };
            }
            return msg;
        });
        localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
    }
}