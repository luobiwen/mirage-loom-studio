# 幻境织机 Mirage Loom 官网维护说明

这是一个基于 Next.js 的独立游戏工作室官网。日常更新大部分不需要改页面组件，只需要修改 `data/content.ts` 和替换 `public/art` 里的图片。

## 快速开始

```bash
npm install
npm run dev
```

本地预览地址：

```text
http://localhost:3000
```

提交或部署前建议检查：

```bash
npm run typecheck
npm run lint
npm run build
```

## 项目架构

```text
app/
  page.tsx                首页：公告、幻境档案、图鉴、日志、周边、织造师、订阅
  layout.tsx              全站标题、favicon、导航、页脚
  globals.css             全站样式、首页动效、卡片样式、鼠标点击粒子
  about/page.tsx          关于页面
  worlds/page.tsx         幻境档案列表
  worlds/[slug]/page.tsx  单个幻境详情
  codex/page.tsx          图鉴列表
  codex/[slug]/page.tsx   单个图鉴详情
  logs/page.tsx           开发日志列表
  logs/[slug]/page.tsx    单篇日志详情
  artifacts/page.tsx      周边/圣物收藏页
  weavers/page.tsx        织造师页面

components/
  HeroScene.tsx           首页首屏织机、开场动画、背景粒子
  SiteNav.tsx             顶部导航
  ClickSparkles.tsx       鼠标点击粒子特效
  LogoMark.tsx            幻境织机 Logo
  SectionHeader.tsx       通用分区标题
  CardGlyph.tsx           卡片上的符号图形

data/
  content.ts              主要内容数据：公告、幻境、图鉴、日志、周边、织造师

lib/
  routes.ts               导航链接
  utils.ts                工具函数

public/
  favicon.svg             浏览器标签页图标
  art/
    cursor/mouse.png      自定义鼠标图案
    magical-loom/         首页织机图层
    fantasy-weaver/       首页织造师角色图层
    weavers/              织造师头像和造型图，页面优先引用 WebP
```

## 更新文字内容

所有主要文字内容都在：

```text
data/content.ts
```

### 更新首页公告

修改 `announcements` 数组：

```ts
export const announcements = [
  {
    id: "ML-NOTICE-001",
    date: "虚构占位 / 2026.07",
    title: "公告标题",
    text: "公告正文",
    important: true
  }
];
```

说明：

- `id`：公告编号。
- `date`：显示在卡片底部的日期/状态。
- `title`：公告标题。
- `text`：公告正文。
- `important: true`：让公告卡片变大，适合重点公告；普通公告可以不写。

### 更新幻境档案

修改 `worlds` 数组。每个对象对应一个幻境，并自动生成列表页和详情页。

关键字段：

- `slug`：网址路径，只用英文、小写和短横线，例如 `moonwell-station`。
- `title`：中文标题。
- `subtitle`：英文或副标题。
- `status`：开发状态。
- `genre`：类型。
- `tone`：氛围关键词。
- `accent`：卡片强调色。
- `summary`：列表卡片简介。
- `description`：详情页正文。
- `links`：按钮链接。

新增幻境时，复制一个现有对象，改 `slug` 和内容即可。

### 更新图鉴

修改 `codexEntries` 数组。每个对象对应一个图鉴条目。

关键字段：

- `slug`：图鉴详情页路径。
- `worldSlug`：关联哪个幻境，要和 `worlds` 里的 `slug` 一致。
- `title`：图鉴标题。
- `type`：条目类型，例如“遗物”“人物”“场景”。
- `tag`：标签。
- `summary`：列表简介。
- `body`：详情正文。

### 更新开发日志

修改 `logs` 数组。

关键字段：

- `slug`：日志详情页路径。
- `title`：日志标题。
- `date`：日期，建议使用 `YYYY-MM-DD`。
- `category`：分类。
- `excerpt`：列表摘要。
- `readingTime`：阅读时间。
- `author`：作者。
- `worldSlug`：关联幻境。
- `body`：日志正文。

### 更新周边/圣物收藏

修改 `artifacts` 数组。

关键字段：

- `slug`：周边编号。
- `name`：周边名称。
- `sourceWorld`：来源幻境。
- `status`：状态。
- `price`：价格或占位文字。
- `description`：描述。

目前周边卡片主要是文字和图形符号。如果以后要给每个周边加图片，可以在 `Artifact` 类型里新增 `image?: string`，然后在 `app/page.tsx` 和 `app/artifacts/page.tsx` 里渲染图片。

### 更新织造师

修改 `weavers` 数组。

关键字段：

- `slug`：成员路径/编号。
- `name`：名字。
- `title`：身份标题。
- `image`：头像路径。
- `sideImage`：旁边展示的大图路径，可选。
- `duties`：技能列表；如果不想显示列表，写成 `[]`。
- `interests`：底部小字介绍。
- `bio`：主要简介。

例子：

