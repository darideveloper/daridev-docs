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

## Component place in project

There are 3 types of main components: atoms (smallest, reusable pieces), molecules (groups of atoms) and organisms (larger components)

> Learn more about the components folder structure in [Astro Design Pattern](../astro-design-pattern)


## Styling Tailwind classes

In the team, we use talwind classes to style the components.

> learn more about how to setup Talwin in astro in [Setup Astro Project](../setup-astro-project/#tailwind--global-styles)

We use an specific way to style the components, using the `clsx` library, in both **astro** and **react** components.
Lets explain how to use it

### Details about our style pattern

Example: 

#### 1. We have a component with too many classes, inclusing variants: hover effects and responsive

```astro
---
// src/components/atoms/Button.astro
---
<article class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg md:px-8 md:py-4 md:bg-red-600" />
```

As you can see, its a bit difficult to read and understand the code. Also, it use too much space in the creen.
Instead, we can import the `clsx` library and use it to style the component (already instaleld from [Setup Astro Project](../setup-astro-project/#install-general-libraries--frameworks))

Using this library, we can save each class/style in a separated string

#### 2. Use `clsx`

We can import it at the top of the component, and apply the classes to the component using the `clsx` function

```astro
---
// src/components/atoms/Button.astro

// Libs
import clsx from 'clsx'
---
<article class={clsx("px-4", "py-2", "bg-blue-600", "hover:bg-blue-700", "text-white", "rounded-lg", "md:px-8", "md:py-4", "md:bg-red-600")} />
```

#### 3. Formatted with astro

After that, we can easy format the code with astro, to make it more readable

```astro
---
// src/components/atoms/Button.astro

// Libs
import clsx from 'clsx'
---
<article
  class={clsx(
    'px-4',
    'py-2',
    'bg-blue-600',
    'hover:bg-blue-700',
    'text-white',
    'rounded-lg',
    'md:px-8',
    'md:py-4',
    'md:bg-red-600',
  )}
>
</article>
```

4. Variants at the same string

Finally, we can place the variants (hover, responsive, etc) at the same string, to make it more maintainable

```astro
<article
  class={clsx(
    'px-4 md:px-8',
    'py-2 md:py-4',
    'bg-blue-600 md:bg-red-600 hover:bg-blue-700',
  )}
>
</article>
```

In this way, we can easily add more classes to the component, without breaking the code. Also, we can easily do any change.

> Summary: we use the `clsx` library to style the components and pleace the variants at the same string, to make it more maintainable and readable.

### Styles from outside components

All components should get the prop "className" to style the component from outside.

Example: we have the same react and astro components, and both gets the className prop to style the component from outside.

```astro
---
// src/components/atoms/ButtonAstro.astro

// Libs
import clsx from 'clsx'

// Props
interface Props {
  className?: string;
}

const { className } = Astro.props as Props;
---
<button class={clsx("px-4", className)}></button>
```

```typescript
// src/components/atoms/ButtonReact.tsx

// Libs
import clsx from 'clsx'

// Props
interface Props {
  className?: string;
}

export default function Button({ className }: Props) {
  return (
    <button className={clsx("px-4", className)}>
    </button>
  );
};
```

Inside a parent component, we can use the `className` prop to style the component from outside (example: size, align, etc).

```astro
---
// src/components/molecules/Card.astro

// Libs
import clsx from 'clsx'

// Components
import ButtonAstro from '../atoms/ButtonAstro.astro'
import ButtonReact from '../atoms/ButtonReact.tsx'
---
<div>
  <!-- Outside styles -->
  <ButtonAstro className={clsx("w-full")} />
  <ButtonReact className={clsx("w-full")} />
</div>
```

### Vanilla html vs Astro vs React

In vanilla html, we should use the `class` attribute to style the tags, but if is an astro or react component, we should use the `className` prop to style the component from outside.
Continue with the example of the previous section:

```astro
---
// src/components/molecules/Card.astro

// Libs
import clsx from 'clsx'

// Components
import ButtonAstro from '../atoms/ButtonAstro.astro'
import ButtonReact from '../atoms/ButtonReact.tsx'
---
<!-- Add styles to vanilla html tags -->
<div class={clsx("p-4")}>
  <!-- Add styles to astro components -->
  <ButtonAstro className={clsx("w-full")} />
  <!-- Add styles to react components -->
  <ButtonReact className={clsx("w-full")} />
</div>
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
// components/organisms/Header.tsx

// Libs
import clsx from 'clsx'

// Components
import ButtonLink from '../atoms/ButtonLink.astro'

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
            className={clsx('h-6 md:h-10')}
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
// components/organisms/Footer.tsx

// Libs
import clsx from 'clsx'

// Components
import ButtonLink from '../atoms/ButtonLink'

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

> Read more about the layout in [Layout](../layout)

### Article

Articules are small content blocks, usually used to display a single piece of content.
Example: single pricing card, a testimonial card, a product, etc
We should use the `article` tag to wrap the content of the article inside the component
The articules / card **don't have `container` class**, because they are not the main content of the section.

```astro
---
// components/molecules/Pricing.astro

// Props
interface Props {
  title: string;
  description: string;
  image: string;
}

cosnt { title, description, image } = Astro.props as Props;
---

<!-- Article tag and no container class -->
<article class={clsx("py-16 py-24")}>
  <h2 class={clsx("text-2xl", "font-bold")}>{title}</h2>
  <p class={clsx("text-gray-600")}>{description}</p>
  <img src={image} class={clsx("rounded-2xl")} />
</article>
```

### Section

Each section component, should use the `section` tag to wrap the content of the section. Also, it should have `container` class, to delimit the content.
Check more details about container in [Container](../container) page.
Usually, we use components inside the sections using loop rendering, to display a list of items.

```astro
---
// components/organisms/About.astro

// Libs
import clsx from 'clsx'

// Components
import Card from "../molecules/Card.astro";

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
<section class={clsx("container", "py-16 md:py-24")}>
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
---
// components/organisms/Sidebar.astro

// Libs
import clsx from 'clsx'
---

<!-- Aside tag and container -->
<!-- WRONG: <div class:list={["container", "py-16", "md:py-24"]}> -->
<!-- CORRECT: -->
<aside class={clsx("container", "py-16 md:py-24")}>
  <nav class={clsx("menu", "menu-horizontal")}>
    <ul class={clsx("menu-list")}>
      <li>
        <a href="/">Home</a>
      </li>
    </ul>
  </nav>
</aside>
```