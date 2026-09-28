---
title: this is a test
author: "Michael Henderson"
tags: ["test"]
date: 2014-09-28
math: true
hidden: true
---


|a|b|
|:--:|:--:|
|c|d|

# GFM Feature Verification Test
$\frac{1}{2}$
This file contains elements unique to **GitHub Flavored Markdown (GFM)**. If your renderer supports GFM, the elements below will format correctly. If it only supports **Vanilla Markdown (CommonMark)**, these sections will look broken, misaligned, or render as raw plain text.

---

## 1. Tables
*Vanilla Markdown does not support tables. GFM should render this as a clean, styled grid with a right-aligned age column.*

| Developer | Primary Language | Age (Right-Aligned) |
| :--- | :--- | ---: |
| Alice Smith | JavaScript | 28 |
| Bob Jones | Python | 34 |
| Charlie Brown | Go | 41 |

---

## 2. Fenced Code Blocks & Syntax Highlighting
*Vanilla Markdown requires 4-space indentation for code and has no syntax highlighting. GFM uses triple backticks and applies language-specific color coding.*

```python
def greet_developer(name):
    # This should be syntax-highlighted based on Python rules
    message = f"Hello, {name}! Welcome to the GFM test."
    print(message)
    return True
```

---

## 3. Task Lists (Checklists)
*Vanilla Markdown will render these as a standard bulleted list with text brackets `[ ]`. GFM will transform them into interactive or visual checkboxes.*

- [x] This task is completed and checked
- [ ] This task is incomplete and unchecked
- [x] ~~This task is completed and crossed out~~

---

## 4. Strikethrough
*Vanilla Markdown ignores double tildes. GFM will draw a line through the text.*

This feature is ~~deprecated~~ completely functional in GFM.

---

## 5. Autolinks
*Vanilla Markdown requires explicit link syntax `[text](url)`. GFM automatically parses bare URLs and email addresses into clickable links.*

*   URL: https://github.com
*   Email: test-developer@example.com

---

## 6. GitHub Specific Extensions (Optional Platform Check)
*These features require the renderer to be integrated with GitHub's platform environment. If testing in a standalone editor, these may remain plain text.*

*   **User Mention:** @github
*   **Issue / Pull Request Link:** #1
*   **Emoji Shortcode:** :shipit: :rocket: :white_check_mark: