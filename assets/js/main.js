/* ==========================================================================
   起床气家族 · 冒险岛家族官网
   assets/js/main.js
   --------------------------------------------------------------------------
   依赖：无。以 defer 方式加载，执行时机在 DOM 解析完成之后。
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 脚本已运行，交还给 CSS 接管淡入动画 */
  document.documentElement.classList.remove('no-js');

  /* ---------------- 页脚年份 ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- 平滑滚动 ---------------- */
  document.querySelectorAll('a[href^="#"], [data-scroll]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var sel = el.getAttribute('data-scroll') || el.getAttribute('href');
      var target = sel ? document.querySelector(sel) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  /* ---------------- 导航滚动态 ---------------- */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---------------- 滚动淡入 ---------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add('in'); }, i * 90);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- 二维码灯箱 ---------------- */
  var box = document.getElementById('lightbox');
  var qrFrame = document.getElementById('qrFrame');
  if (box && qrFrame) {
    var openBox = function () { box.classList.add('show'); };
    var closeBox = function () { box.classList.remove('show'); };

    qrFrame.addEventListener('click', openBox);
    qrFrame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBox();
      }
    });
    box.addEventListener('click', closeBox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeBox();
    });
  }

  /* ---------------- 星空 + 枫叶背景 ---------------- */
  var canvas = document.getElementById('sky');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var stars = [], leaves = [], W = 0, H = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var mouse = { x: 0.5, y: 0.5 };

  function build() {
    var starCount = Math.round((W * H) / 9000);
    stars = [];
    for (var i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.7 + 0.25,
        s: Math.random() * 0.02 + 0.004,
        d: Math.random() * 0.6 + 0.2
      });
    }

    var leafCount = window.innerWidth < 720 ? 12 : 22;
    leaves = [];
    for (var j = 0; j < leafCount; j++) {
      leaves.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        size: Math.random() * 11 + 9,
        vy: Math.random() * 0.55 + 0.35,
        vx: Math.random() * 0.5 - 0.25,
        rot: Math.random() * Math.PI * 2,
        vr: Math.random() * 0.02 - 0.01,
        hue: Math.random() < 0.5 ? '#ff3b52' : (Math.random() < 0.5 ? '#ff9a2b' : '#ffd447'),
        op: Math.random() * 0.5 + 0.35,
        d: Math.random() * 0.8 + 0.3
      });
    }
  }

  function resize() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function drawLeaf(l) {
    ctx.save();
    ctx.translate(l.x, l.y);
    ctx.rotate(l.rot);
    ctx.globalAlpha = l.op;
    ctx.fillStyle = l.hue;
    ctx.shadowColor = l.hue;
    ctx.shadowBlur = 12;
    // 像素枫叶：菱形 + 叶柄
    var s = l.size;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.75, -s * 0.15);
    ctx.lineTo(s * 0.45, s * 0.7);
    ctx.lineTo(0, s);
    ctx.lineTo(-s * 0.45, s * 0.7);
    ctx.lineTo(-s * 0.75, -s * 0.15);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(0,0,0,.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.2);
    ctx.lineTo(0, s * 0.85);
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    var ox = (mouse.x - 0.5) * 26;
    var oy = (mouse.y - 0.5) * 26;

    // 星星（带视差）
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      st.a += st.s;
      var alpha = st.a > 1 ? 1 - (st.a - 1) : st.a;
      if (st.a > 2) st.a = 0;
      ctx.globalAlpha = Math.max(alpha, 0) * 0.9;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(st.x + ox * st.d, st.y + oy * st.d, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 枫叶
    for (var j = 0; j < leaves.length; j++) {
      var l = leaves[j];
      l.y += l.vy;
      l.x += l.vx + Math.sin((l.y + l.rot * 100) / 60) * 0.6;
      l.rot += l.vr;
      if (l.y - l.size > H) {
        l.y = -l.size * 2;
        l.x = Math.random() * W;
      }
      if (l.x < -40) l.x = W + 30;
      if (l.x > W + 40) l.x = -30;
      drawLeaf(l);
    }
  }

  function tick() {
    if (document.hidden) {
      requestAnimationFrame(tick);
      return;
    }
    draw();
    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
  });

  resize();
  if (reduceMotion) {
    // 尊重系统「减少动态效果」偏好：只绘制一帧静态背景
    draw();
  } else {
    tick();
  }
})();
