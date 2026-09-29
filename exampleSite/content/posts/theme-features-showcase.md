---
title: "Hugo Canoe-Revived 全功能测试与全景排版样板"
date: 2026-09-29T16:00:00+08:00
tags: ["Hugo", "Canoe", "Markdown", "KaTeX", "Shortcodes", "Emoji"]
categories: ["Showcase", "Theme"]
slug: "theme-features-showcase"
math: true
toc: true
wordCount: true
readingTime: true
---

本篇样板文章旨在对 **Hugo Canoe-Revived** 主题的全部核心特性与排版组件进行全面验证与视觉回归测试。内容涵盖：多媒体短代码（HTML5 视频、网易云音乐外链）、全类型信息提示框（Admonition）、自定义表情包体系（AC娘、雀魂、贴吧）、KaTeX 数学公式渲染、GFM 全套排版要素及代码高亮。

---

## 1. 多媒体组件 (Media Shortcodes)

### 1.1 HTML5 原生视频播放器 (`video`)

使用原生 HTML5 `<video>` 标签，无任何外部重型播放器依赖，自适应卡片宽度：

{{< video mp4="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4" >}}

### 1.2 网易云音乐外链播放器 (`music`)

集成网易云音乐官方外链 iframe，测试曲目为 doriko 经典名曲《歌に形はないけれど》（Song ID: `409912`）：

{{< music id="409912" >}}

---

## 2. 提示框组件 (Admonitions)

参考 **GitHub Flavored Markdown (GFM)** 标准规范，提供 5 种具备明确语义色彩的提示框组件，全面采用 **Material Design 2 (MD2)** 经典色彩规范与通栏横幅设计（Form B），完美支持深色模式动态平滑切换：

### 2.1 注意提示框 (Note / 默认)

用于一般性补充说明、背景信息与默认提示（未指定 `type` 时默认为 `note`）：

{{< admonition >}}
这是一条未指定 `type` 的默认提示框，采用 Material Blue 沉稳蓝配色，标题自动采用“注意”与 `info` 图标。
{{< /admonition >}}

明确指定 `type="note"` 并自定义标题：

{{< admonition type="note" title="版本更新提示" >}}
Canoe-Revived 已全面支持 **Hugo Extended 0.146+ / 0.166+**，构建管道基于 Hugo 原生 Pipes（`css.Sass` 与 `js.Build`），实现真正的**零 npm、零 Node.js 依赖**。
{{< /admonition >}}

### 2.2 技巧提示框 (Tip)

用于建议、最佳实践或提效快捷技巧（Material Green 薄荷绿配色）：

{{< admonition type="tip" title="排版效率建议" >}}
在撰写长篇文章时，推荐使用 `toc = true` 开启侧边目录导航，Canoe 内部自研的滚动监听模块会自动为您高亮阅读进度的当前章节。
{{< /admonition >}}

### 2.3 关键重要提示框 (Important)

用于关键核心逻辑、不可遗漏的前提条件（Material Deep Purple 深紫配色）：

{{< admonition type="important" title="核心构建前提" >}}
若您需要修改 SCSS 或 TypeScript 源码，请确保下载并安装 **Hugo Extended（扩展版）**。标准版 Hugo 不包含 LibSass / DartSass 与 ESBuild 引擎。
{{< /admonition >}}

### 2.4 风险警告提示框 (Warning)

用于破坏性风险、避坑警示或操作前置警示（Material Amber 琥珀金配色）：

{{< admonition type="warning" title="公式书写注意事项" >}}
若在文章中书写包含下标（如 `x_i`）的复杂 LaTeX 公式，请确保在 `hugo.toml` 中开启 Goldmark 的 `passthrough` 扩展，以防止下划线被 Markdown 引擎错误解析为斜体标签 `<em>`。
{{< /admonition >}}

### 2.5 危险严重提示框 (Caution)

用于严重危险、数据损失或不可逆操作警示（Material Red 绯红配色）：

{{< admonition type="caution" title="不可逆操作警告" >}}
执行 `rm -rf public/*` 或类似清空目录命令前，请务必仔细核对当前终端的工作目录路径，防止误删用户数据或 Git 版本树。
{{< /admonition >}}

---

## 3. 自定义表情包体系 (Custom Emojis)

主题内置服务端正则过滤引擎（SSR Filter），无需客户端 JavaScript 执行即可在 HTML 构建期直接转译为相应图片，且在暗色模式下拥有极佳的显示对比度。

### 3.1 AC娘表情 (Light / Dark 双图自适应)

AC娘表情包支持亮暗模式切换，暗色模式下自动切换为深色描边或专用版本：

