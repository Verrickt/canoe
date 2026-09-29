---

title: '上下文无关文法中左递归消除的证明'
date: 2025-08-15 16:59:56
tags: ['CFG']
categories: ['Other']
slug: left-recursion-elimination
math: true

---

## 直接左递归消除

针对左递归的上下文无关语法$A$，存在一种能够消除左递归的改写方式。
本文将不严谨(?)地证明这一点。

### 左递归语法

考虑如下语法

$$
A \rarr A\alpha_1|A\alpha_2|A\alpha_3|\dots|A\alpha_m|\beta_1|\beta_2|\beta_3|\dots|\beta_n
$$


令$\alpha = \alpha_{1\dots m}$，$\beta = \beta_{1 \dots n}$，则可简写为
$$
A \rarr A\alpha |\beta
$$


### 左递归消除

上述语法可被改写为等价的非左递归形式：

$$
A \rarr \beta A^\prime \\
A^\prime \rarr \alpha A^\prime | \epsilon
$$

## 证明

主要依据是语法表示的字符串集合，集合相等则语法相等。
对于语法$A \rarr A\alpha |\beta$，其生成的字符串是以非终结符$\beta$开头后任意个$\alpha$的字符串集合，换言之，$A \rarr A\alpha |\beta$与$A = \beta\alpha^*$是等价的。

### 正向

利用$\alpha^*$的改写
$$
A \rarr A\alpha|\beta  \\
\Darr \\
A = \beta\alpha^* \\
\Darr \\
A \rarr  \beta A^\prime \\
A^\prime = \alpha A^\prime|\epsilon
$$

### 反向证明

$$
A \rarr \beta A^\prime \\
A^\prime \rarr \alpha A^\prime | \epsilon
$$


分析消除左递归的等价形式，$A^\prime$表示任意个$\alpha$组成的字符串集合，即$A^\prime = \alpha^*$



将$A^\prime$的产生式带入$A$中，得到$A = \beta\alpha^*$，两组语法等价。 

## 通用左递归消除

上述直接左递归消除算法无法解决间接左递归
$$
S \rarr A a | b  \\
A \rarr A c | Sd | \epsilon
$$

因此有了通用左递归消除算法：

1. 给定语法S，将其所有非终结符$A$排序：$S = \{A_1,A_2,{\dots} A_n \}$
2. 对于$i \in [1,n-1]$,$j\in[1,i-1]$，如果存在$A_i\rarr A_j \gamma$形式的产生式，将其按照下面的规则替换
   1. $A_i \rarr \delta_1\gamma|\delta_2\gamma|\delta_3\gamma|\dots|\delta_k\gamma$
   2. 其中$A_j = \delta_1|\delta_2|\delta_\dots|\delta_k$是当前$A_j$的全部投影
3. 使用直接左递归消除算法，消除$A_i$的左递归


### 证明

归纳法不太好理解，这里使用反证法。

核心点在于，$A_i$被处理后，对于任意的$j \le i$，不存在从$A_i$到$A_j$的**任何**投影。

证明步骤:
1. 假设已经对$S = \{A_1,A_2,\dots,A_n\}$进行了通用左递归消除算法。
2. 对于任意的$i,j \in [1,n]$
   1. 若$i \gt j$，由于算法的步骤2进行了替换，不存在$A_i$到$A_j$的左递归。
   2. 若$i = j$，由于算法的步骤3进行了直接左递归消除，不存在$A_i$到$A_j$的左递归。
   3. 若$i \le j$，需要进一步分析。
3. 对于任意$i,j \in [1,n]且 i\lt j$，假设有$A_i$到$A_j$的左递归，则存在环路$A_i \Rarr^+ A_j \Rarr^+ A_i$。注意到$j>i$，算法保证不存在$A_j$到$A_i$的左递归，即环路$A_j \Rarr^+ A_i$不存在，与假设矛盾，所以该情况下不存在左递归

综上所属，对于任意$i,j \in [1,n]$，通用左递归消除算法能避免全部左递归。