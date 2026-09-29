# Canoe Theme Modernize TODO

> 目标：彻底翻新，忠实还原旧观感（Material Design 视觉不变），内部实现全面现代化。
> 基准：Hugo extended ≥ 0.134（本机 0.134.3），构建零 npm 依赖。
> 已定决策：Hugo 内置 Pipes（css.Sass + js.Build）；搜索 = Hugo 索引 + Fuse.js；
> 评论默认不集成（仅留钩子）；界面文案仅中文；暗色 = 自动 + 手动切换；
> 短代码保留 admonition / video / music，删除 codepen / jsfiddle / asciinema / shengxiang。
>
> 验收命令：`hugo server -s .\exampleSite --themesDir=..\.. --theme=canoe-revived`

---

## Phase 1 · 微改动（清理与配置）

- [x] 1.1 工作区清理：删除 `exampleSite/public/` 残留构建产物；`.gitignore` 补充 `exampleSite/public/`、`.hugo_build.lock`
- [x] 1.2 `exampleSite/config.toml` → `hugo.toml`：删除已失效的 `[blackfriday]` 段；新增 `[markup]`（Goldmark + Chroma 代码高亮配置）
- [x] 1.3 `theme.toml` 更新：`min_version` 提升到 0.134+，features/tags 描述刷新
- [x] 1.4 `archetypes/default.md` 现代写法（`.Name` / `.Date`）

## Phase 2 · 小改动（依赖与短代码）

- [x] 2.1 短代码取舍：删除 `codepen.html` / `jsfiddle.html` / `asciinema.html` / `shengxiang.html`；保留并修复 `admonition`、`video`、`music`（README 标注网易云版权风险）
- [x] 2.2 删除 `static/js/polyfill.js`（现代浏览器不再需要）；删除 `gen_lunr_index.sh`（旧搜索工具链，Phase 4 重做）
- [x] 2.3 移除 `cdn.bootcss.com` 死链：代码高亮改用 Hugo 内置 Chroma（零 JS），删除 highlight.js 9.12 相关全部 `<script>`/CSS 与 graphql 注册 hack
- [x] 2.4 MathJax 2.7.2 每页无条件加载 → 改为 MathJax 3，仅当文章 front matter 声明 `math = true` 时按需加载
- [x] 2.5 Google Analytics 旧版 `ga()` 代码段 → 可选的现代 gtag 配置项（不配置则不输出任何脚本）

## Phase 3 · 中改动（模板重组与 SEO）

- [x] 3.1 新增 `baseof.html`，全部页面改为 block/define 模式，消灭三段式 header/footer/script 拼接
- [x] 3.2 按 Hugo 现代布局约定重组：`home.html` / `list.html` / `single.html` / `term.html` / `taxonomy.html` / `404.html`（404 去掉硬编码 `lang="zh-cn"`）
- [x] 3.3 清理废弃 API：`.Site.Taxonomies`、`.Data.Terms.Alphabetical`、`{{ template "_internal/pagination.html" }}`、`.Site.LanguageCode` 等
- [x] 3.4 删除导航激活态的 URL 切片 hack（`$curType := index $path ...`），改用可靠的 path 匹配
- [x] 3.5 修复 `waterfall.html` 中 `.Paginate` 被调用两次的问题
- [x] 3.6 分类/标签链接从 `BaseURL` 字符串拼接改为 Hugo 内置路由（`.RelPermalink`），支持子目录部署
- [x] 3.7 SEO：补 meta description、OG / Twitter 卡片 partial、canonical 复核；RSS `<link>` 逻辑保留
- [x] 3.8 去掉 `window.baseURL` 全局变量，改用 `data-*` 属性或模块内传参

## Phase 4 · 大改动（前端资产重建）

- [x] 4.1 SCSS 重写：`static/css/index.css`（40KB minified 产物）→ `assets/sass/` 模块化源码（normalize、materialize 精简、layout、components、post、search、footer 等）
  - 忠实还原现有视觉：配色、卡片、瀑布流（columns）、splash、TOC 面板、Material Icons
  - Roboto 字体本地 `@font-face` 保留；瀑布流 columns 加现代回退
  - `css.Sass` + `minify` + `fingerprint` + SRI
  - 以 `/ref/public/` 旧版 HTML 为基准逐页比对
- [x] 4.2 JS 模块化：`assets/js/` 源码模块 + `js.Build`（esbuild）
  - `search.js`（Fuse）、`toc.js`、`nav.js`（侧栏/下拉/tabs 指示器）、`splash.js`（canvas 雪花特效保留）
  - 删除混淆产物 `index.js` 与 vendored 的 `av-min.js` / `Valine.min.js`（Valine/LeanCloud 已废弃）
- [x] 4.3 搜索重做：Hugo output format 生成 `index.json`（title / tags / content / uri）；Fuse.js 本地 vendored 进 `assets/`（用户无需 node）；前端结果渲染对接桌面搜索框 + 移动搜索面板
- [x] 4.4 评论钩子：仅保留 `layouts/partials/comments.html` 空钩子 + README 说明用户如何自行接入（默认不集成）
- [x] 4.5 暗色模式：CSS 自定义属性调色板 + `prefers-color-scheme` 自动 + 手动切换按钮（localStorage 记忆、防 FOUC 内联脚本），旧观感的亮色为默认

## Phase 5 · 收尾（文档与验收）

- [x] 5.1 README 重写：安装、配置项全表（含新增 math / 暗色 / gtag）、搜索说明、短代码文档、评论接入指引
- [x] 5.2 验收：`hugo server` 零报错零 deprecated 警告；首页/列表/文章/归档/分类/标签/404/搜索/暗色切换逐项过一遍；与旧版视觉对齐