// 司机数据 - 模拟后台数据
const driversData = [
    {
        id: 1,
        name: "张师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13800138001",
        email: "zhang@example.com",
        registerDate: "2022-03-15",
        totalOrders: 1280,
        rating: 4.9,
        status: "online",
        car: {
            model: "大众 · 朗逸 2020款",
            licensePlate: "粤A12345",
            color: "黑色"
        },
        completionRate: "98%",
        totalEarnings: 125800
    },
    {
        id: 2,
        name: "李师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13900139002",
        email: "li@example.com",
        registerDate: "2022-05-20",
        totalOrders: 950,
        rating: 4.7,
        status: "online",
        car: {
            model: "丰田 · 卡罗拉 2019款",
            licensePlate: "粤B67890",
            color: "白色"
        },
        completionRate: "96%",
        totalEarnings: 98500
    },
    {
        id: 3,
        name: "王师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13700137003",
        email: "wang@example.com",
        registerDate: "2022-07-05",
        totalOrders: 720,
        rating: 4.8,
        status: "offline",
        car: {
            model: "本田 · 思域 2021款",
            licensePlate: "粤C13579",
            color: "红色"
        },
        completionRate: "97%",
        totalEarnings: 75200
    },
    {
        id: 4,
        name: "赵师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13600136004",
        email: "zhao@example.com",
        registerDate: "2022-09-18",
        totalOrders: 580,
        rating: 4.6,
        status: "online",
        car: {
            model: "别克 · 英朗 2020款",
            licensePlate: "粤D24680",
            color: "银色"
        },
        completionRate: "95%",
        totalEarnings: 62300
    },
    {
        id: 5,
        name: "刘师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13500135005",
        email: "liu@example.com",
        registerDate: "2022-11-30",
        totalOrders: 420,
        rating: 4.5,
        status: "suspended",
        car: {
            model: "日产 · 轩逸 2021款",
            licensePlate: "粤E97531",
            color: "黑色"
        },
        completionRate: "94%",
        totalEarnings: 45600
    },
    {
        id: 6,
        name: "陈师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13400134006",
        email: "chen@example.com",
        registerDate: "2023-01-12",
        totalOrders: 350,
        rating: 4.9,
        status: "online",
        car: {
            model: "马自达 · 3 昂克赛拉 2020款",
            licensePlate: "粤F86420",
            color: "蓝色"
        },
        completionRate: "99%",
        totalEarnings: 38900
    },
    {
        id: 7,
        name: "杨师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13300133007",
        email: "yang@example.com",
        registerDate: "2023-03-25",
        totalOrders: 280,
        rating: 4.7,
        status: "offline",
        car: {
            model: "雪佛兰 · 科鲁兹 2019款",
            licensePlate: "粤G75315",
            color: "白色"
        },
        completionRate: "96%",
        totalEarnings: 31200
    },
    {
        id: 8,
        name: "黄师傅",
        avatar: "../用户/images/司机头像.png",
        phone: "13200132008",
        email: "huang@example.com",
        registerDate: "2023-05-10",
        totalOrders: 150,
        rating: 4.8,
        status: "online",
        car: {
            model: "现代 · 领动 2020款",
            licensePlate: "粤H95126",
            color: "灰色"
        },
        completionRate: "97%",
        totalEarnings: 18500
    }
];

// 全局状态变量
let currentPage = 1;
const driversPerPage = 5;
let filteredDrivers = [...driversData];

