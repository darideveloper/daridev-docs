---
title: Setup Astro Project
description: How to setup an Astro project with all the team tools and practices
---

# TODO: add multi lang always

## Follow the CLI wizard

We will install Astro using the CLI wizard.

More info in [Astro Docs](https://docs.astro.build/en/install-and-setup/).

```bash
# in project folder
npm create astro@latest
# 1. Set project name and path
# 2. Set template (A basic)
# 3. Install dependencies (Yes)
# 4. Initialize git repository (Yes)
# 5. Wait until project is created
```

## Tailwind & global styles

We will use talwind for styling.

More info about how to setup Tailwind CSS v4 in Astro in [Astro Docs](https://docs.astro.build/en/guides/styling/#tailwind)

1. Install with astro CLI
```bash
npx astro add tailwind
# accept all defaults
```

1. Add to layout and remove the default styles at the bottom

```astro
---
// src/layouts/Layout.astro

// Styles
import '../styles/global.css';
---

<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="generator" content={Astro.generator} />
		<title>Astro Basics</title>
	</head>
	<body>
		<slot />
	</body>
</html>

<!-- Remove this -->
<!-- <style>
	html,
	body {
		margin: 0;
		width: 100%;
		height: 100%;
	}
</style> -->
```

> Read more about the full layout setup in [Layout](../layout)

1. Check if working with a basic page `/test`

```astro
// src/pages/test.astro
---
// Components
import Layout from "../layouts/Layout.astro";

// Libs
import { clsx } from 'clsx'
---
<Layout title="Test">
  <h1 class={clsx("text-3xl font-bold underline")}>Test</h1>
</Layout>
```

## Install general Libraries & Frameworks

There are some general libraries and frameworks that we will install in many projects.

```bash
npm install clsx # to format classes / class names
npx astro add react # to use daisyui components (accept all defaults)
npx astro add astro-show-tailwindcss-breakpoint # to show tailwindcss breakpoints in the browser (accept all defaults)
npm install sweetalert2 # to use sweetalert2 for alerts (optional: only if required)
npm i swiper # to use swiper for carousels (optional: only if required)
```

## Update package.json

Add this line at the end of you package.json file, after the "dependencies" section to use node 20 in production:

```json
// package.json
{
    "dependencies": {
      ...
    },
    "engines": {
      "node": ">=20.3.0"
    }
}
```

## Env variables

We will use env files to store the environment variables for the project.

1. Create two files: `.env` and `.env.production` and add the following variable (this if for production)

```bash
// .env
NIXPACKS_NIXPKGS=nodejs_20,npm-9_x
```

```bash
// .env.production
NIXPACKS_NIXPKGS=nodejs_20,npm-9_x
```

## Project structure

Create the required folders to follow our [Astro Design Pattern](../astro-design-pattern) and delete any astro sample component and assets.

## Styles

### DaisyUI (optional: only if required)

In some project wehere we don't have a UI/UX design, we could use daisyui to add some basic UI features.

1. Install daisyui

```bash
npm installaisyui@latest
```

2. Add DaisyUI plugin to global css file.
Add this line to **the start** or you `global.css` file. After the tailwind plugin.

```css
/* src/styles/global.css */
@import "tailwindcss";
@plugin "daisyui"; /* Add this line */
```

1. Add DaisyUI theme to html tag in layout

[All themes](https://daisyui.com/docs/themes/#list-of-themes)

```astro
// src/layouts/Layout.astro
---
import '../styles/global.css';
---

<!-- add "data-theme" attribute to html tag. 
Example: data-theme="winter" -->
<html lang="en" data-theme="{theme-name}">
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>
  </head>
  <body class="">
    <slot />
  </body>
</html>
```

### Global styles

Add this content **to the end** of the global css file. This is a general configuration for the project:

```css
/* src/styles/global.css */
...

/* Hide horizontal scrollbar */
html,
body {
  margin: 0;
  width: 100%;
  overflow-x: hidden;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Cenetr tailwind container and add padding */
.container {
  margin: 8rem auto;
  max-width: 1350px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

/* Debug border */
.debug {
  border: 1px solid red;
}

/* Remove margin and padding from paragraphs */
p {
  margin: 0;
  padding: 0;
}
```

### Branding (colors and fonts)

We should setup the branding of the project as css variables: colors, fonts, etc.

#### Install fonts

1. Install any font from [Fontsourc](https://fontsource.org/)

```bash
# Example: install montserrat font
npm install @fontsource-variable/montserrat
```

2. Import the font in the layout, before the global css file

You could check the import code of the fonts from the fontsouce website.

```astro
// src/layouts/Layout.astro
---
// Fonts
import '@fontsource-variable/montserrat';

// Css
import '../styles/global.css';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>
  </head>
  <body class="">
    <slot />
  </body>
</html>
```

Done. The fonts its now ready to use from the css variables (check next section)

#### Colors (css variables)

At **the start** of the global css file, after the imprts / plugins, you could add some content like the following:

You can also check the css name of the fonts from the fontsouce website.

```css
@theme {
  --font-title: "Playfair Display Variable", serif; /* Title font from fontsouce */
  --font-sans: "DM Sans Variable", sans-serif; /* Regular font from fontsouce */
  --color-white: #f2ede9;
  --color-brown: #96591a;
  --color-brown-light: #bf9c80;
  --color-pink: #dbbcb9;
  --color-pink-light: #ebd0bf;
  --color-black: #381e04;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-title);
}

/* Update body to use the regular font by default */
body {
  ...
  font-family: var(--font-sans);
}
/*  */
```

> Note: the colors from the css variables could be skipped if we are using DaisyUI, but they are also required for some sections (like the Custom scroll bar)

### Custom scroll bar

Add a code like this at the end of the global css file, but using your css colors variables.

```css

/* Custom scroll bar */

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--color-white);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color-brown);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--color-brown-light);
}
```

> Note: You could check the custom scroll bar creating a page with a long content, to see how it works.

#### Example of full css file

This a full css file (without daisyui).

```css
@import 'tailwindcss';

@theme {
  --font-title: 'Montserrat Variable', sans-serif;
  --font-sans: 'Montserrat Variable', sans-serif;
  --color-red: #f92905;
  --color-white: #ffffff;
  --color-black: #000000;
  --color-grey-dark: #4d4d4d;
  --color-grey-light: #7e807f;
}

/* Hide horizontal scrollbar */
html,
body {
  margin: 0;
  width: 100%;
  overflow-x: hidden;
  font-family: var(--font-sans);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Cenetr tailwind container and add padding */
.container {
  margin: 8rem auto;
  max-width: 1350px;
  margin: 0 auto;
  padding: 4rem 1rem;
}

/* Debug border */
.debug {
  border: 1px solid red;
}

/* Remove margin and padding from paragraphs */
p {
  margin: 0;
  padding: 0;
}

/* Set title font to heading elements */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-title);
}

/* Custom scroll bar */

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--color-white);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color-red);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--color-grey-dark);
}
```

## Zustand (optional: only if required)

1. Install zustand

```bash
npm install zustand
```

2. Create a new store

All stores should be at `/src/libs/stores/`
Example: 

```typescript
// src/libs/stores/storeAuth.ts
import { create } from 'zustand';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
```

> Check in detail the file name and export const name, as reference

3. Use inside react components

```typescript
// src/components/atoms/Button.tsx

// Import the store
import { useAuthStore } from '../../libs/stores/storeAuth';

export default function Button() {
  // Use store state and actions
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

  return (
    <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
  );
}
```

## 404 page

## Translation system

## Testing