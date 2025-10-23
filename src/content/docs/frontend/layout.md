---
title: Layout
description: How to create a layout in frontend astro projects
---

The default layout its at `src/layouts/Layout.astro`.
It should include the sections visible in all the pages of the project, like the header, footer, whatsapp button, etc.

> Here an a example of a basic layout, with transition animations and SEO slot.

```astro
---
// src/layouts/Layout.astro
// Fonts
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/dm-sans'

// import tailwind css
import '../styles/global.css'

// Components
import Header from '../components/sections/Header.tsx'
import Footer from '../components/sections/Footer.astro'
import WhatsappButton from '../components/ui/WhatsappButton.astro'

// Animations / Transitions
import { ClientRouter } from 'astro:transitions'
---

<!doctype html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta
      name='viewport'
      content='width=device-width'
    />
    <link
      rel='icon'
      type='image/x-icon'
      href='/favicon.ico'
    />
    <meta
      name='generator'
      content={Astro.generator}
    />
    
    <!-- Pages transition -->
    <ClientRouter />

    <!-- SEO Slot: dynamic seo in all pages -->
    <slot name="seo" />
  </head>
  <body>

     <!-- react header -->
    <Header />

    <!-- Wrap pages content in main tag -->
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

```


> Here an a example of the full layout, with multi lang system, transition animations and SEO

```astro
---
// src/layouts/Layout.astro
// Fonts
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/dm-sans'

// import tailwind css
import '../styles/global.css'

// Components
import Header from '../components/sections/Header.tsx'
import Footer from '../components/sections/Footer.astro'
import WhatsappButton from '../components/ui/WhatsappButton.astro'

// i18n
const { lang } = Astro.params as any

// Animations / Transitions
import { ClientRouter } from 'astro:transitions'

// Get current page (for the header component)
const segments = Astro.url.pathname.split('/').filter(Boolean)
const last = segments.at(-1)

let currentPage = last
if (!currentPage || currentPage === 'en' || currentPage === 'es') {
  currentPage = 'home'
}
---

<!doctype html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta
      name='viewport'
      content='width=device-width'
    />
    <link
      rel='icon'
      type='image/x-icon'
      href='/favicon.ico'
    />
    <meta
      name='generator'
      content={Astro.generator}
    />
    
    <!-- Pages transition -->
    <ClientRouter />

    <!-- SEO Slot: dynamic seo in all pages -->
    <slot name="seo" />
  </head>
  <body>

     <!-- react header -->
    <Header
      client:load
      lang={lang}
      page={currentPage}
    />

    <!-- Wrap pages content in main tag -->
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

```
