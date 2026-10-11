# 起床气家族 · 官网

[![Pages 状态](https://img.shields.io/badge/site-qichuangqi.icu-ffd447)](https://qichuangqi.icu)

冒险岛（枫之谷）**起床气家族**的招募官网 —— 纯静态站点，由 GitHub Pages 直接从 `main` 分支根目录发布，自定义域名 <https://qichuangqi.icu>。

## 目录结构

```
.
├── index.html                 # 首页（只放结构，样式与脚本全部外链）
├── 404.html                   # 自定义 404（GitHub Pages 会自动使用它）
├── CNAME                      # 自定义域名，勿动
├── .nojekyll                  # 跳过 Jekyll 构建，直接用原文件发布
├── .gitignore
└── assets
    ├── css
    │   └── style.css          # 全部样式（原 index.html 内联 <style> 抽出）
    ├── js
    │   └── main.js            # 全部交互（原 index.html 内联 <script> 抽出）
    └── img
        ├── qr.jpg             # 微信群二维码 ← 换群时只需替换这个文件
        ├── favicon.svg
        ├── favicon-32.png
        ├── apple-touch-icon.png
        └── og-cover.png       # 社交分享预览图 1200×630
```

## 本地预览

不需要任何构建步骤或依赖安装，起一个静态服务器即可：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

> 不要用 `file://` 直接双击打开：本地文件系统协议下部分浏览器会拦 canvas 与资源加载，表现和线上不一致。

## 发布流程

推到 `main` 即发布，GitHub Pages 会自动接管：

```bash
git add .
git commit -m "更新家族信息"
git push origin main
```

自定义域名已在仓库设置里绑定 `CNAME` 文件指向的 `qichuangqi.icu`，**不要删除 `CNAME`**，否则 GitHub 会把域名解绑并回退到 `qichuangqi.github.io`。

## 常见改动

| 想改什么 | 改哪里 |
| --- | --- |
| 微信群二维码（码过期 / 换群） | 替换 `assets/img/qr.jpg` |
| 家族简介、日常、公约文案 | `index.html` 对应 `<section>` |
| 配色 | `assets/css/style.css` 顶部 `:root` 变量 |
| 星星 / 枫叶的数量、速度 | `assets/js/main.js` 里 `build()` 的参数 |
| 分享到聊天软件时的预览图 | 重新生成 `assets/img/og-cover.png`（尺寸需为 1200×630） |

**替换二维码时注意大小写**：文件名必须全小写 `qr.jpg`。GitHub Pages 跑在 Linux 上，文件系统大小写敏感，写成 `QR.jpg` 或 `Qr.jpg` 本地（macOS / Windows）能显示、线上却是裂图。

## 已知取舍：网络字体

页面用 Press Start 2P（像素标题）和 ZCOOL KuaiLe（中文），通过 Google Fonts 加载。**国内网络下 fonts.googleapis.com 通常不可达**，此时会有两种表现：

- 因为有 `display=swap`，文字会立刻用本地字体渲染，**不会白屏、不影响阅读**；
- 代价是标题的像素风会退化成 `PingFang SC` / `微软雅黑`，视觉风格减弱。

`assets/css/style.css` 的 `:root` 里已配好逐级本地回退栈。若要彻底解决，可二选一：

1. **自建镜像** —— 把字体文件放到自己的 CDN，`index.html` 里替换两个 `<link>` 的 host 即可；
2. **完全自托管** —— 字体下载到 `assets/fonts/`，删掉 Google Fonts 的 `<link>`，改用本地 `@font-face`。两个字体均为 SIL OFL 许可，允许自托管再分发。

## 无障碍与小细节

- 系统开启「减弱动态效果」时，CSS 动画与 canvas 星空都会停止滚动（只画一帧静态背景）；
- 页面标签页切到后台时暂停 `requestAnimationFrame`，省电；
- 若 JS 被禁用或加载失败，`.reveal` 元素不会停留在透明状态（`<html class="no-js">` 兜底，脚本启动后移除该 class）。
