---
title: Astro Design Pattern
description: Our design pattern for building Astro websites
---

## Context

We will use the following design pattern for building Astro websites (component could be astro or react).
Also, we use typescript for all the code.

## Project structure

```bash
src/
├── components/                 # Reusable UI components
│   ├── atoms/                  # Smallest, reusable pieces (Button, Input)
│   ├── layouts/                # UI-level layouts (MainLayout, DashboardLayout)
│   ├── molecules/              # Groups of atoms (Form, Card, NavbarItem)
│   └── organisms/              # Larger components (Header, Footer, HeroSection)
│
├── content/                    # Markdown / CMS collections
│   └── blog/
│
├── features/                   # Business or app-specific modules
│   ├── auth/                   # Login, register, logout, session
│   ├── blog/                   # Posts, categories, comments
│   ├── contact/                # Contact form logic and components
│   └── dashboard/              # Protected UI sections
│
├── layouts/                    # Astro page-level layouts
│   ├── DashboardLayout.astro   # Layout for dashboard or admin pages
│   └── Layout.astro            # Main site layout
│
├── lib/                        # Utilities and helpers
│   ├── api/                    # API services and fetch logic
│   ├── constants/              # Global constants
│   ├── hooks/                  # Custom React hooks
│   └── utils.ts                # Utility functions
│
├── pages/                      # Astro route files (*.astro)
│   ├── index.astro
│   ├── blog/
│   ├── dashboard/
│   └── ...
│
├── styles/                     # Global styles and Tailwind setup
│   └── global.css              # Style variables and Tailwind config
│
├── types/                      # Shared global TypeScript definitions
│   └── user.ts                 # Example: User type definition
│
└── env.d.ts                    # Type declarations for environment variables
```

### Examples of components

```astro
---
//src/components/atoms/Button.astro
const { text = "Click" } = Astro.props;
---
<button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
  {text}
</button>
```

```astro
---
// src/components/molecules/Card.astro
import Button from "../atoms/Button.astro";
const { title, text } = Astro.props;
---
<div class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
  <h2 class="text-lg font-semibold mb-2">{title}</h2>
  <p class="text-gray-600 mb-3">{text}</p>
  <Button text="Learn more" />
</div>
```

```astro
---
// src/components/organisms/Header.astro
---
<header class="bg-blue-600 text-white py-4 px-6">
  <h1 class="text-xl font-bold">My Astro Site</h1>
</header>
```


```astro
---
// src/pages/index.astro
import Layout from "../layouts/Layout.astro";
import Header from "../components/organisms/Header.astro";
import Card from "../components/molecules/Card.astro";
---
<Layout title="Home">
  <Header />
  <main class="p-6 grid gap-4">
    <Card title="Hello Astro" text="This is a simple card." />
  </main>
</Layout>
```


```astro
---
// src/layouts/Layout.astro
const { title } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-gray-50 text-gray-900">
    <slot />
  </body>
</html>
```

## Setup Tailwind & gloabl styles

TODO

## Setup DaisyUI

TODO

## Setup Playwright (for testing)

TODO
