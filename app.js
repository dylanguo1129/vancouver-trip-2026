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
      sched: [["10:00", "早茶开门即入座：Chef Tony 或渔港"], ["12:00", "Stanley Park 图腾柱 + 海堤"], ["14:30", "Granville Island 市场逛吃"], ["17:00", "Richmond 晚餐收官（Sea Harbour 17:00 开门）"], ["18:30", "还车，YYZ 21:10 / YUL 红眼班机回家"]],
      note: "订晚班机换来的这一天，是女友唯一的温哥华整日。" }
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

  /* ---------- cpp meter ---------- */
  var cppIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      cppIo.unobserve(e.target);
      e.target.querySelectorAll(".cpp-bar").forEach(function (bar) {
        var v = parseFloat(bar.getAttribute("data-cpp"));
        bar.querySelector(".cpp-fill").style.width = Math.min(v / 4 * 100, 100) + "%";
      });
    });
  }, { threshold: 0.4 });
  var meter = document.querySelector(".cpp-meter");
  if (meter) cppIo.observe(meter);

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

  /* ---------- budget ---------- */
  var BUDGETS = {
    main: {
      rows: [["机票 · 7 人现金", 3244], ["维多利亚 Airbnb ×4 晚", 2400], ["租车 2 台 ×7 天", 1650], ["活动门票", 1500], ["纳奈莫 1 晚 ×3 间", 740], ["渡轮 2 程", 670], ["渔证油费杂项", 450], ["Element ×2 晚 ×3 间", 0]],
      pts: "另花 Marriott 300k 分（Element 全覆盖）"
    },
    biz: {
      rows: [["机票 · YUL 现金 + YYZ 商务舱税费", 1858], ["维多利亚 Airbnb ×4 晚", 2400], ["租车 2 台 ×7 天", 1650], ["活动门票", 1500], ["纳奈莫 1 晚 ×3 间", 740], ["渡轮 2 程", 670], ["渔证油费杂项", 450], ["Element ×2 晚 ×3 间", 0]],
      pts: "另花 Marriott 300k 分 + Aeroplan 249k 分（YYZ 三人商务舱，3.3¢/分）"
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
    ["BC Ferries 两程车位预约", "8/22 HSB→Departure Bay 16:00（强制预付）；8/27 SWB→TSA 16:00"],
    ["Element Metrotown 积分房 ×3 间", "30 万分或 FNA 券组合，积分房随时会没"],
    ["机票", "AC 现金票；想上商务舱先查 J 舱奖励位（seats.aero 显示有）"],
    ["维多利亚 4 房 Airbnb", "Wi-Fi 快 + 工作位 + 停 2 车，8 月存量在跌"],
    ["租车 2 台", "A：Amex Travel + Gold；B：Avis 挂 Scotia 码 + Momentum 付"],
    ["纳奈莫 Courtyard ×3 间", "走 Expedia For TD（≥$500 触发 $100 credit）"],
    ["观鲸 + 布查特门票", "提前 1 至 2 周即可"],
    ["渔证 7 张 + 出发前 48h 查 BCCDC 贝类地图", "全员在线办证，16 岁以下免费"]
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
    li.innerHTML = "<span class='check-box'>" + (saved.indexOf(i) > -1 ? "✓" : "") + "</span><span class='check-text'><b>" + c[0] + "</b><span>" + c[1] + "</span></span>";
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
