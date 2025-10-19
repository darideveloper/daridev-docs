---
title: Container
description: How to use container in frontend projects
---

Use container in the main content of each section, to delimit a maximum width. 

In the project settings, the "container" class could already have some global configurations, like padding and margin

## Section without container 

![Section without container](../../../assets/container-sin.webp)

## Section with container 

The content has a maximum width, even if the screen is very large. 

Also (if the class is already configured) the content is centered (automatic right and left margin)

![Section with container](../../../assets/container-con.webp)

<details>
<summary>Example code for the global container configuration</summary>

Example code for the global container configuration

Code added to the global project styles (additional to what tailwind offers by default).

**You don't need to add this code, the person who creates the base project will take care of it**

```css
/*src/styles/global.css*/
.container {
  margin: 0 auto; /*center content*/
  max-width: 1350px; /*maximum width*/
  padding: 4rem 1rem; /*padding around the content*/
}
```

</details>


### Code with container

```astro
// src/components/sections/ejemplo.astro
---
import Card from "../ui/Card.astro";
---

<!-- 'container' class added to the parent of the main content (the section in this case) -->
<section class:list={["container", "py-16", "md:py-24"]}>
  <div
    class:list={[
      "grid",
      "grid-cols-1 md:grid-cols-2",
      "gap-8 md:gap-12",
      "items-center",
      "px-0 md:px-4",
    ]}
  >
    <div class:list={["flex", "justify-center", "md:justify-end"]}>
      <img src="/doctor.png" class:list={["rounded-2xl"]} />
    </div>

    <div class:list={["shadow-none"]}>
      <Card title="Tu Objetivo es Nuestro Objetivo">
        <p class:list={["mb-4", "text-neutral"]}>
          ...
        </p>
      </Card>
    </div>
  </div>
</section>
```

## Full Width Sections

We can make full width sections and still use container to delimit the content

Example usage: a section that has to have a background color

### Original section with errors

The background does not cover the entire page width

```astro
// src/components/sections/test.astro
---
import H2 from "../ui/H2";
import ButtonLink from "../ui/ButtonLink";
---

<section class:list={["hero", "bg-secondary", "text-secondary-content", "py-24"]}>
  <div class:list={["hero-content", "text-center"]}>
    <div class:list={["max-w-xl"]}>
      <H2 className="!text-white">
        ¿Lista para empezar a sumar Gofitos?
      </H2>
      <p class:list={["py-6"]}>
        Tu plaza está más cerca de lo que crees. Da el primer paso hoy mismo con
        acceso completo a todas las herramientas.
      </p>
      <ButtonLink isSoft href="/#">
        Empezar mi prueba gratis de 24 horas
      </ButtonLink>
    </div>
  </div>
</section>
```

![Sección original](../../../assets/container-original.webp)

### Applying container

The background now covers the entire content, but does not overflow the maximum size

```astro
// src/components/sections/test.astro
---
import H2 from "../ui/H2";
import ButtonLink from "../ui/ButtonLink";
---

<!-- Main section without container: 'w-full' for full width -->
<section class:list={["w-full", "hero", "bg-secondary", "text-secondary-content", "py-24"]}>
  <!-- 'container' class used inside a div, to delimit the content -->
  <div class:list={["container", "hero-content", "text-center"]}>
    <div class:list={["max-w-xl"]}>
      <H2 className="!text-white">
        ¿Lista para empezar a sumar Gofitos?
      </H2>
      <p class:list={["py-6"]}>
        Tu plaza está más cerca de lo que crees. Da el primer paso hoy mismo con
        acceso completo a todas las herramientas.
      </p>
      <ButtonLink isSoft href="/#">
        Empezar mi prueba gratis de 24 horas
      </ButtonLink>
    </div>
  </div>
</section>
```

![Section with container](../../../assets/container-full-width.webp)

## Don't nest container inside other container

Be careful the containers: don't nest container inside other container, because it will break the layout.

```astro
---
// components/sections/Features.astro
---

<section class:list={["container", "py-16", "md:py-24"]}>
  <div class:list={["grid", "grid-cols-1 md:grid-cols-2", "gap-8 md:gap-12", "items-center", "px-0 md:px-4"]}>
    <div class:list={["flex", "justify-center", "md:justify-end"]}>
      <img src="/doctor.png" class:list={["rounded-2xl"]} />
    </div>
  </div>
</section>
```


```astro
---
// pages/index.astro

// Components
import Layout from "../layouts/Layout.astro";
import Features from "../components/sections/Features.astro";
---

<Layout>

  <!-- Here is a div with container class -->
  <div class:list={["container", "mx-auto", "px-4", "py-12"]}>
    <h1>Hello World</h1>

    <!-- WRONG: this component already has a container class -->
    <!-- Cannot be nested inside other container -->
    <!-- <Features /> -->
  </div>

  <!-- Correct: no container class here -->
  <Features />
</Layout>
```
