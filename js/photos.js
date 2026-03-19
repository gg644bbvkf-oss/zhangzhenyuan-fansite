// 真源帅照JavaScript - 分类浏览模式

// 照片分类配置 - 使用emoji图标
const photoCategories = {
    stage: { name: '舞台魅力', folder: 'stage', count: 10, icon: '🎤', bg: 'linear-gradient(135deg, #ff6b9d, #ffaec9)', desc: '演唱会舞台精彩瞬间' },
    variety: { name: '综艺表现', folder: 'variety', count: 10, icon: '🎬', bg: 'linear-gradient(135deg, #667eea, #764ba2)', desc: '综艺节目录制' },
    formal: { name: '正装写真', folder: 'formal', count: 10, icon: '👔', bg: 'linear-gradient(135deg, #434343, #000000)', desc: '高级正装写真' },
    casual: { name: '日常随拍', folder: 'casual', count: 10, icon: '😊', bg: 'linear-gradient(135deg, #f093fb, #f5576c)', desc: '日常生活照' },
    concert: { name: '演唱会', folder: 'concert', count: 10, icon: '🎵', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', desc: '个人演唱会' },
    news: { name: '新闻活动', folder: 'news', count: 10, icon: '📰', bg: 'linear-gradient(135deg, #fa709a, #fee140)', desc: '新闻活动照片' }
};

// 当前状态
let currentCategory = null;

// 初始化
function initPhotos() {
    const container = document.getElementById('photoGallery');
    if (!container) return;
    
    // 检查URL参数决定显示哪个分类
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && photoCategories[category]) {
        renderCategoryPhotos(category);
    } else {
        renderCategoryList();
    }
}

// 渲染分类列表（首页）
function renderCategoryList() {
    const container = document.getElementById('photoGallery');
    currentCategory = null;
    
    container.innerHTML = `
        <div class="category-grid">
            ${Object.entries(photoCategories).map(([key, cat]) => `
                <div class="category-card" onclick="goToCategory('${key}')" style="background: ${cat.bg}">
                    <div class="category-icon">${cat.icon}</div>
                    <div class="category-name">${cat.name}</div>
                    <div class="category-desc">${cat.desc}</div>
                    <div class="category-count">${cat.count} 张照片 &rarr;</div>
                </div>
            `).join('')}
        </div>
        <div class="back-home">
            <a href="index.html#photos">← 返回首页</a>
        </div>
    `;
}

// 跳转到分类页面
function goToCategory(category) {
    window.location.href = `photos.html?category=${category}`;
}

// 渲染分类照片
function renderCategoryPhotos(category) {
    const container = document.getElementById('photoGallery');
    const config = photoCategories[category];
    
    if (!config) {
        renderCategoryList();
        return;
    }
    
    // 获取该分类下的照片
    const photos = [];
    for (let i = 1; i <= config.count; i++) {
        photos.push({
            id: i,
            url: `images/${config.folder}/${i}.jpg`,
            title: `${config.name} - 第${i}张`
        });
    }
    
    currentCategory = category;
    
    container.innerHTML = `
        <div class="category-header">
            <h2>${config.icon} ${config.name}</h2>
            <p>${config.desc}</p>
            <a href="photos.html" class="back-btn">← 返回分类</a>
        </div>
        <div class="photo-grid">
            ${photos.map(photo => `
                <div class="photo-item" onclick="viewPhoto('${photo.url}', '${photo.title}')">
                    <img src="${photo.url}" alt="${photo.title}" 
                        onerror="this.parentElement.style.display='none'"
                        loading="lazy">
                </div>
            `).join('')}
        </div>
    `;
}

// 查看大图
function viewPhoto(url, title) {
    // 创建模态框查看大图
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="photo-modal-content">
            <span class="photo-modal-close" onclick="this.parentElement.parentElement.remove()">×</span>
            <img src="${url}" alt="${title}">
            <p>${title}</p>
        </div>
    `;
    modal.onclick = function(e) {
        if (e.target === modal) modal.remove();
    };
    document.body.appendChild(modal);
}

// 加载照片（兼容旧版本）
function loadPhotos() {
    initPhotos();
}

// 刷新照片
function refreshPhotos() {
    localStorage.removeItem('zzyPhotos');
    localStorage.removeItem('zzyPhotosLastUpdate');
    initPhotos();
}

// 导出给全局使用
window.loadPhotos = loadPhotos;
window.refreshPhotos = refreshPhotos;
window.initPhotos = initPhotos;
window.goToCategory = goToCategory;
window.renderCategoryPhotos = renderCategoryPhotos;
window.viewPhoto = viewPhoto;
window.photoCategories = photoCategories;
