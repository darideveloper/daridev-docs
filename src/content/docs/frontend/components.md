---
title: Components
description: Generalities about frontend components and development practices
---

## Naming components

Components should use camel case. Example:

* **✅ CardInfo.astro**
* **❌ cardInfo.astro**
* **❌ card-info.astro**
* **❌ card_info.astro**
* **❌ cardinfo.astro**
* **❌ CARDINFO.astro**

The variants, should start with the same word, for better organization and search

Assuming that there are 3 types of buttons, all should start with the word “Button”

* **✅ ButtonLink.tsx**
* **✅ ButtonAction.tsx**
* **✅ ButtonSubmit.tsx**
* **❌ LinkButton.tsx**
* **❌ ActionButton.tsx**
* **❌ SubmitButton.tsx**

## Component height in project

There are 2 types of main components: ui components (basic and reusable components) and sections (organized and mounted components, with data)

The usual structure for small projects is:

```bash
- src
  - components
    - ui
        - forms
          - Input.tsx
          - Button.astro
      - CardInfo.astro # ui component
    - sections
      - About.astro
```