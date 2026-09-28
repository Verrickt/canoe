---
title: "GitHub Flavored Markdown Test"
author: "Michael Henderson"
tags: ["Markdown", "GFM"]
date: 2026-09-28
math: true
---

This file demonstrates and tests elements unique to **GitHub Flavored Markdown (GFM)** rendered by the theme, including responsive auto-stretching tables, task lists, code blocks, and math formulas.

---

## 1. Tables

### Compact Two-Column Table (Auto-Stretching Test)

| a | b |
| :--: | :--: |
| c | d |

### Multi-Column Data Grid Table

*GFM renders this as a clean, styled grid with column alignment.*

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