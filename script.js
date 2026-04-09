const categories = [
    { id: "animals", name: "🐶 動物" }, { id: "transport", name: "🚗 交通工具" },
    { id: "colors", name: "🎨 顏色" }, { id: "occupation", name: "👨‍⚕️ 職業" },
    { id: "electronic", name: "💻 電器" }, { id: "furniture", name: "🛋️ 傢俬" },
    { id: "toilet", name: "🚽 浴室" }, { id: "tableware", name: "🍽️ 餐具" },
    { id: "stationery", name: "✏️ 文具" }, { id: "clothing", name: "👕 衣物" },
    { id: "places", name: "🏢 地點" }, { id: "accessories", name: "🕶️ 配飾" },
    { id: "toys", name: "🧸 玩具" }, { id: "fruits", name: "🍎 水果" }
];

const vocabData = {
    fruits: ["龍眼", "哈密瓜", "士多啤梨","奇異果","提子","木瓜","楊桃","榴槤","橙","檸檬","火龍果","牛油果","芒果","荔枝","菠蘿","藍莓","蘋果","西瓜","車厘子","香蕉"], 
    veggies: ["黃椒", "南瓜","娃娃菜","椰菜","椰菜花","洋蔥","生菜","番薯","白菜","粟米","紅椒","紅蘿蔔","矮瓜/茄子","菜心","菠菜","番茄","薯仔","蘑菇","白蘿蔔","西蘭花","辣椒","青椒","青瓜","青豆"],
    animals: ["烏龜","企鵝", "倉鼠", "兔子", "北極熊","大象","天鵝","斑馬","樹熊","河馬","熊","熊貓","牛","狐狸","狗","獅子","羊","老虎","老鼠","蛇","袋鼠","豬","豹","貓","貓頭鷹","長頸鹿","雞","馬","猴子/馬騮","駱駝","鱷魚","鴨","鸚鵡","鹿","麻雀"],
    colors: ["啡色", "紅色","黃色","黑色","藍色","橙色","紫色","粉紅色","綠色","白色","灰色"],
    occupation: ["農夫", "侍應","郵差","司機","外賣員","速遞員","太空人","工程師","廚師","收銀員","消防員","清潔工人","老師","警察","護士","醫生"],
    toilet: ["馬桶", "地拖","廁紙","掃把","梘液","梳","毛巾","水桶","浴缸","牙刷","牙膏","花灑"],
    tableware: ["飲管", "刀","匙羹","叉","杯","煲","碗","碟","筷子","鑊鏟"],
    drinks: ["豆漿", "咖啡","朱古力奶","橙汁","檸檬茶","水","汽水","湯","牛奶","益力多","維他奶","茶"],
    toys: ["拼圖", "套圈","恐龍","機械人","水槍","波","火車","煮飯仔","熊仔/啤啤熊","玩具屋","琴","積木/Lego","積木","籃球","足球","玩具車","遙控車","風箏","鼓"],
    electronic: ["風筒", "冷氣機","吸塵機","微波爐","洗衣機","焗爐","燙斗","熱水壺","燈","雪櫃","電磁爐","電腦","電視機","電飯煲","風扇"],
    furniture: ["衣櫃", "床","書架","檯","梳化","櫃","凳"],
    stationery: ["顏色紙", "刨筆機/鉛筆刨","原子筆","擦膠","橡筋","水筆","漿糊筆","白膠漿","簿","膠水","膠紙","萬字夾","螢光筆","釘書機","鉛筆","鉛筆刨","鉸剪","間尺","顏色筆"],
    clothing: ["頸巾", "冷帽","外套","冷衫","領呔","風褸","帽","恤衫","手套/手襪","拖鞋","校服","泳衣","泳褲","皮帶","短褲","羽絨","衫/T-恤","裙","襪","長褲","雨褸","水鞋","波鞋/鞋"],
    transport: ["飛機", "單車","垃圾車","天星小輪","小巴","巴士","救護車","旅遊巴","消防車","地鐵","的士","直升機","警車","貨車","輕鐵","輪船","電單車","電車"],
    places: ["博物館", "廁所","超級市場","動物園","水族館","公園","睡房","學校","機場","地鐵站","商場","泳池","巴士站","廚房","沙灘","茶餐廳","警察局","消防局","客廳"],
    accessories: ["眼鏡", "頸鍊","手鍊","耳環","戒指","手錶","髮夾","銀包","書包","手袋","遮"]
};

