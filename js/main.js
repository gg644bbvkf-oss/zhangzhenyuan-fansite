// 主JavaScript文件 - 处理导航和通用功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化更新时间
    updateLastUpdateTime();
    
    // 初始化标签页切换
    initTabs();
});

// 更新最后更新时间
function updateLastUpdateTime() {
    const updateTimeEl = document.getElementById('updateTime');
    if (updateTimeEl) {
        const now = new Date();
        const formattedTime = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        updateTimeEl.textContent = formattedTime;
    }
}

// 初始化标签页
function initTabs() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是跳转到外部页面（如 photos.html），不阻止默认行为
            if (href && (href.endsWith('.html') || href.includes('#'))) {
                return; // 让浏览器正常跳转
            }
            
            e.preventDefault();
            
            // 移除所有active类
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // 添加active类到当前
            this.classList.add('active');
            const targetId = this.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
            
            // 根据tab加载对应内容
            if (targetId === 'news') {
                loadNews();
            } else if (targetId === 'photos') {
                loadPhotos();
            }
        });
    });
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