```ts
{
  slug: "first-weaver-b",
  name: "bb",
  title: "创始织造师",
  image: "/art/weavers/bb.webp",
  sideImage: "/art/weavers/bbq-cutout-v2.webp",
  duties: [],
  interests: "喜欢把遥远、模糊、神秘的幻境整理成可以被触碰的真实作品。",
  bio: "罗碧文，2026 年毕业于中山大学软件工程。幻境织机创造者，一个神秘的魔法师，擅长幻境织造，程序织造，魔法系统调试。"
}
```

## 更新图片素材

所有网站可访问图片都放在：

```text
public/art/
```

在代码里引用时，路径从 `/art/...` 开始。例如：

```ts
image: "/art/weavers/bb.webp"
sideImage: "/art/weavers/bbq-cutout-v2.webp"
```

### 替换织造师图片

推荐位置：

```text
public/art/weavers/
```

常用文件：

- `bb.webp`：bb 头像，页面正在引用。
- `bbq-cutout-v2.webp`：bb 旁边的透明造型图，页面正在引用。
- `bb.jpg` / `bbq-cutout-v2.png`：原始备份素材。

替换图片时，最好保持文件名不变，这样不用改代码。比如直接替换 `public/art/weavers/bbq-cutout-v2.webp`。如果你拿到的是 PNG/JPG，建议先转成 WebP 后再替换。

### 替换首页织机背景和图层

首页首屏图层在：

```text
public/art/magical-loom/aligned/
```

当前文件：

- `00_background_filled_approx.webp`：首页全屏背景。
- `02_machine.webp`：织机主体。
- `03_crystal.webp`：水晶。
- `04_fabric.webp`：织布。
- `05_foreground_objects.webp`：前景物件。

这些文件被 `components/HeroScene.tsx` 使用。替换时建议保持尺寸和文件名一致，否则可能需要重新调整 CSS 位置。

### 替换首页人物图层

首页角色图层在：

```text
public/art/fantasy-weaver/aligned_png/
```

这些图片由 `components/HeroScene.tsx` 逐层叠加。替换时也建议保持文件名和尺寸一致。

### 替换鼠标图案

文件位置：

```text
public/art/cursor/mouse.png
```

鼠标样式在 `app/globals.css` 中：

```css
body {
  cursor: url("/art/cursor/mouse.png") 2 2, auto;
}
```

如果鼠标点击位置不准，可以调整后面的两个数字，例如 `2 2`。

### 替换浏览器标签页图标

文件位置：

```text
public/favicon.svg
app/favicon.svg
```

页面配置在 `app/layout.tsx` 的 `metadata.icons`。如果浏览器不更新 favicon，可以把链接版本号改大，例如：

```ts
icon: "/favicon.svg?v=3"
```

## 修改样式和动效

主要样式文件：

```text
app/globals.css
```

常见位置：

- `.hero-section`：首页首屏整体。
- `.loom-canvas`：首页织机场景容器。
- `.magic-particles`：首页背景小粒子。
- `.click-sparkles`：鼠标点击粒子。
- `.weaver-card`：织造师卡片。
- `.weaver-side-image`：bb 旁边的造型图。
- `.join-section`：底部通信网络区域。

首页开场动画和织布微动在：

```text
components/HeroScene.tsx
```

鼠标点击粒子的颜色和数量在：

```text
components/ClickSparkles.tsx
```

当前粒子色板：

```ts
const sparklePalette = ["#1f5a43", "#2f6f4f", "#7a8f3a", "#c99b49", "#f2c86d"];
```

## 更新导航

导航链接在：

```text
lib/routes.ts
```

如果新增页面，需要同时：

1. 在 `app/` 下创建页面。
2. 在 `lib/routes.ts` 里加入导航项。
3. 如需 sitemap 收录，在 `app/sitemap.ts` 里加入路径。

## 新增内容时的注意事项

- `slug` 不要用中文，建议英文小写加短横线。
- 图片放进 `public` 后，引用路径不要写 `public`，而是从 `/art/...` 开始。
- 修改 `data/content.ts` 后，列表页和详情页会自动跟着变化。
- 改图片后如果浏览器没更新，先强制刷新；favicon 可能需要关闭标签页重新打开。
- 改首页首屏图层时，尽量保持原尺寸和透明区域，否则可能需要重新调 CSS。

## 常见问题

### 改了内容但页面没变化

先确认 dev server 正在运行：

```bash
npm run dev
```

然后强制刷新浏览器。如果还是没变化，重启 dev server。

### 图片路径 404

确认图片在 `public` 目录下。例如文件是：

```text
public/art/weavers/example.png
```

代码里应该写：

```ts
"/art/weavers/example.png"
```

### 新增图鉴或日志后详情页打不开

检查：

- `slug` 是否唯一。
- 链接路径是否和 `slug` 一致。
- `worldSlug` 是否能在 `worlds` 里找到对应幻境。

### 构建前检查

```bash
npm run typecheck
npm run lint
npm run build
```