- 基础表情：[ac01] [ac02] [ac06] [ac09] [ac10] [ac17] [ac20] [ac21] [ac33] [ac41] [ac54]
- 高编号系列：[ac1001] [ac1008] [ac1024] [ac2001] [ac2012] [ac2055]

行内混排测试：今天写代码遇到了奇怪的 Bug [ac01]，查了半天文档原来是配置漏写了 [ac10]，改完之后一次编译通过！[ac21] 太强了 [ac54]！

### 3.2 雀魂麻将表情 (Majsoul)

经典的雀魂一姬与猫粮表情包：

- 常用表情：[ms01] [ms02] [ms03] [ms07] [ms12] [ms20] [ms32] [ms45] [ms54]

行内混排测试：今晚打日麻立直一发自摸 [ms01]，结果下家直接大三元截胡 [ms02]，心态直接发生微妙变化 [ms54]……

### 3.3 百度贴吧经典泡泡表情 (Tieba)

经典老互联网泡泡表情：

- 常用表情：[tb01] [tb02] [tb03] [tb05] [tb09] [tb15] [tb20] [tb26] [tb33]

行内混排测试：滑稽保命 [tb01]，笑而不语 [tb02]，冷汗直流 [tb15]，静静吃瓜 [tb20]。

### 3.4 代码块表情防转义测试 (Code Shielding)

表情代码若出现在代码块或行内代码中，**绝不会**被错误替换：

- 行内代码：`[ac01]`、`[ms02]`、`[tb01]`
- 代码块测试：

```bash
# 这里的代码不应渲染为表情图片：
echo "Testing [ac01] and [ms01] inside code block"
```

---

## 4. 数学公式渲染 (KaTeX Loose Mode)

主题使用 KaTeX 作为公式排版引擎，并开启了**宽松模式**（`strict: false`, `throwOnError: false`, `trust: true`）。

### 4.1 行内公式 (Inline Math)

- **质能等价方程**：$E = mc^2$
- **极限求值**：当 $x \to 0$ 时，$\lim_{x \to 0} \frac{\sin x}{x} = 1$
- **自然数求和**：$S_n = \sum_{k=1}^n k = \frac{n(n+1)}{2}$
- **括号定界符语法支持**：\( \int_0^1 x^2 \, dx = \frac{1}{3} \)

### 4.2 独立行公式 (Display Math)

经典高斯积分公式：

