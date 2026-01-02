---
title: Astro Design Pattern
description: Our design pattern for building Astro websites
---


Learn more about how and when to use react components or astro components in [Less React as Possible](../less-react-as-possible)

## Context

We will use the following design pattern for building Astro websites (component could be astro or react).
Also, we use typescript for all the code.

## Project structure

```bash
src/
├── components/                 # Reusable UI components
│   ├── atoms/                  # Smallest, reusable pieces (Button, Input)
│   ├── molecules/              # Groups of atoms (Form, Card, NavbarItem)
│   └── organisms/              # Larger components (Header, Footer, HeroSection)
│
├── content/                    # Markdown / CMS collections
│   └── blog/
│
├── assets/                     # Folder for static assets
│   └── images/                 # Images to be rendered /optimized by astro
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
─── env.d.ts                    # Type declarations for environment variables (at same level as src and public folders)
─── .env                        # Environment variables (at same level as src and public folders)
─── .env.production             # Production environment variables (at same level as src and public folders)
─── .gitignore                   # Git ignore file (at same level as src and public folders)
...
```

### Examples of components

```astro
---
//src/components/atoms/Button.astro

// Libs
import { clsx } from 'clsx'

// Props
const { text = "Click" } = Astro.props;
---
<button
  class={clsx(
    'px-4',
    'py-2',
    'bg-blue-600 hover:bg-blue-700', 
    'text-white',
    'rounded-lg'
  )}
>
  {text}
</button>

```

```astro
---
// src/components/molecules/Card.astro

// Libs
import { clsx } from 'clsx'

// Components
import Button from "../atoms/Button.astro";

// Props
const { title, text } = Astro.props;
---
<div
  class={clsx(
    'p-4',
    'bg-white',
    'rounded-xl',
    'shadow-sm',
    'border',
    'border-gray-100'
  )}
>
  <h2 class={clsx('text-lg', 'font-semibold', 'mb-2')}>{title}</h2>
  <p class={clsx('text-gray-600', 'mb-3')}>{text}</p> 
  <Button text='Learn more' />
</div>

```

```astro
---
// src/components/organisms/Header.astro

// Libs
import { clsx } from 'clsx'
---
<header class={clsx('bg-blue-600', 'text-white', 'py-4', 'px-6')}>
  <h1 class={clsx('text-xl', 'font-bold')}>My Astro Site</h1>
</header>

```


```astro
---
// src/pages/index.astro
import Layout from "../layouts/Layout.astro";
import Card from "../components/molecules/Card.astro";
---
<!-- Header, Footer and html main tag, already included in the layout -->
<Layout title="Home">
  <Card title="Hello Astro" text="This is a simple card." />
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
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

> Learn more about the layout in [Layout](../layout)

> Learn more about the components in [Components](../components)