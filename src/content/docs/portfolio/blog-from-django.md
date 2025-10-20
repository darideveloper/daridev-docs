---
title: Post Blog from Django dashboard
description: How to create a blog in the team portfolio from Django dashboard
---

## Context

Currently, the team portfolio is a static website, with a blog section.
The portfolio its created with Nextjs, and the blog are markdown files in the `src/content/docs/blog` directory.
We have a Django Dashboard wehere SEO experts can create and manage the blog posts, but the updates are not reflected in the portfolio website, then, we need to manually update the blog posts in the portfolio website.

## 1. Get posts data

1. Login in service dashboard: [https://servcies.darideveloper.com](https://servcies.darideveloper.com)
2. Open [/admin/blog/post/?status__exact=done&q=&o=4](https://servcies.darideveloper.com/admin/blog/post/?status__exact=done&q=&o=4) (this link already has the filters applied to get the post ready to bu published)
3. Open the first post in the list

## 2. Create a new post in the portfolio website

1. Create a new file at src/app/[locale]/blog/posts/es (the file name should be the slug of the dashboard post)
2. Update the metadata using the data from the dashboard post
3. paste the post content from the dashboard post

## 3. Translate to EN

1. Copy the file to src/app/[locale]/blog/posts/en (keep the same file name)
2. Update metadata to Eng using gemini. Ask like:
```
Translate this markdown metadata to English. Keep the same format and structure.
---
title: "Desarrollo Web para Restaurantes en Aguascalientes: ¡Vende Más Online!"
publishedAt: "2025-10-02"
image: "https://daridev-services.s3.amazonaws.com/media/blog/images/Desarrollador_Web_Restaurantes_Aguascalientes_Digitaliza_tu_%C3%89xito.488Z.png"
summary: "¡Impulsa tu restaurante en Aguascalientes! Desarrollador web experto crea sitios con pedidos, reservas y SEO local. Atrae más clientes y ventas. ¡Haz crecer tu negocio hoy!"
tag: ["desarrollador web restaurantes", "Aguascalientes", "pedidos online", "reservas online", diseño web restaurantero"]
author: "daridev"
---
```
3. Update the post content to Eng using gemini. Ask like:
```
Translate this markdown content to English. Keep the same format and structure.
...markdown content...
```

