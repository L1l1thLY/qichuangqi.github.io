/* ==========================================================================
   起床气家族 · 冒险岛怀旧服家族招募页
   assets/js/main.js
   --------------------------------------------------------------------------
   依赖：无。defer 加载，index.html 与 404.html 共用，元素不存在时各模块自动跳过。
   所有像素图都在下面的 SPRITES 里用字符画定义，运行时画成图片，不额外请求资源。
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var root = document.documentElement;
  root.classList.remove('no-js');

  /* ======================================================================
     像素图定义：每个字符是一个像素，'.' 为透明
     ====================================================================== */
  var SPRITES = {
    leaf: {
      pal: { r: '#e8322c', d: '#9c1a16' },
      rows: [
        '.....r.....',
        '....rrr....',
        '.r..rrr..r.',
        '.rr.rdr.rr.',
        '..rrrdrrr..',
        'rrrrrdrrrrr',
        '.rrrrdrrrr.',
        '..rrrdrrr..',
        '...r.d.r...',
        '.....d.....',
        '.....d.....'
      ]
    },
    mushroom: {
      pal: { k: '#3b1d0e', o: '#ff8b1a', h: '#ffc46b', d: '#c9520d', w: '#fff4dc', s: '#ffe7bf', t: '#e3b07a' },
      rows: [
        '.....kkkkkk.....',
        '...khhwoooook...',
        '..khwwhooooodk..',
        '.khwwhoooowwodk.',
        '.khhooooowwwodk.',
        'khooooooowwooodk',
        'kdoowwoooooooddk',
        'kdddoooooooodddk',
        '.kkddddddddddkk.',
        '...kkkkkkkkkk...',
        '...kskssssksk...',
        '...kskssssksk...',
        '...kssskksstk...',
        '...kssssssttk...',
        '....kkkkkkkk....'
      ]
    },
    snail: {
      pal: { k: '#1d2a4a', b: '#4aa3ff', l: '#a8dcff', c: '#ffe0a8' },
      rows: [
        '.....kkkk.......',
        '...kkbbbbkk.....',
        '..kbblllbbbk....',
        '.kbblkkklbbk.k.k',
        '.kblkbbbklbk.k.k',
        '.kblkbkbklbk.k.k',
        '.kbblkklbbbk.kk.',
        '.kbbbllbbbkkcck.',
        'kccckkkkkkccccck',
        'kcccccccccccccck',
        '.kkkkkkkkkkkkkk.'
      ]
    },
    hero: {
      pal: {
        k: '#2b1b17', c: '#5a6cff', C: '#3a44c8', p: '#ffffff', w: '#ffffff',
        h: '#6b3b1f', s: '#ffd9b8', S: '#f0b48c', r: '#ff8fa0', j: '#ffb14a', J: '#e07f1a'
      },
      rows: [
        '...........kkk..',
        '.....kkkk.kpppk.',
        '....kccccckpppk.',
        '...kccccccCkkk..',
        '..kccccccccCk...',
        '.kwwwwwwwwwwwk..',
        '.khhhhhhhhhhhk..',
        '.khhssssssshhk..',
        '.khssssssssshk..',
        '.ksskkssskkssk..',
        '.ksrrsskssrrsk..',
        '..kSSsssssSSk...',
        '...kkkkkkkkk....',
        '...kjjjwjjjk....',
        '..kjjjjwjjjjk...',
        '.ksjjjjwjjjjsk..',
        '.kssjjjwjjjssk..',
        '..kkJJJJJJJkk...',
        '...kJJk.kJJk....',
        '...kkkk.kkkk....'
      ]
    },
    house: {
      pal: {
        k: '#4a2412', r: '#e8453c', R: '#b82e2a', w: '#fff3e0', s: '#fff0d0',
        t: '#e6c79a', d: '#8a4b22', y: '#ffd23f', b: '#7fd0ff'
      },
      rows: [
        '......kkkkkkkk......',
        '....kkrrrrwwrrkk....',
        '...krrwwrrwwrrrrk...',
        '..krrrwwrrrrrrwwrk..',
        '.krrrrrrrrrwwrrwwrk.',
        '.krwwrrrrrrwwrrrrrk.',
        'krrwwrrrrrrrrrrrrrrk',
        'kRRRRRRRRRRRRRRRRRRk',
        '.kkkkkkkkkkkkkkkkkk.',
        '...kssssssssssssk...',
        '...kskkkssssssssk...',
        '...kskbkssssssssk...',
        '...kskkkssssssssk...',
        '...ksssssskkkkkkk...',
        '...ksssssskddddkk...',
        '...ksssssskddydkk...',
        '...ktttttkkddddkk...',
        '..kkkkkkkkkkkkkkkk..'
      ]
    },
    meso: {
      pal: { k: '#6b3d0a', y: '#ffd23f', w: '#fff7c2', o: '#d9901a' },
      rows: [
        '..kkkk..',
        '.kyyyyk.',
        'kywyyyok',
        'kywyyyok',
        'kyyyyyok',
        'kyyyyook',
        '.kooook.',
        '..kkkk..'
      ]
    },
    bulb: {
      pal: { k: '#5a3a00', y: '#ffe14d', o: '#e3a21a', w: '#fffbe0', g: '#9aa6b2' },
      rows: [
        '..kkkk..',
        '.kyyyyk.',
        'kywyyyyk',
        'kywyyyyk',
        'kyyyyyyk',
        'kyyyyyok',
        '.kyyyok.',
        '..kook..',
        '..kggk..',
        '..kggk..',
        '...kk...'
      ]
    },
    star: {
      pal: { k: '#7a4a00', y: '#ffd23f', w: '#fffbe0', o: '#e3a21a' },
      rows: [
        '.....k.....',
        '....kyk....',
        '....kyk....',
        'kkkkywykkkk',
        'kyyyywyyyyk',
        '.kyyyyyyyk.',
        '..kyyyyyk..',
        '..kyyoyyk..',
        '.kyyokoyyk.',
        '.kyok.koyk.',
        '.kkk...kkk.'
      ]
    },
    sword: {
      pal: { k: '#22223a', w: '#f0f6ff', g: '#9fb3c8', y: '#ffd23f', b: '#7a4520' },
      rows: [
        '..........kk',
        '.........kwk',
        '........kwgk',
        '.......kwgk.',
        '......kwgk..',
        '.kk..kwgk...',
        '..kykwgk....',
        '...kyyk.....',
        '...kbyyk....',
        '..kbk.kyk...',
        '.kbk...kk...',
        'kkk.........'
      ]
    },
    fish: {
      pal: { k: '#1d2a4a', b: '#4aa3ff', l: '#c8ecff' },
      rows: [
        '............',
        '............',
        '....kkkkk...',
        '..kkbbbbbk.k',
        '.kbkbbbbbbkk',
        'kbbbbbbbbbbk',
        'kllllllbbbkk',
        '.kllllllbk.k',
        '..kkkkkkk...',
        '............'
      ]
    },
    potion: {
      pal: { k: '#3b1010', c: '#a86a3a', w: '#ffe0e0', r: '#ff3b3b', R: '#b81c1c' },
      rows: [
        '....kkkk....',
        '....kcck....',
        '....kcck....',
        '...kkkkkk...',
        '....kwrk....',
        '...kwrrrk...',
        '..kwrrrrrk..',
        '.kwrrrrrrrk.',
        '.krrrrrrrRk.',
        '.krrrrrrRRk.',
        '..kRRRRRRk..',
        '...kkkkkk...'
      ]
    },
    gift: {
      pal: { k: '#3b1030', y: '#ffd23f', p: '#ff5fa0', P: '#d23c7c' },
      rows: [
        '..kk....kk..',
        '.kyyk..kyyk.',
        '..kyykkyyk..',
        'kkkkkkkkkkkk',
        'kppppyyppppk',
        'kPPPPyyPPPPk',
        'kkkkkkkkkkkk',
        '.kpppyypppk.',
        '.kpppyypppk.',
        '.kpppyypppk.',
        '.kPPPyyPPPk.',
        '.kkkkkkkkkk.'
      ]
    },
    moon: {
      pal: { k: '#3a3000', y: '#ffe680', w: '#ffffff' },
      rows: [
        '...kkkk.....',
        '.kkyyyk.....',
        '.kyyyk......',
        'kyyyk.......',
        'kyyk......w.',
        'kyyk.....www',
        'kyyyk.....w.',
        'kyyyyk......',
        '.kyyyyykkkk.',
        '..kkyyyyyk..',
        '....kkkkk...',
        '............'
      ]
    },
    cursor: {
      pal: { k: '#2b1b17', w: '#ffffff', g: '#ffb14a' },
      rows: [
        '..kk........',
        '.kwwk.......',
        '.kwwk.......',
        '.kwwk.......',
        '.kwwkkk.....',
        '.kwwkwwkkk..',
        'kkwwkwwkwwk.',
        'kwkwwwwwwwwk',
        'kwwwwwwwwwwk',
        'kwwwwwwwwwwk',
        '.kwwwwwwwwk.',
        '..kwwwwwwk..',
        '...kggggk...',
        '...kkkkkk...'
      ]
    },
    ground: {
      pal: {
        g: '#7ee04f', L: '#b6f57a', G: '#3fa83a', N: '#2a7a2e',
        d: '#b8743c', D: '#8e5326', e: '#d08a4a'
      },
      rows: [
        'gggggggggggggggg',
        'gLggggLgggggLggg',
        'GGgGGGgGGGGgGGGg',
        'GGGGGGGGGGGGGGGG',
        'NNdNNNdNNdNNNdNN',
        'dNdddNdddddNdddd',
        'dddddDddddddddDd',
        'ddeddddddDDddddd',
        'dddddddddddddedd',
        'dDdddddeddddDddd',
        'dddddddddddddddd',
        'ddddDDddddeddddd',
        'deddddddddddDddd',
        'dddddddDdddddddd',
        'ddDddddddeddddDd',
        'dddddddddddddddd'
      ]
    },
    cloud: {
      pal: { w: '#ffffff', b: '#d8ecff' },
      rows: [
        '..........wwwww.........',
        '.......wwwwwwwwww.......',
        '.....wwwwwwwwwwwwww.ww..',
        '..wwwwwwwwwwwwwwwwwwwwww',
        '.wwwwwwwwwwwwwwwwwwwwwww',
        'wwwwwwwwwwwwwwwwwwwwwwww',
        'bbwwwwwwwwwwwwwwwwwwwwbb',
        '.bbbbbwwwwbbbbwwwbbbbbb.',
        '...bbbbbbbbbbbbbbbbbb...'
      ]
    },
    smallLeaf: {
      pal: { r: '#e8322c', d: '#9c1a16' },
      rows: [
        '...r...',
        '.r.r.r.',
        '.rrrrr.',
        'rrrrrrr',
        '.rrrrr.',
        '..rdr..',
        '...d...'
      ]
    }
  };

  /* 把字符画画到 canvas 上；pal 可覆盖颜色（用来做不同颜色的枫叶） */
  function drawSprite(name, scale, palOverride) {
    var def = SPRITES[name];
    var w = def.rows[0].length, h = def.rows.length;
    var c = document.createElement('canvas');
    c.width = w * scale;
    c.height = h * scale;
    var g = c.getContext('2d');
    var pal = palOverride || def.pal;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var col = pal[def.rows[y].charAt(x)];
        if (!col) continue;
        g.fillStyle = col;
        g.fillRect(x * scale, y * scale, scale, scale);
      }
    }
    return c;
  }

  var urlCache = {};
  function spriteURL(name, scale) {
    var key = name + '@' + scale;
    if (!urlCache[key]) urlCache[key] = drawSprite(name, scale).toDataURL();
    return urlCache[key];
  }

  function spriteImg(name, scale) {
    var def = SPRITES[name];
    var img = new Image();
    img.src = spriteURL(name, scale);
    img.width = def.rows[0].length * scale;
    img.height = def.rows.length * scale;
    img.alt = '';
    img.draggable = false;
    return img;
  }

  /* 填充页面上所有 <img data-sprite> */
  document.querySelectorAll('img[data-sprite]').forEach(function (img) {
    var name = img.getAttribute('data-sprite');
    var def = SPRITES[name];
    if (!def) return;
    var scale = parseInt(img.getAttribute('data-scale'), 10) || 4;
    img.src = spriteURL(name, scale);
    img.width = def.rows[0].length * scale;
    img.height = def.rows.length * scale;
    img.draggable = false;
  });

  var pxUnit = window.innerWidth <= 640 ? 3 : 4;
  root.style.setProperty('--tile-ground', 'url(' + spriteURL('ground', pxUnit) + ')');

  /* 像素手套鼠标（仅精确指针设备） */
  if (finePointer) {
    root.style.setProperty('--cursor', 'url(' + spriteURL('cursor', 2) + ') 4 0');
    document.body.classList.add('has-cursor');
  }

  /* ======================================================================
     小工具
     ====================================================================== */
  var fx = document.getElementById('fx');

  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }

  function spawn(cls, x, y, text, life) {
    if (!fx) return null;
    var el = document.createElement('div');
    el.className = cls;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    if (text != null) el.textContent = text;
    fx.appendChild(el);
    setTimeout(function () { el.remove(); }, life || 1200);
    return el;
  }

  function sparks(x, y, n, colors) {
    if (reduceMotion) return;
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i) / n + rand(-.2, .2);
      var d = rand(40, 120);
      var s = spawn('spark', x, y, null, 1000);
      s.style.setProperty('--dx', Math.round(Math.cos(a) * d) + 'px');
      s.style.setProperty('--dy', Math.round(Math.sin(a) * d) + 'px');
      s.style.setProperty('--c', colors[i % colors.length]);
    }
  }

  function toast(msg) {
    var t = spawn('toast', 0, 0, msg, 2500);
    if (t) { t.style.left = ''; t.style.top = ''; }
  }

  /* ======================================================================
     页脚年份
     ====================================================================== */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ======================================================================
     HUD：等级 / 经验 / 金币
     滚动到没看过的位置 + 打怪 + 完成任务都会涨经验，满 100% 升级
     ====================================================================== */
  var hudLv = document.getElementById('hudLv');
  var expFill = document.getElementById('expFill');
  var expText = document.getElementById('expText');
  var mesoEl = document.getElementById('meso');
  var state = { lv: 1, exp: 0, meso: 0, maxScroll: 0 };

  function renderHud() {
    if (hudLv) hudLv.textContent = state.lv;
    if (expFill) expFill.style.setProperty('--v', state.exp.toFixed(2) + '%');
    if (expText) expText.textContent = state.exp.toFixed(2) + '%';
    if (mesoEl) mesoEl.textContent = state.meso;
  }

  function levelUp() {
    state.lv++;
    if (hudLv) {
      var box = hudLv.parentNode;
      box.classList.remove('up');
      void box.offsetWidth;
      box.classList.add('up');
    }
    var el = spawn('levelup', 0, 0, null, 2300);
    if (el) {
      el.style.left = '';
      el.style.top = '';
      el.innerHTML = '<b>LEVEL UP!</b><span>等级提升至 Lv.' + state.lv + '</span>';
    }
    sparks(window.innerWidth / 2, window.innerHeight * .4, 28,
      ['#ffd23f', '#ff8b1a', '#e8322c', '#fff6a0', '#7fd0ff']);
  }

  function gainExp(n) {
    state.exp += n;
    while (state.exp >= 100) {
      state.exp -= 100;
      levelUp();
    }
    renderHud();
  }

  renderHud();

  /* ======================================================================
     平滑滚动（锚点 / 按钮）
     ====================================================================== */
  function scrollToSel(sel, instant) {
    var target = document.querySelector(sel);
    if (!target) return false;
    target.scrollIntoView({ behavior: reduceMotion || instant ? 'auto' : 'smooth', block: 'start' });
    if (sel === '#join') {
      var q = document.getElementById('questWin');
      if (q) {
        q.classList.remove('flash');
        setTimeout(function () { q.classList.add('flash'); }, reduceMotion ? 0 : 600);
      }
    }
    return true;
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var sel = el.getAttribute('href');
      if (sel.length < 2) return;
      if (scrollToSel(sel)) e.preventDefault();
    });
  });

  /* ======================================================================
     窗口弹出 + 进入视口时的一次性动画
     ====================================================================== */
  var pops = document.querySelectorAll('.pop');
  var onceHandlers = [];

  function onceVisible(el, fn) { onceHandlers.push({ el: el, fn: fn }); }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    pops.forEach(function (el) { el.classList.add('in'); });
  } else {
    var popIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        popIO.unobserve(entry.target);
      });
    }, { threshold: .15 });
    pops.forEach(function (el) { popIO.observe(el); });
  }

  /* ======================================================================
     NPC 对话：逐字打出 + 翻页
     ====================================================================== */
  var npcText = document.getElementById('npcText');
  var npcNext = document.getElementById('npcNext');
  var npcEnd = document.getElementById('npcEnd');
  if (npcText && npcNext) {
    var pages = [].map.call(npcText.querySelectorAll('p'), function (p) { return p.textContent; });
    var page = 0, typing = null, full = '';

    var type = function (i) {
      clearInterval(typing);
      full = pages[i];
      npcText.innerHTML = '<p></p>';
      var p = npcText.firstChild;
      var n = 0;
      if (reduceMotion) {
        p.textContent = full;
        return;
      }
      var caret = document.createElement('span');
      caret.className = 'caret';
      typing = setInterval(function () {
        n++;
        p.textContent = full.slice(0, n);
        p.appendChild(caret);
        if (n >= full.length) { clearInterval(typing); typing = null; }
      }, 45);
    };

    var updateBtn = function () {
      npcNext.textContent = page < pages.length - 1 ? '下一步 ▶' : '接受任务 ▶';
    };

    var skipOrNext = function () {
      if (typing) {
        clearInterval(typing);
        typing = null;
        npcText.firstChild.textContent = full;
        return;
      }
      if (page < pages.length - 1) {
        page++;
        type(page);
        updateBtn();
      } else {
        scrollToSel('#join');
      }
    };

    npcNext.addEventListener('click', skipOrNext);
    npcText.addEventListener('click', function () { if (typing) skipOrNext(); });
    if (npcEnd) {
      npcEnd.addEventListener('click', function () {
        page = 0;
        type(0);
        updateBtn();
        toast('瞌睡虫：别走啊……二维码就在下面！');
      });
    }

    onceVisible(npcText, function () { type(0); updateBtn(); });
  }

  /* ======================================================================
     家族资料：数值滚动
     ====================================================================== */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var to = parseInt(el.getAttribute('data-count'), 10);
    if (reduceMotion) return;
    el.textContent = '0';
    onceVisible(el, function () {
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var k = Math.min((ts - start) / 1200, 1);
        el.textContent = Math.round(to * k * (2 - k));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });

  /* ======================================================================
     技能窗：等级条加载 + 加点按钮
     ====================================================================== */
  document.querySelectorAll('.skill').forEach(function (sk, idx) {
    var lv = sk.querySelector('.lv');
    var bar = sk.querySelector('.sk-bar i');
    var max = parseInt(lv.getAttribute('data-max'), 10);
    if (!reduceMotion) {
      lv.textContent = 'Lv.0';
      bar.style.setProperty('--fill', '0%');
      onceVisible(sk, function () {
        var n = 0;
        setTimeout(function () {
          var t = setInterval(function () {
            n++;
            lv.textContent = n >= max ? 'Lv.MAX' : 'Lv.' + n;
            bar.style.setProperty('--fill', (n / max * 100) + '%');
            if (n >= max) clearInterval(t);
          }, 900 / max);
        }, idx * 120);
      });
    } else {
      lv.textContent = 'Lv.MAX';
    }
    var plus = sk.querySelector('.sk-plus');
    if (plus) {
      plus.addEventListener('click', function () {
        var r = plus.getBoundingClientRect();
        spawn('dmg gain', r.left + r.width / 2, r.top - 10, 'SP 不足', 1000);
        toast('技能已满级～ 进群攒点经验再来吧');
      });
    }
  });

  /* 统一的“首次进入视口”观察器 */
  if (onceHandlers.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      onceHandlers.forEach(function (h) { h.fn(); });
    } else {
      var onceIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          onceHandlers.forEach(function (h) {
            if (h.el === entry.target && !h.done) { h.done = true; h.fn(); }
          });
          onceIO.unobserve(entry.target);
        });
      }, { threshold: .4 });
      onceHandlers.forEach(function (h) { onceIO.observe(h.el); });
    }
  }

  /* ======================================================================
     任务目标：可点击打勾，全部完成 → 任务完成 + 经验
     ====================================================================== */
  var goals = document.querySelectorAll('#qGoals button');
  var qCount = document.getElementById('qCount');
  var questDone = false;
  goals.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      var done = document.querySelectorAll('#qGoals [aria-pressed="true"]').length;
      if (qCount) qCount.textContent = done + '/' + goals.length;
      if (on) {
        var r = btn.getBoundingClientRect();
        spawn('dmg gain', r.left + 30, r.top, '✓', 900);
      }
      if (done === goals.length && !questDone) {
        questDone = true;
        toast('任务完成！欢迎回家，冒险家 🍁');
        gainExp(100);
      }
    });
  });

  /* ======================================================================
     二维码灯箱
     ====================================================================== */
  var box = document.getElementById('lightbox');
  var qrFrame = document.getElementById('qrFrame');
  if (box && qrFrame) {
    var openBox = function () { box.classList.add('show'); };
    var closeBox = function () { box.classList.remove('show'); };
    qrFrame.addEventListener('click', openBox);
    qrFrame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBox(); }
    });
    box.addEventListener('click', function (e) { if (e.target !== box.querySelector('img')) closeBox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });
  }

  /* ======================================================================
     HERO 小怪：来回走，点击掉血、出伤害数字、爆金币
     ====================================================================== */
  var mobsEl = document.getElementById('mobs');
  var mobs = [];
  var sceneVisible = true;

  function makeMob(kind, x) {
    var el = document.createElement('div');
    el.className = 'mob ' + kind;
    var body = document.createElement('span');
    body.className = 'body';
    body.appendChild(spriteImg(kind, pxUnit));
    var hp = document.createElement('div');
    hp.className = 'hpbar';
    hp.appendChild(document.createElement('i'));
    el.appendChild(hp);
    el.appendChild(body);
    mobsEl.appendChild(el);
    var m = {
      el: el,
      kind: kind,
      x: x,
      w: SPRITES[kind].rows[0].length * pxUnit,
      dir: Math.random() < .5 ? -1 : 1,
      speed: kind === 'snail' ? rand(.15, .3) : rand(.4, .8),
      hp: kind === 'snail' ? 2 : 3,
      maxHp: kind === 'snail' ? 2 : 3,
      dead: false,
      turnAt: performance.now() + rand(2000, 6000)
    };
    el.addEventListener('pointerdown', function (e) { e.preventDefault(); hitMob(m); });
    placeMob(m);
    return m;
  }

  function placeMob(m) {
    m.el.style.transform = 'translateX(' + Math.round(m.x) + 'px)';
    // 蜗牛素材脸朝右，蘑菇对称；往左走时翻转
    m.el.classList.toggle('flip', m.kind === 'snail' ? m.dir < 0 : m.dir > 0);
  }

  function hitMob(m) {
    if (m.dead) return;
    var r = m.el.getBoundingClientRect();
    var crit = Math.random() < .25;
    var dmg = crit ? randInt(30000, 99999) : randInt(800, 9999);
    spawn('dmg' + (crit ? ' crit' : ''), r.left + r.width / 2, r.top - 10, dmg, 1100);
    m.hp -= crit ? 2 : 1;
    m.el.classList.add('hit', 'hurt');
    m.el.style.setProperty('--hp', Math.max(m.hp, 0) / m.maxHp * 100 + '%');
    setTimeout(function () { m.el.classList.remove('hit'); }, 120);
    // 被打会转身逃跑
    m.dir = r.left + r.width / 2 > window.innerWidth / 2 ? 1 : -1;
    if (m.hp <= 0) killMob(m, r);
  }

  function killMob(m, r) {
    m.dead = true;
    m.el.classList.add('dead');
    var cx = r.left + r.width / 2, cy = r.bottom - 24;
    var n = randInt(2, 4), total = 0;
    for (var i = 0; i < n; i++) {
      var amount = randInt(5, 30);
      total += amount;
      var c = document.createElement('img');
      c.src = spriteURL('meso', 3);
      c.className = 'coin';
      c.style.left = (cx - 12) + 'px';
      c.style.top = cy + 'px';
      c.style.setProperty('--dx', randInt(-40, 40) + 'px');
      fx.appendChild(c);
      setTimeout(c.remove.bind(c), 950);
    }
    sparks(cx, r.top + r.height / 2, 10, ['#ffd23f', '#ffffff', '#ff8b1a']);
    setTimeout(function () {
      state.meso += total;
      spawn('dmg gain', cx, cy - 40, '+' + total + ' 金币', 1000);
      var mesoBox = mesoEl && mesoEl.parentNode;
      if (mesoBox) {
        mesoBox.classList.remove('got');
        void mesoBox.offsetWidth;
        mesoBox.classList.add('got');
      }
      gainExp(m.kind === 'snail' ? 18 : 26);
    }, 650);
    setTimeout(function () {
      // 从屏幕边缘重生
      m.el.remove();
      var idx = mobs.indexOf(m);
      var fromLeft = Math.random() < .5;
      var nm = makeMob(m.kind, fromLeft ? -m.w : mobsEl.clientWidth);
      nm.dir = fromLeft ? 1 : -1;
      mobs[idx] = nm;
    }, 1800);
  }

  if (mobsEl) {
    var W0 = mobsEl.clientWidth;
    var plan = W0 < 640
      ? ['mushroom', 'snail', 'mushroom']
      : ['mushroom', 'snail', 'mushroom', 'mushroom', 'snail'];
    plan.forEach(function (k, i) {
      mobs.push(makeMob(k, (W0 / plan.length) * (i + .3) + rand(-30, 30)));
    });

    var heroEl = document.querySelector('.hero');
    if ('IntersectionObserver' in window && heroEl) {
      new IntersectionObserver(function (es) { sceneVisible = es[0].isIntersecting; }).observe(heroEl);
    }

    if (!reduceMotion) {
      var walk = function (now) {
        if (sceneVisible && !document.hidden) {
          var W = mobsEl.clientWidth;
          mobs.forEach(function (m) {
            if (m.dead) return;
            m.x += m.dir * m.speed;
            if (m.x < 0) { m.x = 0; m.dir = 1; }
            if (m.x > W - m.w) { m.x = W - m.w; m.dir = -1; }
            if (now > m.turnAt) {
              m.dir = -m.dir;
              m.turnAt = now + rand(2500, 7000);
            }
            placeMob(m);
          });
        }
        requestAnimationFrame(walk);
      };
      requestAnimationFrame(walk);
    }
  }

  /* ======================================================================
     传送门：小画布逐像素画旋涡；点它或在可见时按 ↑ 键传送到二维码
     ====================================================================== */
  var portalBtn = document.getElementById('portal');
  var pc = document.getElementById('portalCanvas');
  var portalVisible = false;

  function warpTo(sel) {
    if (!reduceMotion) spawn('warp', 0, 0, null, 800);
    setTimeout(function () { scrollToSel(sel, true); }, reduceMotion ? 0 : 280);
  }

  if (portalBtn && pc) {
    var pg = pc.getContext('2d');
    var PW = pc.width, PH = pc.height;
    var parts = [];
    for (var i = 0; i < 70; i++) {
      parts.push({ a: rand(0, Math.PI * 2), r: rand(.35, 1), v: rand(.02, .05), c: randInt(0, 3) });
    }
    var pcols = ['#ffffff', '#9ff3ff', '#4ad0ff', '#3a6cff'];

    var drawPortal = function (t) {
      pg.clearRect(0, 0, PW, PH);
      var cx = PW / 2, cy = PH / 2 + 4;
      // 底部光柱
      for (var y = 0; y < PH; y++) {
        var k = y / PH;
        pg.fillStyle = 'rgba(120,220,255,' + (k * .35).toFixed(2) + ')';
        pg.fillRect(cx - 7, y, 14, 1);
      }
      // 外圈椭圆
      for (var j = 0; j < 60; j++) {
        var a = j / 60 * Math.PI * 2 + t * .0015;
        var x = Math.round(cx + Math.cos(a) * 12);
        var yy = Math.round(cy + Math.sin(a) * 19);
        pg.fillStyle = j % 3 === 0 ? '#ffffff' : '#4ad0ff';
        pg.fillRect(x, yy, 1, 1);
      }
      // 旋转粒子
      parts.forEach(function (p) {
        if (!reduceMotion) p.a += p.v;
        var x = Math.round(cx + Math.cos(p.a) * 11 * p.r);
        var y = Math.round(cy + Math.sin(p.a) * 18 * p.r);
        pg.fillStyle = pcols[p.c];
        pg.fillRect(x, y, 1, 1);
      });
      // 中心亮点
      pg.fillStyle = '#ffffff';
      pg.fillRect(cx - 1, cy - 2, 2, 4);
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { portalVisible = es[0].isIntersecting; }).observe(portalBtn);
    }

    var loopPortal = function (t) {
      if (portalVisible && !document.hidden) drawPortal(t);
      requestAnimationFrame(loopPortal);
    };
    drawPortal(0);
    if (!reduceMotion) requestAnimationFrame(loopPortal);

    portalBtn.addEventListener('click', function () { warpTo('#join'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' && portalVisible) {
        e.preventDefault();
        warpTo('#join');
      }
    });
  }

  /* ======================================================================
     全局像素天空：低分辨率 canvas 放大显示，天然像素颗粒
     白天(0) → 黄昏(.5) → 深夜(.85+)，跟随页面滚动进度
     ====================================================================== */
  var sky = document.getElementById('sky');
  if (!sky || !sky.getContext) return;
  var sg = sky.getContext('2d');
  if (!sg) return;

  var SKY_KEYS = [
    { t: 0,   top: [74, 168, 255],  bot: [191, 233, 255], hill1: [127, 214, 145], hill2: [86, 178, 112] },
    { t: .45, top: [92, 86, 214],   bot: [255, 168, 112], hill1: [160, 120, 170], hill2: [110, 80, 140] },
    { t: .8,  top: [14, 14, 48],    bot: [48, 40, 110],   hill1: [40, 48, 100],   hill2: [26, 32, 72] },
    { t: 1,   top: [8, 8, 30],      bot: [36, 30, 90],    hill1: [34, 40, 86],    hill2: [22, 26, 60] }
  ];

  function lerp(a, b, k) { return a + (b - a) * k; }
  function mix(c1, c2, k) {
    return [Math.round(lerp(c1[0], c2[0], k)), Math.round(lerp(c1[1], c2[1], k)), Math.round(lerp(c1[2], c2[2], k))];
  }
  function rgb(c) { return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')'; }
  function skyAt(t) {
    for (var i = 0; i < SKY_KEYS.length - 1; i++) {
      var a = SKY_KEYS[i], b = SKY_KEYS[i + 1];
      if (t <= b.t) {
        var k = (t - a.t) / (b.t - a.t);
        return {
          top: mix(a.top, b.top, k), bot: mix(a.bot, b.bot, k),
          hill1: mix(a.hill1, b.hill1, k), hill2: mix(a.hill2, b.hill2, k)
        };
      }
    }
    return SKY_KEYS[SKY_KEYS.length - 1];
  }

  var SW = 0, SH = 0, PX = 4;
  var stars = [], clouds = [], leaves = [], hills1 = [], hills2 = [];
  var cloudImg = drawSprite('cloud', 1);
  var LEAF_COLORS = [
    { r: '#e8322c', d: '#9c1a16' },
    { r: '#ff8b1a', d: '#b4560c' },
    { r: '#ffc21f', d: '#b8860b' }
  ];
  // 每种颜色预渲染 4 个 90° 旋转帧，保持像素对齐
  var leafFrames = LEAF_COLORS.map(function (pal) {
    var base = drawSprite('smallLeaf', 1, pal);
    var frames = [];
    for (var r = 0; r < 4; r++) {
      var c = document.createElement('canvas');
      c.width = base.width;
      c.height = base.height;
      var g = c.getContext('2d');
      g.translate(c.width / 2, c.height / 2);
      g.rotate(r * Math.PI / 2);
      g.drawImage(base, -base.width / 2, -base.height / 2);
      frames.push(c);
    }
    return frames;
  });

  function makeHills(baseFrac, amp, step) {
    var arr = [];
    var h = 0, target = 0;
    for (var x = 0; x < SW; x += step) {
      if (Math.random() < .3) target = rand(-amp, amp);
      h += Math.sign(target - h) * Math.min(Math.abs(target - h), 1);
      arr.push(Math.round(SH * baseFrac + h));
    }
    return arr;
  }

  function buildSky() {
    PX = window.innerWidth <= 640 ? 3 : 4;
    SW = Math.ceil(window.innerWidth / PX);
    SH = Math.ceil(window.innerHeight / PX);
    sky.width = SW;
    sky.height = SH;

    stars = [];
    var ns = Math.round(SW * SH / 260);
    for (var i = 0; i < ns; i++) {
      stars.push({ x: randInt(0, SW), y: randInt(0, Math.round(SH * .75)), p: rand(0, 6.28), s: rand(.01, .04), big: Math.random() < .12 });
    }

    clouds = [];
    var nc = Math.max(3, Math.round(SW / 70));
    for (var j = 0; j < nc; j++) {
      clouds.push({ x: rand(-30, SW), y: randInt(6, Math.round(SH * .45)), v: rand(.04, .12) });
    }

    leaves = [];
    var nl = window.innerWidth < 720 ? 10 : 18;
    for (var k = 0; k < nl; k++) leaves.push(newLeaf(true));

    hills1 = makeHills(.80, 10, 2);
    hills2 = makeHills(.88, 6, 2);
  }

  function newLeaf(anywhere) {
    return {
      x: rand(0, SW),
      y: anywhere ? rand(-SH, SH) : rand(-20, -8),
      vy: rand(.12, .28),
      sway: rand(0, 6.28),
      sw: rand(.01, .025),
      col: randInt(0, 2),
      rot: randInt(0, 3),
      rt: randInt(30, 70),
      f: 0
    };
  }

  var progress = 0, shown = 0;
  function readScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    // 首次滚到新位置才给经验；整页滚完共 120%，看到底刚好升一级
    if (progress > state.maxScroll + .005 || (progress === 1 && state.maxScroll < 1)) {
      gainExp((progress - state.maxScroll) * 120);
      state.maxScroll = progress;
    }
  }

  function drawSky(now) {
    shown += (progress - shown) * (reduceMotion ? 1 : .08);
    var t = shown;
    var c = skyAt(t);
    var night = Math.min(Math.max((t - .4) / .4, 0), 1);

    // 分段色带 + 棋盘格抖动过渡，做出老游戏的渐变质感
    var bands = 14;
    var bh = Math.ceil(SH / bands);
    for (var b = 0; b < bands; b++) {
      var col = mix(c.top, c.bot, b / (bands - 1));
      sg.fillStyle = rgb(col);
      sg.fillRect(0, b * bh, SW, bh);
      if (b > 0) {
        var prev = rgb(mix(c.top, c.bot, (b - 1) / (bands - 1)));
        sg.fillStyle = prev;
        for (var dx = 0; dx < SW; dx += 2) sg.fillRect(dx, b * bh, 1, 1);
      }
    }

    // 星星
    if (night > 0) {
      stars.forEach(function (s) {
        if (!reduceMotion) s.p += s.s;
        var a = night * (.55 + .45 * Math.sin(s.p));
        if (a < .1) return;
        sg.globalAlpha = a;
        sg.fillStyle = '#fff';
        sg.fillRect(s.x, s.y, 1, 1);
        if (s.big && a > .6) {
          sg.globalAlpha = a * .5;
          sg.fillRect(s.x - 1, s.y, 3, 1);
          sg.fillRect(s.x, s.y - 1, 1, 3);
        }
      });
      sg.globalAlpha = 1;
    }

    // 太阳下山、月亮升起
    var sunY = Math.round(lerp(SH * .14, SH * .9, Math.min(t / .55, 1)));
    if (t < .6) pixelDisc(Math.round(SW * .82), sunY, 7, '#fff3a0', '#ffd23f');
    var moonY = Math.round(lerp(SH * .9, SH * .16, Math.min(Math.max((t - .45) / .4, 0), 1)));
    if (t > .45) {
      pixelDisc(Math.round(SW * .18), moonY, 6, '#fffbe6', '#e8e2c0');
      pixelDisc(Math.round(SW * .18) + 3, moonY - 2, 5, rgb(mix(c.top, c.bot, .3)), null);
    }

    // 云
    sg.globalAlpha = 1 - night * .75;
    clouds.forEach(function (cl) {
      if (!reduceMotion) cl.x += cl.v;
      if (cl.x > SW + 4) cl.x = -cloudImg.width - rand(0, 40);
      sg.drawImage(cloudImg, Math.round(cl.x), cl.y);
    });
    sg.globalAlpha = 1;

    // 远山（随滚动微微下沉，做一点视差）
    var sink = Math.round(t * 18);
    drawHills(hills1, rgb(c.hill1), sink);
    drawHills(hills2, rgb(c.hill2), Math.round(sink * 1.6));

    // 枫叶
    leaves.forEach(function (l, i) {
      if (!reduceMotion) {
        l.y += l.vy;
        l.sway += l.sw;
        l.x += Math.sin(l.sway) * .25;
        if (++l.f % l.rt === 0) l.rot = (l.rot + 1) % 4;
        if (l.y > SH + 8) leaves[i] = newLeaf(false);
      }
      sg.drawImage(leafFrames[l.col][l.rot], Math.round(l.x), Math.round(l.y));
    });
  }

  function pixelDisc(cx, cy, r, fill, edge) {
    for (var y = -r; y <= r; y++) {
      var w = Math.round(Math.sqrt(r * r - y * y));
      sg.fillStyle = fill;
      sg.fillRect(cx - w, cy + y, w * 2 + 1, 1);
      if (edge) {
        sg.fillStyle = edge;
        sg.fillRect(cx - w, cy + y, 1, 1);
        sg.fillRect(cx + w, cy + y, 1, 1);
      }
    }
  }

  function drawHills(arr, color, offset) {
    sg.fillStyle = color;
    for (var i = 0; i < arr.length; i++) {
      var y = arr[i] + offset;
      sg.fillRect(i * 2, y, 2, SH - y);
    }
  }

  function skyLoop(now) {
    if (!document.hidden) drawSky(now);
    requestAnimationFrame(skyLoop);
  }

  window.addEventListener('scroll', function () {
    readScroll();
    if (reduceMotion) drawSky(0);
  }, { passive: true });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { buildSky(); readScroll(); drawSky(0); }, 150);
  });

  buildSky();
  readScroll();
  shown = progress;
  drawSky(0);
  if (!reduceMotion) requestAnimationFrame(skyLoop);
})();