// DOM元素缓存
const DOM = {
    driversTableBody: document.getElementById('drivers-table-body'),
    paginationContainer: document.getElementById('pagination'),
    searchInput: document.getElementById('search-input'),
    statusFilter: document.getElementById('status-filter'),
    sortFilter: document.getElementById('sort-filter'),
    addDriverBtn: document.getElementById('add-driver-btn'),
    driverModal: document.getElementById('driver-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalFooter: document.getElementById('modal-footer'),
    closeModal: document.getElementById('close-modal')
};

/**
 * 初始化页面
 */
function initDriverManagement() {
    // 初始化导航高亮
    initAdminNav();

    // 渲染司机列表
    renderDrivers();

    // 绑定所有事件
    bindAllEvents();
}

/**
 * 渲染司机列表
 */
function renderDrivers() {
    // 计算分页参数
    const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
    const startIndex = (currentPage - 1) * driversPerPage;
    const endIndex = Math.min(startIndex + driversPerPage, filteredDrivers.length);
    const currentDrivers = filteredDrivers.slice(startIndex, endIndex);

    // 清空表格
    DOM.driversTableBody.innerHTML = '';

    // 渲染空状态
    if (currentDrivers.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
      <td colspan="8" style="text-align: center; padding: 2rem; color: #616E7C;">
        <i class="fa fa-search-minus" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        没有找到匹配的司机数据
      </td>
    `;
        DOM.driversTableBody.appendChild(emptyRow);
    } else {
        // 渲染司机数据行
        currentDrivers.forEach(driver => {
            const row = createDriverRow(driver);
            DOM.driversTableBody.appendChild(row);
        });
    }

    // 渲染分页控件
    renderPagination(totalPages);
}

/**
 * 创建司机表格行
 * @param {Object} driver - 司机数据对象
 * @returns {HTMLElement} tr元素
 */
function createDriverRow(driver) {
    const row = document.createElement('tr');
    row.dataset.driverId = driver.id;

    // 状态文本映射
    const statusTextMap = {
        'online': '在线',
        'offline': '离线',
        'suspended': '已暂停'
    };

    row.innerHTML = `
    <td>
      <div class="driver-info">
        <img src="${driver.avatar}" alt="${driver.name}" class="driver-avatar" loading="lazy">
        <span>${escapeHtml(driver.name)}</span>
      </div>
    </td>
    <td>
      ${escapeHtml(driver.car.model)}<br>
      ${escapeHtml(driver.car.licensePlate)} (${escapeHtml(driver.car.color)})
    </td>
    <td class="hidden-mobile">${escapeHtml(driver.phone)}</td>
    <td>${driver.registerDate}</td>
    <td class="hidden-mobile">${driver.totalOrders}</td>
    <td>
      <span class="rating">${driver.rating} <i class="fa fa-star"></i></span>
    </td>
    <td>
      <span class="status-badge status-${driver.status}">
        ${statusTextMap[driver.status]}
      </span>
    </td>
    <td>
      <button class="action-btn view-btn" data-action="view" data-id="${driver.id}">
        <i class="fa fa-eye"></i> 查看
      </button>
      <button class="action-btn edit-btn" data-action="edit" data-id="${driver.id}">
        <i class="fa fa-edit"></i> 编辑
      </button>
      <button class="action-btn delete-btn" data-action="delete" data-id="${driver.id}">
        <i class="fa fa-trash"></i> 删除
      </button>
    </td>
  `;

    return row;
}

/**
 * 渲染分页控件
 * @param {number} totalPages - 总页数
 */
function renderPagination(totalPages) {
    DOM.paginationContainer.innerHTML = '';

    // 上一页按钮
    const prevBtn = createPageButton('prev', '<i class="fa fa-chevron-left"></i>', currentPage > 1);
    DOM.paginationContainer.appendChild(prevBtn);

    // 页码按钮
    const pageRange = getPageRange(currentPage, totalPages);
    pageRange.forEach(page => {
        const pageBtn = createPageButton('page', page, true, page === currentPage);
        DOM.paginationContainer.appendChild(pageBtn);
    });

    // 下一页按钮
    const nextBtn = createPageButton('next', '<i class="fa fa-chevron-right"></i>', currentPage < totalPages);
    DOM.paginationContainer.appendChild(nextBtn);
}

/**
 * 创建分页按钮
 * @param {string} type - 按钮类型 (prev, page, next)
 * @param {string} content - 按钮内容
 * @param {boolean} enabled - 是否可用
 * @param {boolean} isActive - 是否当前页
 * @returns {HTMLElement} 按钮元素
 */
function createPageButton(type, content, enabled = true, isActive = false) {
    const btn = document.createElement('button');
    btn.className = `page-btn ${isActive ? 'active' : ''} ${!enabled ? 'disabled' : ''}`;
    btn.innerHTML = content;
    btn.disabled = !enabled;

    if (type === 'page') {
        btn.dataset.page = content;
        btn.addEventListener('click', () => {
            currentPage = parseInt(content);
            renderDrivers();
        });
    } else if (type === 'prev') {
        btn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderDrivers();
            }
        });
    } else if (type === 'next') {
        btn.addEventListener('click', () => {
            if (currentPage < parseInt(DOM.paginationContainer.dataset.totalPages)) {
                currentPage++;
                renderDrivers();
            }
        });
    }

    DOM.paginationContainer.dataset.totalPages = totalPages;
    return btn;
}

/**
 * 获取分页显示范围
 * @param {number} currentPage - 当前页
 * @param {number} totalPages - 总页数
 * @returns {number[]} 页码数组
 */
function getPageRange(currentPage, totalPages) {
    const range = [];
    const visiblePages = 5;

    if (totalPages <= visiblePages) {
        // 总页数小于等于可见页数，显示所有页码
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
    } else {
        // 总页数大于可见页数，显示当前页附近的页码
        let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let endPage = startPage + visiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - visiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }
    }

    return range;
}

/**
 * 绑定所有事件
 */
function bindAllEvents() {
    // 搜索事件
    DOM.searchInput.addEventListener('input', debounce(handleSearch, 300));

    // 状态筛选事件
    DOM.statusFilter.addEventListener('change', handleFilter);

    // 排序事件
    DOM.sortFilter.addEventListener('change', handleSort);

    // 添加司机按钮事件
    DOM.addDriverBtn.addEventListener('click', showAddDriverModal);

    // 关闭模态框事件
    DOM.closeModal.addEventListener('click', hideModal);

    // 点击模态框外部关闭
    DOM.driverModal.addEventListener('click', (e) => {
        if (e.target === DOM.driverModal) {
            hideModal();
        }
    });

    // 表格操作按钮事件（事件委托）
    DOM.driversTableBody.addEventListener('click', handleTableAction);

    // 阻止模态框内容区域的点击冒泡
    DOM.modalBody.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

/**
 * 处理表格操作按钮点击
 * @param {Event} e - 点击事件
 */
function handleTableAction(e) {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const driverId = parseInt(actionBtn.dataset.id);

    switch (action) {
        case 'view':
            showDriverDetail(driverId);
            break;
        case 'edit':
            showEditDriverModal(driverId);
            break;
        case 'delete':
            confirmDeleteDriver(driverId);
            break;
    }
}

/**
 * 处理搜索
 */
function handleSearch() {
    const searchTerm = DOM.searchInput.value.trim().toLowerCase();

    // 过滤司机数据
    filteredDrivers = driversData.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm) ||
        driver.phone.includes(searchTerm) ||
        driver.car.licensePlate.toLowerCase().includes(searchTerm) ||
        driver.car.model.toLowerCase().includes(searchTerm)
    );

    // 重置页码
    currentPage = 1;
    // 重新渲染
    renderDrivers();
}

/**
 * 处理筛选
 */
function handleFilter() {
    const status = DOM.statusFilter.value;

    // 根据状态筛选
    if (status === 'all') {
        filteredDrivers = [...driversData];
    } else {
        filteredDrivers = driversData.filter(driver => driver.status === status);
    }

    // 如果有搜索内容，应用搜索过滤
    const searchTerm = DOM.searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        filteredDrivers = filteredDrivers.filter(driver =>
            driver.name.toLowerCase().includes(searchTerm) ||
            driver.phone.includes(searchTerm) ||
            driver.car.licensePlate.toLowerCase().includes(searchTerm) ||
            driver.car.model.toLowerCase().includes(searchTerm)
        );
    }

    // 应用排序
    handleSort(true);

    // 重置页码
    currentPage = 1;
    // 重新渲染
    renderDrivers();
}

/**
 * 处理排序
 * @param {boolean} skipRender - 是否跳过重新渲染（用于内部调用）
 */
function handleSort(skipRender = false) {
    const sortType = DOM.sortFilter.value;

    // 根据选择的排序方式排序
    switch (sortType) {
        case 'rating':
            filteredDrivers.sort((a, b) => b.rating - a.rating);
            break;
        case 'orders':
            filteredDrivers.sort((a, b) => b.totalOrders - a.totalOrders);
            break;
        case 'register':
            filteredDrivers.sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate));
            break;
    }

    if (!skipRender) {
        // 重置页码
        currentPage = 1;
        // 重新渲染
        renderDrivers();
    }
}

/**
 * 显示司机详情
 * @param {number} driverId - 司机ID
 */
function showDriverDetail(driverId) {
    const driver = driversData.find(d => d.id === driverId);
    if (!driver) return;

    // 状态文本映射
    const statusTextMap = {
        'online': '在线',
        'offline': '离线',
        'suspended': '已暂停'
    };

    DOM.modalTitle.textContent = '司机详情';
    DOM.modalBody.innerHTML = `
    <div class="driver-detail">
      <div>
        <div class="detail-item">
          <span class="detail-label">姓名</span>
          <span class="detail-value">${escapeHtml(driver.name)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">联系电话</span>
          <span class="detail-value">${escapeHtml(driver.phone)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">邮箱</span>
          <span class="detail-value">${escapeHtml(driver.email)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">注册日期</span>
          <span class="detail-value">${driver.registerDate}</span>
        </div>
      </div>
      <div>
        <div class="detail-item">
          <span class="detail-label">总订单数</span>
          <span class="detail-value">${driver.totalOrders}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">评分</span>
          <span class="detail-value">${driver.rating} <i class="fa fa-star"></i></span>
        </div>
        <div class="detail-item">
          <span class="detail-label">完成率</span>
          <span class="detail-value">${driver.completionRate}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">状态</span>
          <span class="detail-value">
            <span class="status-badge status-${driver.status}">
              ${statusTextMap[driver.status]}
            </span>
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">总收入</span>
          <span class="detail-value">¥${driver.totalEarnings.toLocaleString()}</span>
        </div>
      </div>
      
      <div class="vehicle-info">
        <h4>车辆信息</h4>
        <div class="detail-item">
          <span class="detail-label">车型</span>
          <span class="detail-value">${escapeHtml(driver.car.model)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">车牌号</span>
          <span class="detail-value">${escapeHtml(driver.car.licensePlate)}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">颜色</span>
          <span class="detail-value">${escapeHtml(driver.car.color)}</span>
        </div>
      </div>
    </div>
  `;

    DOM.modalFooter.innerHTML = `
    <button class="btn btn-secondary close-modal-btn">关闭</button>
  `;

    // 绑定关闭按钮事件
    DOM.modalFooter.querySelector('.close-modal-btn').addEventListener('click', hideModal);

    // 显示模态框
    DOM.driverModal.classList.add('active');
}

/**
 * 显示添加司机模态框
 */
function showAddDriverModal() {
    DOM.modalTitle.textContent = '添加新司机';
    DOM.modalBody.innerHTML = `
    <form id="add-driver-form">
      <div class="form-group">
        <label for="driver-name">姓名</label>
        <input type="text" id="driver-name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="driver-phone">联系电话</label>
        <input type="tel" id="driver-phone" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="driver-email">邮箱</label>
        <input type="email" id="driver-email" class="form-control">
      </div>
      <div class="form-group">
        <label for="driver-status">状态</label>
        <select id="driver-status" class="form-control">
          <option value="online">在线</option>
          <option value="offline">离线</option>
        </select>
      </div>
      
      <h4 style="margin-top: 20px;">车辆信息</h4>
      
      <div class="form-group">
        <label for="car-model">车型</label>
        <input type="text" id="car-model" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="license-plate">车牌号</label>
        <input type="text" id="license-plate" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="car-color">颜色</label>
        <input type="text" id="car-color" class="form-control" required>
      </div>
    </form>
  `;

    DOM.modalFooter.innerHTML = `
    <button class="btn btn-secondary close-modal-btn">取消</button>
    <button class="btn btn-primary save-driver-btn">保存</button>
  `;

    // 绑定按钮事件
    DOM.modalFooter.querySelector('.close-modal-btn').addEventListener('click', hideModal);
    DOM.modalFooter.querySelector('.save-driver-btn').addEventListener('click', saveNewDriver);

    // 显示模态框
    DOM.driverModal.classList.add('active');
}

/**
 * 保存新司机
 */
function saveNewDriver() {
    // 获取表单数据
    const name = document.getElementById('driver-name').value.trim();
    const phone = document.getElementById('driver-phone').value.trim();
    const email = document.getElementById('driver-email').value.trim();
    const status = document.getElementById('driver-status').value;
    const carModel = document.getElementById('car-model').value.trim();
    const licensePlate = document.getElementById('license-plate').value.trim();
    const carColor = document.getElementById('car-color').value.trim();

    // 简单验证
    if (!name || !phone || !carModel || !licensePlate || !carColor) {
        alert('请填写必填字段');
        return;
    }

    // 创建新司机对象
    const newDriver = {
        id: driversData.length + 1,
        name,
        avatar: "../用户/images/司机头像.png",
        phone,
        email: email || `${name.toLowerCase()}@example.com`,
        registerDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        rating: 5.0,
        status,
        car: {
            model: carModel,
            licensePlate,
            color: carColor
        },
        completionRate: "0%",
        totalEarnings: 0
    };

    // 添加到数据中
    driversData.push(newDriver);
    filteredDrivers = [...driversData];

    // 隐藏模态框
    hideModal();

    // 重新渲染
    renderDrivers();

    // 显示成功消息
    alert('司机添加成功');
}

/**
 * 显示编辑司机模态框
 * @param {number} driverId - 司机ID
 */
function showEditDriverModal(driverId) {
    const driver = driversData.find(d => d.id === driverId);
    if (!driver) return;

    DOM.modalTitle.textContent = '编辑司机信息';
    DOM.modalBody.innerHTML = `
    <form id="edit-driver-form">
      <input type="hidden" id="edit-driver-id" value="${driver.id}">
      <div class="form-group">
        <label for="edit-driver-name">姓名</label>
        <input type="text" id="edit-driver-name" class="form-control" value="${escapeHtml(driver.name)}" required>
      </div>
      <div class="form-group">
        <label for="edit-driver-phone">联系电话</label>
        <input type="tel" id="edit-driver-phone" class="form-control" value="${escapeHtml(driver.phone)}" required>
      </div>
      <div class="form-group">
        <label for="edit-driver-email">邮箱</label>
        <input type="email" id="edit-driver-email" class="form-control" value="${escapeHtml(driver.email)}">
      </div>
      <div class="form-group">
        <label for="edit-driver-status">状态</label>
        <select id="edit-driver-status" class="form-control">
          <option value="online" ${driver.status === 'online' ? 'selected' : ''}>在线</option>
          <option value="offline" ${driver.status === 'offline' ? 'selected' : ''}>离线</option>
          <option value="suspended" ${driver.status === 'suspended' ? 'selected' : ''}>已暂停</option>
        </select>
      </div>
      
      <h4 style="margin-top: 20px;">车辆信息</h4>
      
      <div class="form-group">
        <label for="edit-car-model">车型</label>
        <input type="text" id="edit-car-model" class="form-control" value="${escapeHtml(driver.car.model)}" required>
      </div>
      <div class="form-group">
        <label for="edit-license-plate">车牌号</label>
        <input type="text" id="edit-license-plate" class="form-control" value="${escapeHtml(driver.car.licensePlate)}" required>
      </div>
      <div class="form-group">
        <label for="edit-car-color">颜色</label>
        <input type="text" id="edit-car-color" class="form-control" value="${escapeHtml(driver.car.color)}" required>
      </div>
    </form>
  `;

    DOM.modalFooter.innerHTML = `
    <button class="btn btn-secondary close-modal-btn">取消</button>
    <button class="btn btn-primary update-driver-btn">更新</button>
  `;

    // 绑定按钮事件
    DOM.modalFooter.querySelector('.close-modal-btn').addEventListener('click', hideModal);
    DOM.modalFooter.querySelector('.update-driver-btn').addEventListener('click', updateDriver);

    // 显示模态框
    DOM.driverModal.classList.add('active');
}

/**
 * 更新司机信息
 */
function updateDriver() {
    const driverId = parseInt(document.getElementById('edit-driver-id').value);
    const driverIndex = driversData.findIndex(d => d.id === driverId);
    if (driverIndex === -1) return;

    // 获取表单数据
    const name = document.getElementById('edit-driver-name').value.trim();
    const phone = document.getElementById('edit-driver-phone').value.trim();
    const email = document.getElementById('edit-driver-email').value.trim();
    const status = document.getElementById('edit-driver-status').value;
    const carModel = document.getElementById('edit-car-model').value.trim();
    const licensePlate = document.getElementById('edit-license-plate').value.trim();
    const carColor = document.getElementById('edit-car-color').value.trim();

    // 简单验证
    if (!name || !phone || !carModel || !licensePlate || !carColor) {
        alert('请填写必填字段');
        return;
    }

    // 更新司机信息（保留不变的字段）
    driversData[driverIndex] = {
        ...driversData[driverIndex],
        name,
        phone,
        email,
        status,
        car: {
            model: carModel,
            licensePlate,
            color: carColor
        }
    };

    filteredDrivers = [...driversData];

    // 隐藏模态框
    hideModal();

    // 重新渲染
    renderDrivers();

    // 显示成功消息
    alert('司机信息更新成功');
}

/**
 * 确认删除司机
 * @param {number} driverId - 司机ID
 */
function confirmDeleteDriver(driverId) {
    const driver = driversData.find(d => d.id === driverId);
    if (!driver) return;

    if (confirm(`确定要删除司机 ${driver.name} 吗？此操作不可撤销。`)) {
        // 从数据中删除
        const driverIndex = driversData.findIndex(d => d.id === driverId);
        if (driverIndex !== -1) {
            driversData.splice(driverIndex, 1);
            filteredDrivers = [...driversData];

            // 重新渲染
            renderDrivers();

            // 显示成功消息
            alert('司机已删除');
        }
    }
}

/**
 * 隐藏模态框
 */
function hideModal() {
    DOM.driverModal.classList.remove('active');
}

/**
 * 防抖动函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 包装后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * HTML转义函数，防止XSS攻击
 * @param {string} html - 要转义的HTML字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtml(html) {
    if (!html) return '';
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initDriverManagement);

// 确保初始化函数正确执行
document.addEventListener('DOMContentLoaded', function () {
    try {
        initDriverManagement();
    } catch (error) {
        console.error('初始化失败:', error);
        // 手动渲染数据作为备份
        renderDrivers();
    }
});