const HINT_TYPES = ["類別", "特徵", "地點", "用途", "裡面有什麼", "他會做什麼", "怎麼玩"];

const RULES = {
    location: ["animals", "transport", "colors", "occupation", "electronic", "furniture"],
    function: ["toilet", "tableware", "electronic", "furniture", "stationery", "clothing", "transport", "places", "accessories"],
    inside: ["places"],
    will_do: ["occupation"],
    how_play: ["toys"]
};

const UI_MAP = {
    "類別": { class: "cat-bg", icon: "hint-cat.png" },
    "特徵": { class: "feat-bg", icon: "hint-feat.png" },
    "地點": { class: "loc-bg", icon: "hint-loc.png" },
    "用途": { class: "func-bg", icon: "hint-func.png" },
    "裡面有什麼": { class: "in-bg", icon: "hint-in.png" }, 
    "他會做什麼": { class: "do-bg", icon: "hint-do.png" },
    "怎麼玩": { class: "play-bg", icon: "hint-play.png" }
};

let allItems = [], selectedIds = new Set(), gameQueue = [], records = {}, currentIdx = 0, level = 1;

function init() {
    let idCounter = 1;
    Object.keys(vocabData).forEach(cat => {
        vocabData[cat].forEach((name, i) => {
            allItems.push({ id: idCounter++, cat: cat, name: name, img: `images/vocab/${cat} (${i+1}).png` });
        });
    });
    const filterSelect = document.getElementById('category-filter');
    categories.forEach(c => filterSelect.add(new Option(c.name, c.id)));
    renderBank();
}

function renderBank() {
    const filter = document.getElementById('category-filter').value;
    const cont = document.getElementById('bank-content');
    cont.innerHTML = '';
    categories.forEach(c => {
        if (filter !== 'all' && filter !== c.id) return;
        const list = allItems.filter(i => i.cat === c.id);
        cont.insertAdjacentHTML('beforeend', `
            <div class="cat-sec">
                <div style="display:flex; justify-content:space-between; align-items:center; background:#FFD54F; padding:10px 20px; border-radius:15px; margin:20px 0 10px">
                    <h3 style="margin:0">${c.name}</h3>
                    <button class="btn" style="padding:5px 15px; font-size:0.9rem; box-shadow:none" onclick="toggleCatGroup('${c.id}')">全選 / 取消</button>
                </div>
                <div class="grid">${list.map(i => `
                    <div id="v-${i.id}" class="v-card ${selectedIds.has(i.id)?'selected':''}" onclick="toggleItem(${i.id})">
                        <img src="${i.img}" onerror="this.src='https://via.placeholder.com/150'">
                        <div style="font-weight:bold; margin-top:8px">${i.name}</div>
                    </div>`).join('')}</div>
            </div>`);
    });
}

function toggleItem(id) {
    selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id);
    document.getElementById(`v-${id}`).classList.toggle('selected');
    updateUI();
}

function toggleCatGroup(cid) {
    const group = allItems.filter(i => i.cat === cid);
    const allSelected = group.every(i => selectedIds.has(i.id));
    group.forEach(i => allSelected ? selectedIds.delete(i.id) : selectedIds.add(i.id));
    renderBank(); updateUI();
}

function updateUI() {
    document.getElementById('selected-count').innerText = selectedIds.size;
    const btn = document.getElementById('start-btn');
    btn.disabled = selectedIds.size === 0;
    btn.classList.toggle('disabled', selectedIds.size === 0);
}

