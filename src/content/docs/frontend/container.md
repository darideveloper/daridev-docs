---
title: Container
description: Como utilizar container de talwind en projectos frontend
---

Usa container en el contenido principal de cada sección, para delimitar un ancho máximo. 

En los ajustes del proyecto, la clase “container” podría ya tener pre cargadas algunas configuraciones globales, como padding y margin

## Sección sin container 

![Sección sin container](../../../assets/container-sin.webp)

## Sección con container 

El contenido tiene un ancho máximo, aun que la pantalla sea muy grande. 

También (si la clase ya está configurada) el contenido se centra (margin derecho e izquierdo automático)

![Sección con container](../../../assets/container-con.webp)

<details>
<summary>Código de ejemplo para la configuración global del container</summary>

Código de ejemplo para la configuración global del container

Código añadido a los estilos globales del proyecto (adicional a lo que tailwind nos ofrece defecto).

**No necesitas añadir esté código, la persona que cree el proyecto base se encargará de eso**

```css
/*src/styles/global.css*/
.container {
  margin: 0 auto; /*centrar contenido*/
  max-width: 1350px; /*ancho máximo*/
  padding: 4rem 1rem; /*padding*/
}
```

</details>


### Código con container

```astro
// src/components/sections/ejemplo.astro
---
import Card from "../ui/Card.astro";
---

<!-- Clase 'container' añadida al padre del contenido principal (la sección completa en este caso) -->
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