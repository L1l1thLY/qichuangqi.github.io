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
└── assets
    ├── css/style.css          # 全部样式
    ├── js/main.js             # 全部交互 + 所有像素图（字符画）定义
    ├── fonts
    │   ├── fusion-pixel-12px-subset.woff   # 像素字体子集（自托管）
    │   └── OFL.txt            # 字体许可证
    └── img
        ├── qr.jpg             # 微信群二维码 ← 换群时只需替换这个文件
        ├── favicon.svg / favicon-32.png / apple-touch-icon.png
        └── og-cover.png       # 社交分享预览图 1200×630
```

页面里的蘑菇、蜗牛、冒险家、房子、枫叶、图标等像素图都没有图片文件，全部写在
`main.js` 顶部的 `SPRITES` 里（一个字符一个像素，`.` 为透明），运行时画成图片。

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
| NPC 对话、任务、技能、公约文案 | `index.html` 对应 `<section>` |
| 顶部喇叭滚动文字 | `index.html` 里 `.smega-track`（前三条与后三条保持一致，保证无缝滚动） |
| 配色 | `assets/css/style.css` 顶部 `:root` 变量 |
| 像素图 / 天空颜色 / 枫叶数量 | `assets/js/main.js` 里 `SPRITES`、`SKY_KEYS`、`buildSky()` |
| 分享到聊天软件时的预览图 | 重新截取首屏生成 `assets/img/og-cover.png`（1200×630） |

**改了 CSS / JS / 字体后记得改版本号**：`index.html`、`404.html` 里引用这三个文件时带着 `?v=日期`，`style.css` 里的字体地址也带着。GitHub Pages 会让浏览器缓存静态文件约 10 分钟，不改版本号的话，老访客可能拿到「新 HTML + 旧 CSS/JS」，页面直接错乱。全局替换一次即可，例如把 `?v=20261011` 改成当天日期。只换二维码图片则不需要。

**替换二维码时注意大小写**：文件名必须全小写 `qr.jpg`。GitHub Pages 跑在 Linux 上，文件系统大小写敏感，写成 `QR.jpg` 本地能显示、线上却是裂图。

## 字体

全站使用 [缝合像素字体 Fusion Pixel Font](https://github.com/TakWolf/fusion-pixel-font)（12px 比例宽，简体中文版，SIL OFL 1.1）。
为了国内访问稳定，**不走任何外部 CDN**，而是只截取页面用到的字做成约 34 KB 的子集放在 `assets/fonts/`。

**改文案后如果新出现了没用过的汉字**，那几个字会退回系统字体显示。重新生成子集即可（需要 `pip install fonttools`）：

```bash
# 先从上面的 GitHub 仓库 Releases 下载 12px-proportional 的 ttf 包并解压
python3 - <<'PY'
import string
from fontTools import subset
from fontTools.ttLib import TTFont
text = set(string.printable)
for f in ['index.html', '404.html', 'assets/js/main.js', 'assets/css/style.css']:
    text |= set(open(f, encoding='utf-8').read())
font = TTFont('fusion-pixel-12px-proportional-zh_hans.ttf')
opts = subset.Options(); opts.flavor = 'woff'
sub = subset.Subsetter(opts); sub.populate(text=''.join(text)); sub.subset(font)
font.flavor = 'woff'; font.save('assets/fonts/fusion-pixel-12px-subset.woff')
PY
```

## 页面里的小彩蛋

- 背景天空随滚动从白天 → 黄昏 → 深夜，太阳落下、月亮和星星升起；
- 首屏的蘑菇、蜗牛可以点：出伤害数字、爆金币，右下角金币数会涨；
- 底部状态栏的 EXP 会随“看过的页面”和打怪增长，满了会 LEVEL UP；
- NPC 对话逐字打出，任务目标可以手动打勾，三项都勾上算任务完成；
- 页面最底部的传送门：点它，或在它可见时按键盘 ↑，直接传送到二维码。

## 无障碍与小细节

- 系统开启「减弱动态效果」时，所有动画、天空滚动、小怪走动都会停止，只保留静态画面；
- 标签页切到后台或场景滚出屏幕时暂停对应的 `requestAnimationFrame`，省电；
- 若 JS 被禁用或加载失败，窗口不会停留在透明状态（`<html class="no-js">` 兜底），NPC 对话会直接显示全部文案；
- 二维码图片上没有覆盖任何元素，微信内长按可以正常识别。
