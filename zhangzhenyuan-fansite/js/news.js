// 真源动态JavaScript - 每日自动更新

// 模拟新闻数据 - 每条动态配相关图片
// 图片放入 images/news/ 目录，命名为 1.jpg, 2.jpg, ... 
const defaultNews = [
    {
        date: '2026-03-08',
        title: '张真源发布2026年度计划：全力创作新歌',
        content: '张真源在2025年12月30日发布的年度总结中，将"新歌计划"列为2026年的核心目标。他回顾了2024-2025年间尝试话剧表演（如国家话剧院《铁流东进》）、常驻综艺（《奔跑吧》）等多领域尝试，计划在2026年推出更多个人音乐作品。',
        source: '新浪娱乐',
        image: 'images/news/1.jpg',
        imageDesc: '张真源音乐创作中'
    },
    {
        date: '2026-02-21',
        title: '张真源神还原《回家的诱惑》品如角色',
        content: '张真源近期在舞台或综艺中演绎了电视剧《回家的诱惑》经典角色"品如"，因其神态、动作和表情的精准还原被粉丝戏称"不像演的"，相关话题在2026年2月21日引发热议。',
        source: '新浪娱乐',
        image: 'images/news/2.jpg',
        imageDesc: '《回家的诱惑》品如造型'
    },
    {
        date: '2026-01',
        title: '张真源加盟《奔跑吧》综艺',
        content: '张真源作为常驻嘉宾加盟《奔跑吧》节目，展现了拼劲十足的综艺表现。在节目中他拼到汗水飞溅，热血少年感直接冲破屏幕。',
        source: '奔跑吧官方',
        image: 'images/news/3.jpg',
        imageDesc: '《奔跑吧》节目录制'
    },
    {
        date: '2025-12',
        title: '张真源参加《这是我的岛》综艺',
        content: '张真源作为常驻嘉宾参加优酷海岛探索成长秀《这是我的岛》，与时代少年团队友一起体验海岛生活，挑战自我极限。',
        source: '优酷综艺',
        image: 'images/news/4.jpg',
        imageDesc: '《这是我的岛》海岛生活'
    },
    {
        date: '2025-10-03',
        title: '张真源大连演唱会圆满成功',
        content: '2025年10月3日，张真源在大连举办个人演唱会，以红发造型搭配《Brave》等歌曲，奉献了一场视听盛宴。演唱会门票一经开售便迅速售罄，展现了超高人气。',
        source: '演唱会官方',
        image: 'images/news/5.jpg',
        imageDesc: '大连演唱会红发造型'
    },
    {
        date: '2025-07',
        title: '张真源《你好，星期六》精彩表现',
        content: '张真源作为飞行嘉宾参加湖南卫视《你好，星期六》节目，在节目中展示了出色的综艺感和舞台表现力。',
        source: '湖南卫视',
        image: 'images/news/6.jpg',
        imageDesc: '《你好，星期六》节目剧照'
    }
];

// 加载新闻
function loadNews() {
    const container = document.getElementById('newsContainer');
    if (!container) return;
    
    // 从localStorage获取缓存的新闻或使用默认数据
    let newsData = localStorage.getItem('zzyNews');
    let news = newsData ? JSON.parse(newsData) : defaultNews;
    
    // 检查是否需要更新（每天自动更新）
    checkAndUpdateNews();
    
    renderNews(news);
}

// 渲染新闻列表 - 每条动态带图片
function renderNews(news) {
    const container = document.getElementById('newsContainer');
    if (!container) return;
    
    if (news.length === 0) {
        container.innerHTML = '<div class="loading">暂无动态</div>';
        return;
    }
    
    container.innerHTML = news.map(item => `
        <div class="news-item">
            <div class="news-date">${item.date}</div>
            <div class="news-title">${item.title}</div>
            <div class="news-content">${item.content}</div>
            <div class="news-image">
                <img src="${item.image}" alt="${item.imageDesc}" loading="lazy"
                    onerror="this.style.display='none'">
            </div>
            <div class="news-source">来源: ${item.source}</div>
        </div>
    `).join('');
}

// 检查并更新新闻
function checkAndUpdateNews() {
    const lastUpdate = localStorage.getItem('zzyNewsLastUpdate');
    const today = new Date().toDateString();
    
    if (lastUpdate !== today) {
        console.log('检测到新的一天，尝试更新新闻...');
        localStorage.setItem('zzyNewsLastUpdate', today);
    }
}

// 刷新新闻
function refreshNews() {
    const container = document.getElementById('newsContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">刷新中...</div>';
    
    setTimeout(() => {
        const news = defaultNews;
        localStorage.setItem('zzyNews', JSON.stringify(news));
        localStorage.setItem('zzyNewsLastUpdate', new Date().toDateString());
        renderNews(news);
        updateLastUpdateTime();
    }, 500);
}

// 导出给全局使用
window.loadNews = loadNews;
window.refreshNews = refreshNews;
