# Phase 4 前端资产重建重构计划 (refactor.md)

> 目标：彻底翻新 Canoe 主题前端资产，忠实还原旧版 Material Design 视觉，全面现代化内部实现。
> 架构基准：Hugo extended ≥ 0.134.3 内置 Pipes（`css.Sass` + `js.Build`），零 npm 依赖。

---

## 4.1 SCSS 重写（模块化源码与现代管道）

- [x] **4.1.1 基础与变量模块**
  - 建立 `assets/sass/` 目录结构
  - 创建 `_variables.scss`（颜色、字体、阴影 `z-depth`、响应式断点、CSS 变量映射骨架）
  - 创建 `_fonts.scss`（本地 Roboto 字体 `@font-face` 声明，链接 `static/fonts/roboto/`）
  - 创建 `_normalize.scss`（现代化 reset/normalize 样式）

- [x] **4.1.2 布局与 Material 核心组件**
  - 创建 `_grid.scss`（容器 `.container`、`.inner`、响应式隐藏工具类如 `.hide-on-med-and-down`）
  - 创建 `_material.scss`（按钮 `.btn` / `.btn-secondary`、徽章 `.badge`、阴影深度 `.z-depth-0~5`）
  - 创建 `_layout.scss`（固定顶栏 `.navbar-fixed`、底栏 `.footer`、分页器 `.pagination`、移动侧栏 `.side-nav` 结构）

- [x] **4.1.3 页面视图与专题组件**
  - 创建 `_waterfall.scss`（瀑布流卡片列表，CSS `columns` 方案 + `break-inside: avoid` + 现代回退）
  - 创建 `_post.scss`（文章排版 `.article`、标题、代码块 Chroma 适配、面包屑、目录面板 `.toc-panel`）
  - 创建 `_search.scss`（桌面弹出搜框 `.form-popout`、移动搜索全屏面板 `.mobile-search`）
  - 创建 `_components.scss`（首页 `.splash`、分类面板 `.taxonomy-panel`、短代码 `admonition`/`video`/`music`）

- [x] **4.1.4 入口与 Hugo Pipes 编译接入**
  - 创建 `assets/sass/main.scss` 聚合所有分片模块
  - 修改 `layouts/_default/baseof.html`：通过 `resources.Get "sass/main.scss" | css.Sass | resources.Minify | resources.Fingerprint` 动态生成带 SRI 的 `<link>` 标签
  - 移除原 `static/css/index.css` 的旧引用

- [x] **4.1.5 SCSS 编译测试与视觉对齐**
  - 验证 `hugo` 构建成功，页面样式正常渲染

---

## 4.2 JS 模块化（esbuild 原生构建与交互重构）

- [x] **4.2.1 目录建立与入口架构**
  - 建立 `assets/js/` 与 `assets/js/modules/`
  - 创建入口 `assets/js/main.js`

- [x] **4.2.2 导航交互模块 (`nav.js`)**
  - 实现移动端侧栏汉堡抽屉展开/折叠与遮罩层交互
  - 实现桌面端分类/标签面板（`#term-panel`）展开与收起
  - 实现导航栏 Tab 激活指示器（下划线动画与定位）

- [x] **4.2.3 文章目录交互模块 (`toc.js`)**
  - 使用 `IntersectionObserver` 监听阅读滚动并高亮当前标题项
  - 优化点击目录平滑滚动体验与移动端折叠适配

- [x] **4.2.4 画布特效模块 (`splash.js`)**
  - 迁移并重构 `canvas.js` 粒子/雪花背景动效，保持高性能与防抖窗口重置

- [x] **4.2.5 接入 `js.Build` 构建管道**
  - 在 `layouts/partials/script.html` 中通过 `resources.Get "js/main.js" | js.Build ... | resources.Fingerprint` 输出脚本
  - 移除旧 `static/js/index.js` 脚本引入

---

## 4.3 搜索重做（Hugo JSON 索引 + 本地 Fuse.js）

- [x] **4.3.1 输出索引模板**
  - 配置 Hugo 索引输出格式（`outputs.home` 包含 `JSON`），编写 `layouts/index.json` 模板
  - 输出包含 `title`、`uri`、`tags`、`categories`、`content` 的精简索引数据

- [x] **4.3.2 引入本地 Fuse.js**
  - 将单文件版 Fuse.js（如 `fuse.basic.min.js`）放置在 `assets/js/vendor/`（零 npm 依赖）

- [x] **4.3.3 搜索交互模块 (`search.js`)**
  - 编写 `assets/js/modules/search.js`
  - 首次聚焦搜索框懒加载 `index.json`，减少首屏开销
  - 统筹桌面端下拉搜索框与移动端全屏搜索弹窗
  - 支持实时模糊匹配高亮显示、键盘选择与 ESC 快捷关闭

- [x] **4.3.4 集成与搜索功能验收**
  - 在 `main.js` 中载入搜索控制器，验证关键词搜索与跳转

---

## 4.4 评论钩子规范化

- [x] **4.4.1 统一 comments 钩子**
  - 保留并规范 `layouts/partials/comments.html` 空钩子，保留详尽使用指南注释
  - 整理 `layouts/_default/single.html` 中的评论调用，删除多余的 `comment.html` 遗留文件

---

## 4.5 暗色模式（CSS 自定义属性 + 自动/手动双模）

- [x] **4.5.1 CSS 变量调色板**
  - 在 `_variables.scss` 抽象核心设计令牌（背景色、卡片底色、文字主色/辅色、边框色、代码块高亮暗色调整）
  - 亮色维持原版 Material Design 配色不变；暗色基于 `#121212` 体系设计舒适阅读对比度

- [x] **4.5.2 防闪烁（Anti-FOUC）脚本**
  - 在 `layouts/_default/baseof.html` 的 `<head>` 顶部注入极简内联脚本
  - 预读 `localStorage` 与 `prefers-color-scheme`，在 DOM 渲染前设置 `data-theme` 属性

- [x] **4.5.3 切换按钮 UI 与逻辑 (`theme.js`)**
  - 在 `layouts/partials/navbar.html` 中添加主题切换图标按钮（明/暗图标切换）
  - 编写 `assets/js/modules/theme.js`：绑定切换点击、更新 `data-theme`、保存至 `localStorage`、监听系统偏好变化

---

## 4.6 旧资产清理与最终构建验收

- [x] **4.6.1 清理冗余遗留文件**
  - 删除 `static/css/index.css`
  - 删除 `static/js/index.js`
  - 删除 `static/js/canvas.js`

- [x] **4.6.2 Hugo 编译与构建验收**
  - 执行 `hugo server -s .\exampleSite --themesDir=..\.. --theme=canoe`
  - 确保编译通过，控制台 0 报错、0 弃用警告
  - 同步更新 `todo.md` 中的 Phase 4 对应项
