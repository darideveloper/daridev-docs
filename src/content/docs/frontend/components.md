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

## Html tags

In html, there are many tags that we have to use, for specific purposes.

Some of them are:

- `header`: used to create a header section
- `nav`: used to create a navigation section
- `footer`: used to create a footer section
- `main`: used to create a main section
- `section`: used to create a section
- `article`: used to create an article
- `aside`: used to create an aside section

### Header & Nav

The main tag of the menu / header component, should be used to wrap the content of the header.
Inside the header tag, we can use the `nav` tag to wrap the navigation content.

```js
// components/sections/Header.tsx
import clsx from 'clsx'
import ButtonLink from '../ui/ButtonLink'

export default function Header() {
  return (
    // Main tag of the header component
    // WRONG: <div className={clsx('navbar', 'bg-base-100', 'shadow-sm')}>
    // WRONG: <section className={clsx('navbar', 'bg-base-100', 'shadow-sm')}>
    // CORRECT: 
    <header className={clsx('navbar', 'bg-base-100', 'shadow-sm')}>
      <div className={clsx('navbar-start')}>
        <a
          className={clsx('text-xl')}
          href='/'
        >
          <img
            src='/logo.webp'
            alt='Logo'
            className={clsx('h-6', 'md:h-10')}
          />
        </a>
      </div>

      {/* Navigation content */}
      {/* WRONG: <div className={clsx('navbar-center', 'hidden lg:flex')}> */}
      {/* CORRECT: */}
      <nav className={clsx('navbar-center', 'hidden lg:flex')}>
        <ul className={clsx('menu menu-horizontal', 'px-1')}>
          <li>
            <a href='/'>Inicio</a>
          </li>
          <li>
            <a href='/about'>Qué Ofrecemos</a>
          </li>
          <li>
            <a href='/pricing'>Precios</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

### Footer

The main tag of the footer component, should be used to wrap the content of the footer.
Inside the footer tag, we can also use the `nav` tag to wrap the navigation content, but it's not required.

```js
// components/sections/Footer.tsx
import clsx from 'clsx'
import ButtonLink from '../ui/ButtonLink'

export default function Footer() {
  return (
    // Main tag of the footer component
    // WRONG: <div className={clsx('footer', 'bg-base-100', 'shadow-sm')}>
    // WRONG: <section className={clsx('footer', 'bg-base-100', 'shadow-sm')}>
    // CORRECT: 
    <footer className={clsx('footer', 'bg-base-100', 'shadow-sm')}>
      {/* Footer content */}
      {/* WRONG: <div className={clsx('footer-content')}> */}
      {/* CORRECT: */}
      <nav className={clsx('footer-nav')}>
        <ul className={clsx('menu menu-horizontal', 'px-1')}>
          <li>
            <a href='/'>Inicio</a>
          </li>
          <li>
            <a href='/about'>Qué Ofrecemos</a>
          </li>
          <li>
            <a href='/pricing'>Precios</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
```

### Main

The main tag of the main component, should be used to wrap the content of the main section.
Usually, we add in the layout, next to the header and footer

```astro
---
// layout/Layout.astro

// Fonts
import '@fontsource-variable/inter';
import '@fontsource/belleza';

// Styles
import '../styles/global.css';

// Components
import Header from "../components/sections/Header.tsx";
import Footer from "../components/sections/Footer";
---

<!doctype html>
<html lang="en" data-theme="winter">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="generator" content={Astro.generator} />
		<title>Astro Basics</title>
	</head>
	<body class:list={["bg-base-200"]}>
		<Header />
		<!-- main content -->
		<main>
			<slot />
		</main>
		<Footer />
	</body>
</html>
```

### Article

Articules are small content blocks, usually used to display a single piece of content.
Example: single pricing card, a testimonial card, a product, etc
We should use the `article` tag to wrap the content of the article inside the component
The articules / card don't have `container` class, because they are not the main content of the section.

```astro
// components/sections/Pricing.astro
---

// Props
interface Props {
  title: string;
  description: string;
  image: string;
}

cosnt { title, description, image } = Astro.props as Props;
---

<!-- Article tag and no container class -->
<article class:list={["py-16", "md:py-24"]}>
  <h2 class:list={["text-2xl", "font-bold"]}>{title}</h2>
  <p class:list={["text-gray-600"]}>{description}</p>
  <img src={image} class:list={["rounded-2xl"]} />
</article>
```

### Section

Each section component, should use the `section` tag to wrap the content of the section. Also, it should have `container` class, to delimit the content.
Check more details about container in [Container](./container.md) page.
Usually, we use components inside the sections using looop rendering, to display a list of items.

```astro
---
// components/sections/About.astro
import Card from "../ui/Card.astro";

// data
const cards = [
  {
    title: "Card 1",
    description: "Description 1",
    image: "/image1.jpg",
  },
  {
    title: "Card 2",
    description: "Description 2",
    image: "/image2.jpg",
  },
  {
    title: "Card 3",
    description: "Description 3",
    image: "/image3.jpg",
  },
];
---
<!-- Section tag and container -->
<section class:list={["container", "py-16", "md:py-24"]}>
  {cards.map((card) => (
    <Card key={card.title} title={card.title} description={card.description} image={card.image} />
  ))}
</section>

<!-- Html result: 
<section class="container py-16 md:py-24">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-0 md:px-4">
    <article class="py-16 md:py-24">
      <h2 class="text-2xl font-bold">Card 1</h2>
      <p class="text-gray-600">Description 1</p>
      <img src="/image1.jpg" class="rounded-2xl" />
    </article>
    <article class="py-16 md:py-24">
      <h2 class="text-2xl font-bold">Card 2</h2>
      <p class="text-gray-600">Description 2</p>
      <img src="/image2.jpg" class="rounded-2xl" />
    </article>
    <article class="py-16 md:py-24">
      <h2 class="text-2xl font-bold">Card 3</h2>
      <p class="text-gray-600">Description 3</p>
      <img src="/image3.jpg" class="rounded-2xl" />
    </article>
</section>
-->
```

### Aside

The aside tag is used to wrap the content of the aside section.
Usually, we use the aside tag to wrap the content of the sidebar (like a dahsboard navigation menu)

```astro
// components/sections/Sidebar.astro
---
---

<!-- Aside tag and container -->
<!-- WRONG: <div class:list={["container", "py-16", "md:py-24"]}> -->
<!-- CORRECT: -->
<aside class:list={["container", "py-16", "md:py-24"]}>
  <nav class:list={["menu", "menu-horizontal"]}>
    <ul class:list={["menu-list"]}>
      <li>
        <a href="/">Home</a>
      </li>
    </ul>
  </nav>
</aside>
```