$$
\int_{-\infty}^{+\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

欧拉公式与恒等式：

$$
e^{ix} = \cos x + i \sin x \implies e^{i\pi} + 1 = 0
$$

### 4.3 多行对齐与微分方程组 (Aligned Systems)

麦克斯韦电磁方程组（微分形式）：

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

### 4.4 矩阵与分段函数 (Matrices & Cases)

二维旋转矩阵：

$$
R(\theta) = \begin{pmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{pmatrix}
$$

对角块矩阵：

$$
\mathbf{A} = \begin{bmatrix}
\lambda_1 & 0 & \dots & 0 \\
0 & \lambda_2 & \dots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \dots & \lambda_n
\end{bmatrix}
$$

分段狄利克雷函数定义：

$$
D(x) = \begin{cases}
1 & \text{若 } x \in \mathbb{Q}, \\
0 & \text{若 } x \notin \mathbb{Q}.
\end{cases}
$$

### 4.5 宽松模式语法特判 (Loose Syntax Edge Cases)

测试 HTML 实体风格的箭头与无花括号下标：

$$
\begin{aligned}
A &\rarr B \mid C \\
B &\larr D \\
S &\Darr T \\
\alpha &\iff \beta \implies \gamma
\end{aligned}
$$

---

## 5. Markdown 排版与基础元素全集

### 5.1 各级标题 (Headings)

#### H4 四级标题测试
##### H5 五级标题测试
###### H6 六级标题测试

### 5.2 字体排版风格与修饰

- **加粗文本 (Bold)**：**Material Design 强调质感**
- *斜体文本 (Italic)*：*优雅流畅的微斜笔触*
- ***粗斜体 (Bold Italic)***：***兼具粗重与倾斜***
- ~~删除线 (Strikethrough)~~：~~废弃的旧版本实现~~
- 上标与下标：$H_2O$ 与 $E = mc^2$
- 键盘按键风格：按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> 强制刷新页面，或按 <kbd>Alt</kbd> + <kbd>F4</kbd> 关闭窗口。
- 文本标记高亮：可以使用 HTML 原生 `<mark>突出显示的重要文本</mark>` 标记。

### 5.3 引用块 (Blockquotes)

> **优雅是一门艺术。**
> 好的排版犹如空气，当它存在时你几乎察觉不到它的刻意，但当它缺失时，你定会感到窒息。

嵌套引用与列表混排：

> 第一层引用内容。
>
> > 第二层嵌套引用，支持进一步的观点阐释。
> > - 嵌套列表项 A
> > - 嵌套列表项 B
>
> 回到第一层引用。

### 5.4 列表 (Lists)

#### 无序列表 (Unordered List)
* 项目一级分类
  * 子级特性 1.1
    * 孙级细节描述 1.1.1
    * 孙级细节描述 1.1.2
  * 子级特性 1.2
* 项目二级分类

#### 有序列表 (Ordered List)
1. 准备工作：拉取主题仓库
2. 配置参数：编辑 `hugo.toml`
   1. 填入站点名称与语言
   2. 配置菜单与社交网络链接
3. 发布上线：一键静态打包

#### GFM 任务列表 (Task Lists)
- [x] 现代化 Hugo Extended 重构
- [x] 暗色模式本地记忆与无闪烁加载
- [x] 迁移至 KaTeX 宽松模式公式渲染
- [x] 响应式图片与通栏表格优化
- [ ] 后续持续迭代与新功能规划

### 5.5 表格排版 (Tables)

#### 双列紧凑表格（自适应撑满容器）

| 属性名称 | 配置说明 |
| :--- | :--- |
| `theme` | 当前启用的主题名称（如 `canoe-revived`） |
| `math` | 是否按需加载 KaTeX 数学公式渲染引擎 |
| `toc` | 是否在侧边栏显示文章目录面板 |

#### 多列全对齐数据网格

| 编号 | 模块名称 | 状态 | 覆盖率 | 负责作者 | 说明 |
| :---: | :--- | :---: | ---: | :--- | :--- |
| 01 | 核心渲染管道 | 稳定 | 100% | Verrickt | Sass / ESBuild 零依赖打包 |
| 02 | 本地搜索引擎 | 稳定 | 98% | Verrickt | 基于 Fuse.js 的无感异步模糊搜索 |
| 03 | 暗色色彩系统 | 稳定 | 99% | Verrickt | CSS 变量 + 系统偏好自动切换 |
| 04 | 数学公式模块 | 稳定 | 100% | Verrickt | KaTeX Loose 模式无缝容错 |

---

## 6. 代码高亮与代码块 (Chroma Code Highlighting)

主题采用 Hugo 内置的 Chroma 服务端代码高亮，零外部 JS 脚本加载，渲染迅速。

### 6.1 Go 语言

```go
package main

import (
	"fmt"
	"net/http"
)

// Server represents our HTTP API service
type Server struct {
	port int
}

func (s *Server) Start() error {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, Hugo Canoe Theme!")
	})
	return http.ListenAndServe(fmt.Sprintf(":%d", s.port), nil)
}

func main() {
	server := &Server{port: 8080}
	_ = server.Start()
}
```

### 6.2 Python 异步编程

```python
import asyncio
from typing import List

async def fetch_article(slug: str) -> dict:
    await asyncio.sleep(0.05)
    return {"slug": slug, "status": "rendered"}

async def main(slugs: List[str]):
    tasks = [fetch_article(s) for s in slugs]
    results = await asyncio.gather(*tasks)
    print(f"Processed {len(results)} articles successfully.")

if __name__ == "__main__":
    asyncio.run(main(["post-1", "post-2", "post-3"]))
```

### 6.3 TypeScript / 前端交互

```typescript
interface ThemeConfig {
  name: string;
  darkMode: boolean;
  version: string;
}

export function toggleTheme(current: 'light' | 'dark'): 'light' | 'dark' {
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  return next;
}
```

### 6.4 Shell / 终端命令

```bash
# 运行本地 Hugo 开发服务器并指定主题与实时热重载
hugo server -s ./exampleSite --themesDir=../.. --theme=canoe -D
```

---

## 7. 脚注与超链接 (Footnotes & Links)

- 访问 [Hugo 官方主页](https://gohugo.io) 了解更多静态站点生成机制。
- 查看 [KaTeX 官方文档](https://katex.org) 查阅更多 TeX 数学语法规范[^1]。
- 查阅 [Canoe-Revived 仓库](https://github.com/Verrickt/canoe-revived) 获取最新更新记录[^2]。

[^1]: KaTeX 是一个轻量、超快的 Web 端 TeX 数学公式排版库。
[^2]: Canoe-Revived 由 Verrickt 维护，基于经典 Canoe 进行全现代化翻新。
