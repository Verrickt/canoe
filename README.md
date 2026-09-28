# Hugo Canoe Theme

> A beautiful, modern, and powerful Material Design theme for Hugo (0.146+ / 0.166+).  
> 优雅、轻量、高可用的 Material Design 静态博客主题（针对现代 Hugo 全面重构，构建零 npm 依赖）。

---

## 特性亮点 (Features)

* **纯粹的原生 Material Design 视觉**：卡片层级（Elevation）、动态流体涟漪阴影、经典蓝白与灰阶配色。
* **现代构建管道（零 npm）**：基于 Hugo Pipes 原生打包（`css.Sass` 编译 SCSS + `js.Build` 模块化打包），无需 Node.js 或 npm 环境。
* **瀑布流与全响应式布局**：智能 CSS Multi-column 瀑布流网格，自适应移动端、平板与桌面端。
* **暗色模式（Dark Mode）**：
  * 支持根据系统色彩偏好（`prefers-color-scheme`）自动切换。
  * 顶栏集成一键手动切换按钮，通过 `localStorage` 记忆用户选择，页面内联防闪烁（FOUC）控制脚本。
* **开箱即用的离线全文搜索**：
  * 基于本地轻量级模糊搜索引擎 [Fuse.js](https://fusejs.io/)（已内置，零外部引用）。
  * 自动对接 Hugo 的 `index.json` 输出，无需任何第三方构建工具或生成脚本。
  * 桌面端下拉搜索卡片 + 移动端全屏搜索遮罩，支持中文与英文模糊匹配。
* **文章阅读体验优化**：
  * 自动统计文章字数与预计阅读时间。
  * 侧边动态目录（Table of Contents），支持阅读高亮指示器。
  * 内置 Chroma 服务端语法高亮，告别笨重的外部 highlight.js。
* **数学公式渲染（MathJax 3）**：
  * 按需按篇加载：新建文章默认包含 `math: true`，仅在声明的文章中加载 MathJax 3 渲染引擎。
* **丰富的短代码（Shortcodes）**：
  * `admonition`：信息与警告提示框。
  * `video`：原生 HTML5 视频播放器（支持 MP4 / WebM / OGG）。
  * `music`：网易云外链音乐播放器。
* **注重隐私与低依赖**：
  * 默认不捆绑任何外部追踪脚本或评论服务。
  * 提供即插即用的评论钩子（Comments Hook），方便无缝接入 Giscus、Waline、Twikoo、Disqus 等。

---

## 运行要求 (Requirements)

* **Hugo Extended** $\ge$ **0.146.0**（推荐 0.166+；需要 Extended 版本以支持 Sass/SCSS 编译）

---

## 快速开始 (Quick Start)

### 1. 安装主题

在你的 Hugo 站点根目录下执行：

```bash
git clone https://github.com/stkevintan/canoe.git themes/canoe
```

或者作为 Git 子模块添加：

```bash
git submodule add https://github.com/stkevintan/canoe.git themes/canoe
```

### 2. 启用主题

修改站点根目录下的配置文件（推荐 `hugo.toml`）：

```toml
theme = "canoe"
```

### 3. 本地预览

```bash
hugo server -D
```

---

## 配置文件说明 (`hugo.toml`)

以下是完整推荐的 `hugo.toml` 配置示例：

```toml
baseURL = "https://example.org/"
locale = "zh-cn"
title = "My Blog"
theme = "canoe"

# 启用 CJK 语言自动分词与统计（中文环境下正确计算字数与摘要）
hasCJKLanguage = true
enableGitInfo = true

# 必须启用 JSON 输出格式，以便主题生成全文搜索索引 index.json
[outputs]
  home = ["HTML", "RSS", "JSON"]

[params]
  author = "Your Name"
  description = "A personal blog powered by Hugo & Canoe."
  copyright = "Copyleft @ Your Name"
  dateFormat = "2006年01月02日"
  logo = "/img/avatar.jpg"        # 头像路径（存放于 static/img/）
  splash_bg = "/img/bg.jpg"       # 首页横幅背景图路径
  nest_bg = true                 # 是否在横幅启用 Canvas 动态背景粒子动画
  reveal_effect = true           # 是否在列表页面启用渐入动效

  # 文章字数与阅读时间（默认开启，设为 false 可全局关闭）
  wordCount = true
  readingTime = true

  # 可选：Google Analytics / GTM（未配置则不加载任何外部脚本）
  [params.analytics]
    ga_id = ""                   # 如 "G-XXXXXXXXXX"

# 顶部导航菜单
[[menu.main]]
  name = "Home"
  weight = 1
  url = "/"

[[menu.main]]
  name = "Archive"
  weight = 2
  url = "/archive/"

[[menu.main]]
  name = "Categories"
  weight = 3
  url = "/categories/"

[[menu.main]]
  name = "Tags"
  weight = 4
  url = "/tags/"

[[menu.main]]
  name = "About"
  weight = 5
  url = "/about/"

# 顶部下拉抽屉分类
[[menu.taxonomy]]
  name = "Tag"
  identifier = "tags"

[[menu.taxonomy]]
  name = "Category"
  identifier = "categories"

# 页脚友情链接
[[menu.friend]]
  name = "GitHub"
  url = "https://github.com"

# 页脚社交图标 (使用内置 SVG 图标)
[[menu.social]]
  pre = "<svg class='svg-icons svg-icons-github'><use xlink:href='#svg-icons-github'></use></svg>"
  name = "Github"
  url = "https://github.com/your-username"
```

---

## 核心功能与使用指南

### 1. 文章创建与 Front Matter

执行以下命令创建新文章：

```bash
hugo new posts/my-first-post.md
```

主题的 Archetype 模板已预置常用字段：

```yaml
---
title: "My First Post"
date: 2026-09-28T12:00:00+08:00
draft: false
toc: true             # 是否显示文章目录（字数大于 400 且存在各级标题时展示）
math: true            # 是否启用 MathJax 3 渲染公式
wordCount: true       # 是否显示字数统计
readingTime: true     # 是否显示预计阅读时间
categories:
  - "技术"
tags:
  - "Hugo"
  - "Canoe"
---
```

### 2. 本地搜索 (Search)

Canoe 的搜索**无需安装任何构建插件或 npm 依赖**。只要在 `hugo.toml` 中配置了：

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

Hugo 在编译时会自动生成 `index.json`，主题内置的 Fuse.js 模块会在用户点击搜索框时异步按需加载索引，并执行即时模糊搜索。

### 3. 短代码 (Shortcodes)

#### 提示块 (Admonition)
支持 `info`（默认蓝色）与 `warning`（橙色）：

```markdown
{{% admonition type="info" title="提示" %}}
这是一条普通的信息提示。
{{% /admonition %}}

{{% admonition type="warning" title="注意" %}}
这是一条重要警告提示。
{{% /admonition %}}
```

#### 原生视频播放 (Video)
使用 HTML5 原生 `<video>` 播放本地或外部视频：

```markdown
{{% video mp4="/media/demo.mp4" poster="/img/poster.jpg" %}}
```

#### 网易云音乐 (Music)
通过 iframe 嵌入网易云外链歌曲播放器：

```markdown
{{% music "3950552" %}}
```
> *注：外链播放器受网易云音乐版权保护策略限制，部分受限歌曲可能无法在外链播放。*

### 4. 评论系统接入 (Comments)

为了保证主线纯粹、低依赖与用户隐私，Canoe 默认不打包评论系统。你可以非常轻松地接入任意第三方评论（以 **Giscus** 为例）：

在你的**站点根目录**（非主题目录）下创建 `layouts/partials/comments.html`：

```html
<script src="https://giscus.app/client.js"
        data-repo="your-username/your-repo"
        data-repo-id="R_..."
        data-category="Announcements"
        data-category-id="DIC_..."
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>
```

只要该文件存在，主题在文章详情页底部会自动渲染你的评论模块。

---

## 许可证 (License)

本项目采用 [MIT License](LICENSE.md) 开源协议。
原主题作者：[Kevin Tan](https://github.com/stkevintan)
