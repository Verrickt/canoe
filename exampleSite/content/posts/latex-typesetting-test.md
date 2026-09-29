---
title: "LaTeX Typesetting and Mathematical Notation Showcase"
date: 2026-09-29T15:00:00+08:00
tags: ["LaTeX", "KaTeX", "Math"]
categories: ["Test"]
slug: "latex-typesetting-test"
math: true
toc: true
---

This post is designed to test and showcase mathematical typesetting powered by **KaTeX** in loose mode. It covers inline expressions, multiline display formulas, aligned systems, matrices, calculus, and loose-syntax edge cases.

---

## 1. Inline Expressions

Mathematical formulas can appear inline within paragraphs:

- **Basic Arithmetic & Algebra**: A quadratic equation $ax^2 + bx + c = 0$ has solutions given by $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.
- **Sets and Numbers**: The set of real numbers is $\mathbb{R}$, complex numbers $\mathbb{C}$, and integers $\mathbb{Z}$. For any $x \in \mathbb{R}$, $|x| \ge 0$.
- **Complexity Theory**: Fast Fourier Transform runs in $\mathcal{O}(n \log n)$ time, whereas naive multiplication runs in $\mathcal{O}(n^2)$.
- **Alternative Inline Delimiters**: Testing LaTeX parenthesis syntax \( \sum_{k=1}^n k = \frac{n(n+1)}{2} \) alongside standard dollar signs.

---

## 2. Fundamental Constants and Identities

### Euler's Identity

Often regarded as the most beautiful formula in mathematics, linking five fundamental constants:

$$
e^{i\pi} + 1 = 0
$$

### The Basel Problem

The sum of the reciprocals of the squares of positive integers:

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{1}{1^2} + \frac{1}{2^2} + \frac{1}{3^2} + \dots = \frac{\pi^2}{6}
$$

### Gaussian Integral

The integral of the Gaussian function over the entire real line:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

---

## 3. Calculus and Differential Equations

### Maxwell's Equations (Electrodynamics)

In differential form with SI units:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

### Time-Dependent Schrödinger Equation (Quantum Mechanics)

Describing the wave function of a quantum-mechanical system:

$$
i\hbar \frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[ -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t) \right]\Psi(\mathbf{r},t)
$$

---

## 4. Linear Algebra and Matrices

### Matrix Inversion and Determinants

A $2 \times 2$ invertible matrix $A$ and its inverse:

$$
A = \begin{pmatrix}
a & b \\
c & d
\end{pmatrix}, \quad
A^{-1} = \frac{1}{\det(A)} \begin{pmatrix}
d & -b \\
-c & a
\end{pmatrix} = \frac{1}{ad - bc}\begin{pmatrix}
d & -b \\
-c & a
\end{pmatrix}
$$

### Block / Bracket Notation

$$
\mathbf{M} = \begin{bmatrix}
\lambda_1 & 0 & \dots & 0 \\
0 & \lambda_2 & \dots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \dots & \lambda_n
\end{bmatrix}
$$

---

## 5. Piecewise Functions and Cases

The absolute value function and the Riemann zeta function definition:

$$
f(x) = \begin{cases}
x^2 \sin\left(\frac{1}{x}\right) & \text{if } x \neq 0, \\
0 & \text{if } x = 0.
\end{cases}
$$

---

## 6. Loose Mode & Syntax Edge Cases

Under KaTeX loose mode (`strict: false`, `throwOnError: false`, `trust: true`), commonly relaxed LaTeX constructs should render smoothly without throwing errors:

### HTML-Style Arrows

- Right arrow: $A \rarr B$ (via `\rarr`) and $A \rightarrow B$ (via `\rightarrow`)
- Left arrow: $B \larr A$ (via `\larr`) and $B \leftarrow A$ (via `\leftarrow`)
- Double arrows: $A \Rarr B$, $A \Larr B$, and $A \iff B$
- Down arrow: $A \Darr B$ (via `\Darr`)

### Multiline Derivations with Loose Subscripts

$$
\begin{aligned}
S &\rarr A a \mid b \\
A &\rarr A c \mid S d \mid \epsilon \\
A_i &\rarr \delta_1 \gamma \mid \delta_2 \gamma \mid \dots \mid \delta_k \gamma
\end{aligned}
$$

---

## 7. Large Brackets and Delimiters

Evaluating limits and continued fractions:

$$
\lim_{n \to \infty} \left( 1 + \frac{1}{n} \right)^n = e
$$

$$
\sqrt{1 + \sqrt{1 + \sqrt{1 + \dots}}} = \phi = \frac{1 + \sqrt{5}}{2} \approx 1.6180339887
$$
