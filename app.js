/* 温哥华 · 海岛之夏 2026 — interactions
   No window scroll listeners: IntersectionObserver only. Reduced motion honored. */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- images ---------- */
  var IMG = {
    ferry: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Coastal_Celebration_at_Swartz_Bay.JPG/1920px-Coastal_Celebration_at_Swartz_Bay.JPG",
    oyster: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Pacific_oyster_from_Brofjorden_on_a_chopping_board_in_Tuntorp.jpg/1920px-Pacific_oyster_from_Brofjorden_on_a_chopping_board_in_Tuntorp.jpg",
    butchart: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Butchart_gardens.JPG/1920px-Butchart_gardens.JPG",
    whale: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Orcinus_orca_%2810.3897-BDJ.10.e76050%29_Figure_21.jpeg/1920px-Orcinus_orca_%2810.3897-BDJ.10.e76050%29_Figure_21.jpeg",
    victoria: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/British_Columbia_Parliament_Buildings_and_vicinity_at_night%2C_from_across_the_harbour.jpg/1920px-British_Columbia_Parliament_Buildings_and_vicinity_at_night%2C_from_across_the_harbour.jpg",
    seatosky: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/The_North_end_of_Howe_Sound_and_Squamish%2C_BC_%283828051167%29.jpg/1920px-The_North_end_of_Howe_Sound_and_Squamish%2C_BC_%283828051167%29.jpg",
    stanley: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Vancouver_%28BC%2C_Canada%29%2C_Stanley_Park%2C_Stanley_Park_Seawall_Path_--_2022_--_2056.jpg/1920px-Vancouver_%28BC%2C_Canada%29%2C_Stanley_Park%2C_Stanley_Park_Seawall_Path_--_2022_--_2056.jpg",
    englishbay: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/English_Bay_Vancouver_04.jpg/1920px-English_Bay_Vancouver_04.jpg"
  };

  /* ---------- day data ---------- */
  var DAYS = [
    { d: "D1", date: "8/22 周六", title: "落地即出发：温哥华 → 纳奈莫", tag: "全员", img: IMG.ferry,
      alt: "BC Ferries 的 Coastal Celebration 号驶离码头",
      sched: [["~11:00", "两家先后落地 YVR，提两辆七座车"], ["13:00", "Horseshoe Bay 码头午餐逛小镇"], ["16:00", "渡轮跨过乔治亚海峡（1h40m，强制预付订票）"], ["17:40", "纳奈莫 Courtyard 入住"], ["晚上", "超市备赶海装备：手套 水桶 冰箱 水鞋"]],
      note: "出发前人人办好 BC 潮水渔证（成人 1 日 $6.46，16 岁以下免费）。" },
    { d: "D2", date: "8/23 周日", title: "赶海日：Deep Bay 挖牡蛎 → 维多利亚", tag: "全员", img: IMG.oyster,
      alt: "撬开的太平洋牡蛎，壳里还带着海水",
      sched: [["07:45", "出发去 Deep Bay（50 分钟）"], ["08:30", "Mapleguard 外滩开挖：低潮 09:14 / 1.42m"], ["11:30", "滩边烤一波，南下 Coombs 屋顶山羊市场午餐"], ["15:30", "维多利亚 4 房 Airbnb 入住，先测网速"], ["晚上", "内港夜景 + 唐人街 Don Mee 晚饭"]],
      note: "限额：牡蛎 12 只/人，蛤蜊 60 只/人（≥35mm）。八月野生贝类必须煮熟。" },
    { d: "D3", date: "8/24 周一", title: "维多利亚：布查特花园", tag: "6 人白天 · 全员下午", work: true, img: IMG.butchart,
      alt: "布查特花园下沉花园的花海",
      sched: [["06:00", "女友在 Airbnb 上班（至 14:00）"], ["09:30", "其他人布查特花园（成人 $44.25 / 7 岁 $5）"], ["14:30", "全员：Fisherman's Wharf 看海豹吃炸鱼"], ["16:30", "Beacon Hill 公园散步"], ["晚上", "J&J 云吞面"]],
      note: "" },
    { d: "D4", date: "8/25 周二", title: "维多利亚：出海观鲸", tag: "6 人白天 · 全员下午", work: true, img: IMG.whale,
      alt: "萨利希海上的虎鲸群",
      sched: [["09:00", "观鲸船出海（8 月虎鲸旺季，7 岁可上船）"], ["14:30", "全员：Malahat SkyWalk 树冠螺旋塔 + 滑梯"], ["17:30", "回程超市补给"], ["晚上", "Airbnb 做饭：白灼自己挖的蛤蜊"]],
      note: "不想出海的可以去皇家 BC 博物馆或在家躺平。" },
    { d: "D5", date: "8/26 周三", title: "维多利亚 · 躺平日", tag: "6 人白天 · 全员下午", work: true, img: IMG.victoria,
      alt: "夜里的 BC 议会大厦，灯串沿着轮廓亮起来",
      sched: [["上午", "睡到自然醒 / Willows 海滩 / 咖啡馆"], ["14:30", "全员：Fan Tan Alley + 唐人街淘小店"], ["16:30", "Craigdarroch 城堡或下午茶（自选）"], ["晚上", "收拾行李，明天下班就走"]],
      note: "" },
    { d: "D6", date: "8/27 周四", title: "移动日：维多利亚 → 铁道镇", tag: "下班即走", work: true, img: IMG.ferry,
      alt: "渡轮甲板上看海峡与岛屿",
      sched: [["11:00", "退房装车，女友咖啡馆收尾工作"], ["14:15", "出发 Swartz Bay（30 分钟）"], ["16:00", "渡轮回大陆（1h35m，别订 15:00 那班）"], ["18:10", "Element Metrotown 入住（全厨房 + 早餐）"], ["晚上", "楼下 Crystal Mall 美食层开吃"]],
      note: "三间房全部积分覆盖：30 万 Marriott 分，现金 $0。" },
    { d: "D7", date: "8/28 周五", title: "北岸峡谷 + 夜市", tag: "6 人白天 · 全员晚上", work: true, img: IMG.seatosky,
      alt: "Howe Sound 峡湾与 Squamish 的航拍",
      sched: [["09:00", "A 线：Lynn Canyon 免费吊桥 + Deep Cove"], ["09:00", "B 线：Sea to Sky 缆车看 Howe Sound（二选一）"], ["14:30", "全员：Steveston 渔人码头买现捞海鲜"], ["17:00", "回 Element 厨房做海鲜大餐"], ["19:30", "Richmond 夜市（周五开到午夜）"]],
      note: "" },
    { d: "D8", date: "8/29 周六", title: "完整温哥华日，晚班机回家", tag: "全员", img: IMG.stanley,
      alt: "斯坦利公园海堤步道，骑行的人沿着海走",
      sched: [["10:00", "早茶开门即入座：Chef Tony 或渔港"], ["12:00", "Stanley Park 图腾柱 + 海堤"], ["14:30", "Granville Island 市场逛吃"], ["17:00", "告别晚宴：唐人街 Kissa Tanto（100 Best 第 15 名，两张 Plat 各结一单 ≥$200 返 $400）或 Richmond Sea Harbour"], ["19:30", "还车，YYZ 21:10 / YUL 红眼班机回家"]],
      note: "订晚班机换来的这一天，是女友唯一的温哥华整日。Kissa Tanto 要提前订位。" }
  ];

  /* ---------- day tabs ---------- */
  var tabsBox = document.querySelector(".day-tabs");
  var dayImg = document.getElementById("day-img");
  var dayTitle = document.getElementById("day-title");
  var dayTag = document.getElementById("day-tag");
  var daySchedule = document.getElementById("day-schedule");
  var dayNote = document.getElementById("day-note");
  var dayMedia = document.querySelector(".day-media");

  DAYS.forEach(function (day, i) {
    var b = document.createElement("button");
    b.className = "day-tab";
    b.setAttribute("role", "tab");
    b.innerHTML = "<b>" + day.d + "</b>" + day.date;
    b.addEventListener("click", function () { selectDay(i); });
    tabsBox.appendChild(b);
  });

  function selectDay(i) {
    var day = DAYS[i];
    Array.prototype.forEach.call(tabsBox.children, function (el, j) {
      el.classList.toggle("active", i === j);
      el.setAttribute("aria-selected", i === j ? "true" : "false");
    });
    dayMedia.classList.remove("img-off");
    dayImg.style.opacity = 0;
    var next = new Image();
    next.onload = function () { dayImg.src = day.img; dayImg.alt = day.alt; dayImg.style.opacity = 1; };
    next.onerror = function () { dayMedia.classList.add("img-off"); };
    next.src = day.img;
    dayTitle.textContent = day.d + " · " + day.date + " · " + day.title;
    dayTag.textContent = day.tag;
    dayTag.classList.toggle("tag-work", !!day.work);
    daySchedule.innerHTML = day.sched.map(function (s) {
      return "<li><span class='t'>" + s[0] + "</span><span>" + s[1] + "</span></li>";
    }).join("");
    dayNote.textContent = day.note;
    dayNote.style.display = day.note ? "" : "none";
  }
  selectDay(0);

  /* ---------- scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(".section h2, .section-lede, .stats-row, .day-panel, .day-tabs, .map-wrap, .tide-grid, .food-scroll, .cpp-meter, .points-cards, .budget-toggle, .budget-list, .budget-total, .check-list");
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(function (el) { io.observe(el); });

  /* ---------- count-up stats ---------- */
  function countUp(el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion) { el.textContent = end; return; }
    var t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { countUp(e.target); statIo.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach(function (el) { statIo.observe(el); });

  /* ---------- cpp meters (Aeroplan 2.0 line / Marriott 0.8 line) ---------- */
  var cppIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      cppIo.unobserve(e.target);
      var max = parseFloat(e.target.getAttribute("data-max")) || 4;
      e.target.querySelectorAll(".cpp-bar").forEach(function (bar) {
        var v = parseFloat(bar.getAttribute("data-cpp"));
        bar.querySelector(".cpp-fill").style.width = Math.min(v / max * 100, 100) + "%";
      });
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".cpp-meter").forEach(function (m) { cppIo.observe(m); });

  /* ---------- tide chart (Denman Island, 2026-08-23 PDT, CHS predictions) ---------- */
  (function tide() {
    var svg = document.getElementById("tide-svg");
    if (!svg) return;
    var W = 640, H = 300, padL = 44, padR = 16, padT = 24, padB = 40;
    // [hour, height m] extremes incl neighbours for a smooth curve
    var ext = [[-2.32, 3.83], [0.88, 3.98], [9.23, 1.42], [17.27, 4.46], [22.53, 3.73], [26.27, 3.99]];
    function x(h) { return padL + (h / 24) * (W - padL - padR); }
    function y(m) { return H - padB - ((m - 0.5) / (5.0 - 0.5)) * (H - padT - padB); }
    // cosine interpolation between successive extremes
    var pts = [];
    for (var h = 0; h <= 24; h += 0.25) {
      var a = null, b = null;
      for (var i = 0; i < ext.length - 1; i++) {
        if (h >= ext[i][0] && h <= ext[i + 1][0]) { a = ext[i]; b = ext[i + 1]; break; }
      }
      if (!a) continue;
      var p = (h - a[0]) / (b[0] - a[0]);
      var v = a[1] + (b[1] - a[1]) * (1 - Math.cos(Math.PI * p)) / 2;
      pts.push([x(h), y(v)]);
    }
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("");
    var ns = "http://www.w3.org/2000/svg";
    function el(tag, attrs, text) {
      var e = document.createElementNS(ns, tag);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      if (text) e.textContent = text;
      svg.appendChild(e);
      return e;
    }
    // harvest window band 8.5h-11h
    el("rect", { x: x(8.5), y: padT, width: x(11) - x(8.5), height: H - padT - padB, fill: "oklch(0.8 0.13 75 / .13)", rx: 6 });
    // grid lines + y labels
    [1, 2, 3, 4].forEach(function (m) {
      el("line", { x1: padL, y1: y(m), x2: W - padR, y2: y(m), stroke: "oklch(1 0 0 / .08)", "stroke-width": 1 });
      el("text", { x: padL - 8, y: y(m) + 4, "text-anchor": "end", fill: "oklch(0.76 0.02 268)", "font-size": 11 }, m + "m");
    });
    [0, 6, 12, 18, 24].forEach(function (h) {
      el("text", { x: x(h), y: H - padB + 22, "text-anchor": "middle", fill: "oklch(0.76 0.02 268)", "font-size": 11 }, (h < 10 ? "0" : "") + (h % 24) + ":00");
    });
    // fill under curve
    el("path", { d: d + "L" + x(24).toFixed(1) + " " + (H - padB) + "L" + x(0).toFixed(1) + " " + (H - padB) + "Z", fill: "oklch(0.62 0.13 268 / .15)" });
    // curve
    var curve = el("path", { d: d, fill: "none", stroke: "oklch(0.62 0.13 268)", "stroke-width": 3, "stroke-linecap": "round" });
    if (!reduceMotion) {
      var len = curve.getTotalLength();
      curve.style.strokeDasharray = len;
      curve.style.strokeDashoffset = len;
      var tideIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          tideIo.unobserve(e.target);
          curve.style.transition = "stroke-dashoffset 2.2s cubic-bezier(0.16,1,0.3,1)";
          curve.style.strokeDashoffset = "0";
        });
      }, { threshold: 0.4 });
      tideIo.observe(svg);
    }
    // low tide marker
    el("circle", { cx: x(9.23), cy: y(1.42), r: 6, fill: "oklch(0.8 0.13 75)", stroke: "oklch(0.15 0.02 268)", "stroke-width": 2 });
    el("text", { x: x(9.23), y: y(1.42) + 26, "text-anchor": "middle", fill: "oklch(0.95 0.01 268)", "font-size": 13, "font-weight": 700 }, "低潮 09:14 · 1.42m");
    el("text", { x: x(9.75), y: padT + 14, "text-anchor": "middle", fill: "oklch(0.8 0.13 75)", "font-size": 12, "font-weight": 700 }, "赶海窗口 08:30 至 11:00");
  })();

  /* ---------- hotel top-10 ---------- */
  var HOTELS = {
    island: { label: "岛上第一晚 8/22", list: [
      { n: "Courtyard by Marriott Nanaimo", s: 8.2, p: "$239 ✓", badge: "方案主推", pro: "2023 全新 + 室内泳池，去码头 8 分钟，走 Expedia For TD 还吃 $100 credit", con: "无自有停车场（对面市政楼 ~$12）；离蚝滩 48 分钟", u: "https://www.marriott.com/en-us/hotels/ycdcy-courtyard-nanaimo/overview/" },
      { n: "Oceanside Village Resort · Parksville", s: 8.1, p: "~$360-500/栋", pro: "独栋 2-3 房木屋带全厨房和洗烘，一栋 3 房能装下全家，离蚝滩 29 分钟", con: "八月常有 3 晚起订，周六单晚基本抢不到", u: "https://oceansidevillageresort.com/" },
      { n: "Tigh-Na-Mara Seaside Spa Resort", s: 8.0, badge: "度假首选", p: "~$380-550/栋", pro: "1946 年老牌海滨木屋度假村，室内泳池 + 全厨房小屋，离蚝滩仅 30 分钟（Grotto 矿物温泉为付费 Spa）", con: "八月周六单晚近乎不可能，需电话碰运气 1-800-663-7373", u: "https://tigh-na-mara.com/" },
      { n: "The Beach Club Resort · Parksville", s: 7.9, p: "~$350-520/套", pro: "Parksville 海滩正对面的度假公寓，套房带全厨房 + 室内泳池", con: "旺季周六稀缺，价格是纳奈莫的近两倍", u: "https://www.beachclubresort.com/" },
      { n: "Bayside Oceanfront Resort", s: 7.8, p: "~$270-390", pro: "2021-22 翻新，双泳池免费停车，离蚝滩全场最近（26 分钟）", con: "标准房无厨房；离回程码头最远", u: "https://baysideresortparksville.com/" },
      { n: "Coast Bastion Hotel · Nanaimo", s: 7.5, p: "~$250-350", pro: "2024 整体翻新，海港景观房，离码头 6 分钟", con: "没有泳池；停车 ~$15-18", u: "https://www.coasthotels.com/coast-bastion-hotel" },
      { n: "Inn on Long Lake · Nanaimo", s: 7.4, p: "~$220-310", pro: "湖畔私家沙滩 + 免费皮划艇，傍晚到店孩子能玩水", con: "无泳池，房型偏旧；离蚝滩 39 分钟", u: "https://www.innonlonglake.com/" },
      { n: "Grand Hotel Nanaimo", s: 7.2, p: "~$210-290", pro: "北纳奈莫位置是码头与蚝滩的最佳折中，免费地库停车", con: "没有泳池（只有健身房），品牌感一般", u: "https://thegrandhotelnanaimo.ca/" },
      { n: "Sunrise Ridge Waterfront Resort", s: 7.3, p: "~$340-490/套", pro: "联排式 2 房套房带高配厨房和壁炉", con: "户外泳池是季节性的；多晚起订风险高", u: "https://sunriseridge.ca/" },
      { n: "Best Western Plus Dorchester", s: 7.0, p: "~$200-280", pro: "全场最便宜 + 免费停车，历史建筑海港位", con: "无泳池，设施最基础", u: "https://www.bestwestern.com/" }
    ]},
    victoria: { label: "维多利亚 8/23-27", list: [
      { n: "整租 4 房 Airbnb · James Bay/市中心", s: 8.6, badge: "方案主推", p: "~$550-650/晚全家 ✓逻辑", pro: "全家一个屋檐 + 厨房煮蛤蜊 + 女友专用工作位，4 晚比 3 间酒店房省 $2,500+", con: "品质有方差：只订 Wi-Fi 实测截图 + 好评 4.8+ 的房源", u: "https://www.airbnb.ca/s/Victoria--British-Columbia--Canada/homes?checkin=2026-08-23&checkout=2026-08-27&adults=6&children=1&min_bedrooms=4" },
      { n: "Royal Scot Hotel & Suites", s: 8.35, p: "~$250-350", pro: "2 房套房带全厨房，离内港一个街区，室内泳池，全维多利亚性价比之王", con: "2018 年装修，走商务风不算惊艳", u: "https://www.royalscot.com/" },
      { n: "The Parkside Hotel & Spa", s: 8.25, p: "~$320-440/套", pro: "全套房酒店：每套带全厨房或小厨房 + 25 米泳池 + LEED 白金环保牌", con: "离内港 7-9 分钟，套房价格叠 3 套不便宜", u: "https://www.parksidevictoria.com/" },
      { n: "Hotel Grand Pacific", s: 8.1, p: "~$320-450", pro: "内港正面第一排（2 分钟），25 米泳道 + 儿童池，弟弟的快乐老家", con: "无厨房；房间风格偏传统", u: "https://www.hotelgrandpacific.com/" },
      { n: "Delta Ocean Pointe Resort", s: 8.0, badge: "Marriott 度假首选", p: "$367-498 ✓", pro: "2023 全翻新的万豪度假村：海港全景 + 室内泳池；Plat 送的 Marriott Gold＝升房机会 + 2pm 延退 + 25% 积分加成", con: "3 间 4 晚现金 ~$4,900；积分价 64.5k/晚分值只有 0.67¢ 别用分（可查 Hotel Collection 价再拿 US$100/房 credit）", u: "https://www.marriott.com/en-us/hotels/yyjvo-delta-hotels-victoria-ocean-pointe-resort/overview/" },
      { n: "Inn at Laurel Point", s: 7.95, p: "~$350-480", pro: "4.6★ 口碑天花板，玻璃房泳池 + 海港半岛日式庭院", con: "无厨房；好房型溢价快", u: "https://www.laurelpoint.com/" },
      { n: "Chateau Victoria Hotel & Suites", s: 7.9, p: "~$260-360", pro: "便宜的套房带整套 galley 厨房（冰箱+炉灶），顶楼餐厅看全城，直订停车半价", con: "楼龄 1970s，电梯和走廊显旧", u: "https://www.chateauvictoria.com/" },
      { n: "Victoria Marriott Inner Harbour", s: 7.6, p: "~$360-450 ✓", pro: "位置极好（内港 5 分钟）+ 室内泳池，万豪生态", con: "装修年代模糊，4.3★ 在本榜垫不了腰；积分价 56k/晚不划算", u: "https://www.marriott.com/en-us/hotels/yyzmc-victoria-marriott-inner-harbour/overview/" },
      { n: "Fairmont Empress", s: 7.5, badge: "体验之选", p: "~$550-750+", pro: "内港的城堡本堡：1908 年地标 + 儿童戏水池；要订就走 Plat 的 FHR：每房双人早餐 + US$100 credit + 保证 4pm 退房，4 晚拿回 $1,000+ 价值", con: "3 间 4 晚 ~$7,500 起，性价比分直接拉爆", u: "https://www.fairmont.com/empress-victoria/" },
      { n: "DoubleTree by Hilton Victoria", s: 7.3, p: "~$280-390", pro: "位置便利 + 到店热曲奇；Plat 的 Hilton Gold＝每房双人早餐", con: "没有泳池，对这队小孩是硬伤", u: "https://www.hilton.com/" }
    ]},
    metro: { label: "大温 8/27-29", list: [
      { n: "Element Vancouver Metrotown", s: 8.75, badge: "方案主推", p: "$431-508 或 50k 分/晚 ✓", pro: "2025 整体翻新 + 每间全厨房 + 含 7 人早餐 + 盐水泳池；30 万分全包 $0 现金（1.19¢ 全场最高分值）", con: "离 YVR 25 分钟；Google 口碑 4.0 略低于万豪站 4.4", u: "https://www.marriott.com/en-us/hotels/yvrel-element-vancouver-metrotown/overview/" },
      { n: "Fairmont Vancouver Airport", s: 7.95, badge: "零压力返程", p: "~$420-560", pro: "就在 YVR 航站楼里：周六玩到最后一刻，行李推着就值机；4.6★ + 儿童戏水池", con: "无厨房，停车 $55/晚，Richmond 吃饭要开 10 分钟", u: "https://www.fairmont.com/vancouver-airport/" },
      { n: "Versante Hotel", s: 7.9, p: "~$360-480", pro: "2021 年新建的精品设计酒店，屋顶盐水泳池，走路去夜市", con: "无厨房；房价在 Richmond 属第一梯队", u: "https://versantehotel.com/" },
      { n: "The Westin Wall Centre, Vancouver Airport", s: 7.8, p: "$442 ✓", pro: "4.6★ 口碑 + 室内泳池，机场线 5 分钟到食街", con: "2010 年楼龄，公共区开始显旧", u: "https://www.marriott.com/en-us/hotels/yvrwi-the-westin-wall-centre-vancouver-airport/overview/" },
      { n: "Vancouver Airport Marriott", s: 7.7, p: "$431 ✓", pro: "2019 翻新，走路去 Alexandra Rd 食街，户外泳池", con: "积分价 55k/晚分值 0.92¢ 一般；Google 4.1", u: "https://www.marriott.com/en-us/hotels/yvrsa-vancouver-airport-marriott-hotel/overview/" },
      { n: "River Rock Casino Resort", s: 7.55, badge: "遛娃彩蛋", p: "~$280-380", pro: "室内泳池带 70 英尺水滑梯（弟弟狂喜），走路去夜市，自助停车免费", con: "赌场人流嘈杂；房型新旧不齐", u: "https://www.riverrock.com/" },
      { n: "Sheraton Vancouver Airport", s: 7.5, p: "$408 ✓", pro: "离食街最近的一档 + 户外泳池，价格低于同档万豪", con: "2016 年装修，口碑 4.1 中规中矩", u: "https://www.marriott.com/en-us/hotels/yvrsi-sheraton-vancouver-airport-hotel/overview/" },
      { n: "Hilton Vancouver Airport", s: 7.45, p: "~$295-395", pro: "2020 翻新 + 户外泳池；Plat 送的 Hilton Gold＝每房双人免费早餐（3 房 2 天 ≈省 $200）", con: "各项都行但没有一项拔尖", u: "https://www.hilton.com/" },
      { n: "整租 4 房 Airbnb · Richmond", s: 7.4, p: "~$600-800/晚全家", pro: "全家同屋 + 厨房，食街环绕", con: "只住 2 晚：清洁费摊下来不划算，Element 的厨房已覆盖需求", u: "https://www.airbnb.ca/s/Richmond--British-Columbia--Canada/homes?checkin=2026-08-27&checkout=2026-08-29&adults=6&children=1&min_bedrooms=4" },
      { n: "The Westin Bayshore, Vancouver", s: 7.3, badge: "住进城里", p: "~$380-631 ✓", pro: "斯坦利公园旁的城市度假村，双泳池海景，周六行程零通勤", con: "周六早退房要横穿全城去还车赶飞机；停车 $48", u: "https://www.marriott.com/en-us/hotels/yvrwb-the-westin-bayshore-vancouver/overview/" }
    ]}
  };
  var hotelTabsBox = document.querySelector(".hotel-tabs");
  var hotelList = document.getElementById("hotel-list");
  if (hotelTabsBox && hotelList) {
    Object.keys(HOTELS).forEach(function (key, idx) {
      var b = document.createElement("button");
      b.className = "day-tab" + (idx === 0 ? " active" : "");
      b.setAttribute("role", "tab");
      b.textContent = HOTELS[key].label;
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(hotelTabsBox.children, function (el) { el.classList.remove("active"); });
        b.classList.add("active");
        renderHotels(key);
      });
      hotelTabsBox.appendChild(b);
    });
    var renderHotels = function (key) {
      hotelList.innerHTML = HOTELS[key].list.map(function (h, i) {
        var badge = h.badge ? "<span class='h-badge" + (i === 0 ? " gold" : "") + "'>" + h.badge + "</span>" : "";
        return "<li class='hotel-row" + (i < 3 ? " top3" : "") + "'>" +
          "<div class='h-rank'>" + (i + 1) + "</div>" +
          "<div><div class='h-name'>" + h.n + badge + "</div>" +
          "<div class='h-pro'>✓ " + h.pro + "</div>" +
          "<div class='h-con'>✗ " + h.con + "</div></div>" +
          "<div class='h-right'><span class='h-score'>" + h.s.toFixed(2) + "</span>" +
          "<span class='h-price'>" + h.p + "</span>" +
          "<a class='h-link' href='" + h.u + "' target='_blank' rel='noopener'>去看看 ↗</a></div></li>";
      }).join("");
    };
    renderHotels("island");
  }

  /* ---------- budget ---------- */
  var BUDGETS = {
    main: {
      rows: [["机票 + 行李（含 credit）", 4022], ["维多利亚 Airbnb ×4 晚", 2400], ["租车 2 台 ×7 天", 1650], ["活动门票", 1500], ["纳奈莫 1 晚 ×3 间", 740], ["渡轮 2 程", 670], ["渔证油费杂项", 450], ["Element ×2 晚 ×3 间", 0]],
      pts: "另花 Marriott 300k 分（Element 全覆盖）· Aeroplan 一分不动"
    },
    biz: {
      rows: [["机票 + 行李（两单各挂一位持卡人）", 3392], ["维多利亚 Airbnb ×4 晚", 2400], ["租车 2 台 ×7 天", 1650], ["活动门票", 1500], ["纳奈莫 1 晚 ×3 间", 740], ["渡轮 2 程", 670], ["渔证油费杂项", 450], ["Element ×2 晚 ×3 间", 0]],
      pts: "Aeroplan 联名卡免首件托运：7 人 ×2 程 省 $630，超过任何一张卡的年费"
    }
  };
  var budgetList = document.getElementById("budget-list");
  var budgetTotal = document.getElementById("budget-total");
  var budgetPts = document.getElementById("budget-pts");
  function renderBudget(key) {
    var b = BUDGETS[key];
    var max = Math.max.apply(null, b.rows.map(function (r) { return r[1]; }));
    var total = b.rows.reduce(function (s, r) { return s + r[1]; }, 0);
    budgetList.innerHTML = b.rows.map(function (r) {
      return "<div class='b-row'><span class='b-name'>" + r[0] + "</span><div class='b-track'><div class='b-fill' data-w='" + (r[1] / max * 100) + "'></div></div><span class='b-amt'>" + (r[1] ? "$" + r[1].toLocaleString() : "积分全包") + "</span></div>";
    }).join("");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        budgetList.querySelectorAll(".b-fill").forEach(function (f) { f.style.width = f.getAttribute("data-w") + "%"; });
      });
    });
    budgetTotal.textContent = "≈ $" + total.toLocaleString();
    budgetPts.textContent = b.pts;
  }
  document.querySelectorAll(".bt-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".bt-btn").forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-selected", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderBudget(btn.getAttribute("data-scenario"));
    });
  });
  renderBudget("main");

  /* ---------- checklist ---------- */
  var CHECKS = [
    ["BC Ferries 两程车位预约", "8/22 HSB→Departure Bay 16:00（强制预付）；8/27 SWB→TSA 16:00",
      [["去 BC Ferries 订票", "https://www.bcferries.com/"]]],
    ["Element Metrotown 积分房 ×3 间", "30 万分或 FNA 券组合，订时勾选 Use Points，积分房随时会没",
      [["Element 酒店页", "https://www.marriott.com/en-us/hotels/yvrel-element-vancouver-metrotown/overview/"]]],
    ["机票 · 全买现金，别用 Aeroplan 分", "YYZ 3 人：8/22 AC 08:00→09:55 $440 + 8/29 AC128 23:00 红眼｜YUL 4 人：8/22 AC 08:30→10:56 $618 + 8/29 AC314 23:20（怕红眼改 AC312 16:50）。舱位买 Standard 起（Basic 连手提都没有），两单分别走 Amex Travel 各吃一张 $200",
      [["Amex Travel 出票", "https://www.americanexpress.com/en-ca/travel/"], ["YYZ 比价", "https://www.google.com/travel/flights?q=Flights%20from%20YYZ%20to%20YVR%20on%202026-08-22%20through%202026-08-29&curr=CAD"], ["YUL 比价", "https://www.google.com/travel/flights?q=Flights%20from%20YUL%20to%20YVR%20on%202026-08-22%20through%202026-08-29&curr=CAD"]]],
    ["（可选）办一张 Aeroplan 联名卡", "持卡人 + 同订单最多 8 位同行免首件托运 = 省 $630；两个订单各需一位持卡人。Amex Plat 不含此权益",
      [["Amex Aeroplan 卡", "https://www.americanexpress.com/en-ca/membership-benefits/aeroplan-card/"]]],
    ["维多利亚 4 房 Airbnb", "Wi-Fi 快 + 工作位 + 停 2 车，8 月存量在跌",
      [["按条件搜 Airbnb", "https://www.airbnb.ca/s/Victoria--British-Columbia--Canada/homes?checkin=2026-08-23&checkout=2026-08-27&adults=6&children=1&min_bedrooms=4"]]],
    ["租车 2 台", "A：Amex Travel 订 + Gold 付；B：Avis 挂 Scotia 码（AWD C030400）+ Momentum 付",
      [["Amex Travel 租车", "https://www.americanexpress.com/en-ca/travel/"], ["Avis 官网", "https://www.avis.ca/"]]],
    ["纳奈莫 Courtyard ×3 间", "走 Expedia For TD（住宿 ≥$500 触发 $100 credit）",
      [["Expedia For TD", "https://www.expediafortd.com/"], ["酒店详情", "https://www.marriott.com/en-us/hotels/ycdcy-courtyard-nanaimo/overview/"]]],
    ["观鲸 + 布查特门票", "提前 1 至 2 周即可",
      [["Eagle Wing 观鲸", "https://eaglewingtours.com/"], ["Butchart 官网", "https://www.butchartgardens.com/"]]],
    ["渔证 7 张 + 出发前 48h 查 BCCDC 贝类地图", "全员在线办证，16 岁以下免费",
      [["DFO 在线办证", "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/licence-permis/index-eng.html"], ["BCCDC 贝类地图", "https://maps.bccdc.ca/shellfish/"], ["CHS 潮汐表", "https://www.tides.gc.ca/en/stations/07955"]]],
    ["Amex Plat 权益激活包（免费，今天做）", "两张卡激活 Marriott Gold + Hilton Gold；订 Kissa Tanto 周六晚位（两单各 ≥$200 返 $400）；App 领 Instacart offer；出发日 YYZ 用 Priority Security + 免费 Valet",
      [["Amex 权益页", "https://www.americanexpress.com/en-ca/benefits/travel/the-platinum-card/"], ["Kissa Tanto 订位", "https://www.kissatanto.com/"]]]
  ];
  var checkList = document.getElementById("check-list");
  var saved = [];
  try { saved = JSON.parse(localStorage.getItem("vt26-checks") || "[]"); } catch (err) { saved = []; }
  CHECKS.forEach(function (c, i) {
    var li = document.createElement("li");
    li.className = "check-item" + (saved.indexOf(i) > -1 ? " done" : "");
    li.setAttribute("role", "checkbox");
    li.setAttribute("aria-checked", saved.indexOf(i) > -1 ? "true" : "false");
    li.tabIndex = 0;
    var linksHtml = "";
    if (c[2]) {
      linksHtml = "<span class='check-links'>" + c[2].map(function (l) {
        return "<a href='" + l[1] + "' target='_blank' rel='noopener'>" + l[0] + " ↗</a>";
      }).join("") + "</span>";
    }
    li.innerHTML = "<span class='check-box'>" + (saved.indexOf(i) > -1 ? "✓" : "") + "</span><span class='check-text'><b>" + c[0] + "</b><span>" + c[1] + "</span>" + linksHtml + "</span>";
    Array.prototype.forEach.call(li.querySelectorAll(".check-links a"), function (a) {
      a.addEventListener("click", function (e) { e.stopPropagation(); });
    });
    function toggle() {
      li.classList.toggle("done");
      var on = li.classList.contains("done");
      li.setAttribute("aria-checked", on ? "true" : "false");
      li.querySelector(".check-box").textContent = on ? "✓" : "";
      var idx = saved.indexOf(i);
      if (on && idx === -1) saved.push(i);
      if (!on && idx > -1) saved.splice(idx, 1);
      try { localStorage.setItem("vt26-checks", JSON.stringify(saved)); } catch (err) {}
    }
    li.addEventListener("click", toggle);
    li.addEventListener("keydown", function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); } });
    checkList.appendChild(li);
  });

  /* ---------- leaflet map (lazy) ---------- */
  var mapInit = false;
  var mapIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting || mapInit) return;
      mapInit = true;
      mapIo.disconnect();
      initMap();
    });
  }, { rootMargin: "200px" });
  mapIo.observe(document.getElementById("leaflet-map"));

  function initMap() {
    if (typeof L === "undefined") return;
    var map = L.map("leaflet-map", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd", maxZoom: 12
    }).addTo(map);
    var stops = [
      { n: 1, name: "YVR 落地 · 提车", ll: [49.1947, -123.1792] },
      { n: 2, name: "Horseshoe Bay 码头", ll: [49.3733, -123.2717] },
      { n: 3, name: "纳奈莫 · 第 1 晚", ll: [49.1659, -123.9401] },
      { n: 4, name: "Deep Bay 赶海（周日低潮 09:14）", ll: [49.4664, -124.7275] },
      { n: 5, name: "Coombs 屋顶山羊", ll: [49.2989, -124.4269] },
      { n: 6, name: "维多利亚 · 第 2 至 5 晚", ll: [48.4284, -123.3656] },
      { n: 7, name: "Swartz Bay 码头", ll: [48.6886, -123.4104] },
      { n: 8, name: "Tsawwassen 码头", ll: [49.0084, -123.1281] },
      { n: 9, name: "Element Metrotown · 第 6 至 7 晚", ll: [49.2276, -123.0076] }
    ];
    stops.forEach(function (s) {
      L.marker(s.ll, {
        icon: L.divIcon({ className: "", html: "<div class='trip-pin'>" + s.n + "</div>", iconSize: [26, 26], iconAnchor: [13, 13] })
      }).addTo(map).bindPopup("<b>" + s.name + "</b>");
    });
    function line(coords, ferry) {
      L.polyline(coords, {
        color: ferry ? "oklch(0.62 0.13 268)" : "oklch(0.8 0.13 75)",
        weight: 3, opacity: 0.9, dashArray: ferry ? "8 8" : null
      }).addTo(map);
    }
    line([stops[0].ll, stops[1].ll]);                       // YVR -> HSB
    line([stops[1].ll, [49.21, -123.62], stops[2].ll], 1);  // ferry HSB -> Departure Bay
    line([stops[2].ll, stops[3].ll]);                       // Nanaimo -> Deep Bay
    line([stops[3].ll, stops[4].ll, stops[5].ll]);          // Deep Bay -> Coombs -> Victoria
    line([stops[5].ll, stops[6].ll]);                       // Victoria -> Swartz Bay
    line([stops[6].ll, [48.78, -123.24], stops[7].ll], 1);  // ferry SWB -> TSA
    line([stops[7].ll, stops[8].ll]);                       // TSA -> Metrotown
    map.fitBounds(L.latLngBounds(stops.map(function (s) { return s.ll; })).pad(0.12));
  }
})();