function startGame() {
    level = parseInt(document.getElementById('game-level').value);
    gameQueue = allItems.filter(i => selectedIds.has(i.id));
    if (document.getElementById('order-mode').value === 'random') gameQueue.sort(() => Math.random() - 0.5);
    records = {}; currentIdx = 0;
    document.getElementById('bank-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    const hintArea = document.getElementById('hints-area');
    level === 2 ? hintArea.classList.add('lvl2-mode') : hintArea.classList.remove('lvl2-mode');
    document.getElementById('level-tag').innerText = `Level ${level}`;
    loadStage();
}

function loadStage() {
    const item = gameQueue[currentIdx];
    document.getElementById('display-img').src = item.img;
    document.getElementById('label-box').innerText = item.name;
    document.getElementById('progress-tag').innerText = `${currentIdx + 1} / ${gameQueue.length}`;
    const grid = document.getElementById('hints-area');
    grid.innerHTML = '';
    let activeHints = (level === 1) ? getValidHints(item.cat) : HINT_TYPES;
    activeHints.forEach(type => {
        const ui = UI_MAP[type];
        const isSelected = records[item.id]?.[type];
        grid.insertAdjacentHTML('beforeend', `
            <div class="h-card ${isSelected && level===1 ? 'flipped' : ''} ${isSelected && level===2 ? 'ticked' : ''}" onclick="handleHintClick(this, '${type}')">
                <div class="h-inner">
                    <div class="h-front">？</div>
                    <div class="h-back ${ui.class}">
                        <img src="images/hints/${ui.icon}" class="hint-img" onerror="this.style.display='none'">
                        <span>${type}</span>
                    </div>
                </div>
            </div>`);
    });
    document.getElementById('label-box').className = 'name-label hide-text';
    document.getElementById('prev-btn').disabled = (currentIdx === 0);
    document.getElementById('next-btn').innerText = (currentIdx === gameQueue.length - 1) ? "查看分析 🏁" : "下一個 ➡️";
}

function handleHintClick(el, type) {
    const id = gameQueue[currentIdx].id;
    if (!records[id]) records[id] = {};
    if (level === 1) {
        el.classList.toggle('flipped');
        records[id][type] = el.classList.contains('flipped');
    } else {
        el.classList.toggle('ticked');
        records[id][type] = el.classList.contains('ticked');
    }
}

function showReport() {
    const head = document.getElementById('table-head');
    const body = document.getElementById('report-body');
    head.innerHTML = `<th>項目</th>${HINT_TYPES.map(h => `<th>${h}</th>`).join('')}`;
    body.innerHTML = gameQueue.map(item => {
        const r = records[item.id] || {};
        const cells = HINT_TYPES.map(h => (r[h] ? '✅' : '-'));
        return `<tr><td><strong>${item.name}</strong></td>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }).join('');
    document.getElementById('report-overlay').classList.remove('hidden');
}

// 返回首頁邏輯
function exitGame() {
    if(!confirm("確定要返回主頁嗎？目前的進度將不會儲存。")) return;
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('bank-screen').classList.remove('hidden');
}

function closeReport() {
    document.getElementById('report-overlay').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('bank-screen').classList.remove('hidden');
    resetSelection();
}

async function exportToImage() {
    const btn = document.querySelector('.btn-download');
    const ctrl = document.querySelector('.report-btns');
    btn.innerText = "正在儲存...";
    ctrl.style.display = 'none';
    try {
        const canvas = await html2canvas(document.getElementById('capture-area'), { scale: 2 });
        const link = document.createElement('a');
        const sName = document.getElementById('student-name').value || "學生";
        link.download = `${sName}_教學紀錄_${new Date().toLocaleDateString()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (e) { alert("匯出失敗"); }
    ctrl.style.display = 'flex';
    btn.innerText = "💾 下載 PNG 紀錄";
}

function getValidHints(cat) {
    let list = ["類別", "特徵"];
    if (RULES.location.includes(cat)) list.push("地點");
    if (RULES.function.includes(cat)) list.push("用途");
    if (RULES.inside.includes(cat)) list.push("裡面有什麼");
    if (RULES.will_do.includes(cat)) list.push("他會做什麼");
    if (RULES.how_play.includes(cat)) list.push("怎麼玩");
    return list;
}

function toggleName() { document.getElementById('label-box').classList.toggle('hide-text'); }
function changeStage(dir) { if (dir === 1 && currentIdx === gameQueue.length - 1) return showReport(); currentIdx += dir; loadStage(); }
function adjustZoom() { document.documentElement.style.setProperty('--card-w', document.getElementById('zoom-slider').value + 'px'); }
function resetSelection() { selectedIds.clear(); renderBank(); updateUI(); }

init();
