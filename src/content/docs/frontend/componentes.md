---
title: Componentes
description: Generalidades sobre los componentes frontend y prácticas del equipo de desarrollo
---

## Nombrar componentes

Los componentes deben usar camel case. Ejemplo:

* **✅ CardInfo.astro**
* **❌ cardInfo.astro**
* **❌ card-info.astro**
* **❌ card_info.astro**
* **❌ cardinfo.astro**
* **❌ CARDINFO.astro**

Las variantes, deben comenzar por la misma palabra, para su mejor organización y búsqueda

Suponiendo que 3 tipos de botones, todos deben comenzar con la palabra “Button”

* **✅ ButtonLink.tsx**
* **✅ ButtonAction.tsx**
* **✅ ButtonSubmit.tsx**
* **❌ LinkButton.tsx**
* **❌ ActionButton.tsx**
* **❌ SubmitButton.tsx**

## Estatura de componentes en proyecto

Tenemos 2 tipos de componentes principales: componentes de ui (componentes básicos y reutilizables) y secciones (conjuntos de componentes organizados y montados, con datos)

La estructura habitual para proyectos pequeños es:

- src
    - componentes
        - ui
            - forms
                - Input.tsx
                - Button.astro
            - **CardInfo.astro**
        - sections
            - About.astro