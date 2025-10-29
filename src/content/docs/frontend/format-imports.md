---
title: Format Imports
description: How to format imports in frontend projects
---

In both, astro and react components, we could have many imports, like: other components, libraries, hooks, etc.
The team practice its group them by category.

Be sure about always place the **imports** at the **top of the file**, before the components, types, hooks, etc.

Here some examples:

## Example 1 Layout.astro (astro)

### Before formatting

```astro
---
// /src/layouts/Layout.astro
interface Props {
  avatarUrl?: string;
  userName?: string;
  userEmail?: string;
}

import '@fontsource-variable/inter';
import '../styles/global.css';
import AdminNavbar from '../components/organisms/admin/Navbar';
import '@fontsource/belleza';
import AdminDrawer from '../components/organisms/admin/Drawer';

// Props
const {
  avatarUrl,
  userName = "Administrador",
  userEmail = "administrador@gmail.com",
} = Astro.props as Props;
---


<!doctype html>
<html
  lang='en'
  data-theme='winter'
>
...
</html>
```

> This example is really small, but you can see, there is a bit difficult to read and undertand whats its already in the code.


### After formatting

```astro
---
// /src/layouts/Layout.astro
// Fonts
import '@fontsource-variable/inter';
import '@fontsource/belleza';

// Styles
import '../styles/global.css';

// Components
import AdminNavbar from '../components/organisms/admin/Navbar';
import AdminDrawer from '../components/organisms/admin/Drawer';

// Props
interface Props {
  avatarUrl?: string;
  userName?: string;
  userEmail?: string;
}

const {
  avatarUrl,
  userName = "Administrador",
  userEmail = "administrador@gmail.com",
} = Astro.props as Props;
---


<!doctype html>
<html
  lang='en'
  data-theme='winter'
>
...
</html>
```

> Now, its much easier to read and understand the code. Also, its easier to add new imports or remove them

<details>
<summary>Extra tip</summary>
you can also order alphabetically the imports inside each category, to make it more readable
</details>

## Example 2 Testimonials.tsx (react)

### Before formatting

```typescript
// /src/components/organisms/Testimonials.tsx

type Testimonial = {
  name: string
  title: string
  stars: number
  testimonial: string
  avatar: string
}

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { clsx } from 'clsx'
import TestimonialCard from '../molecules/TestimonialCard'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import H2 from '../atoms/H2.tsx'

type TestimonialsProps = {
  items?: Testimonial[]
  className?: string
  autoplayMs?: number
  loop?: boolean
}

const defaultItems: Testimonial[] = [
  {
    name: 'María González',
    title: 'Aprobada en Justicia 2024',
    stars: 5,
    testimonial:
      'Después de tres años intentándolo por mi cuenta, esta plataforma marcó la diferencia. Los test personalizados que se adaptan a tus puntos débiles y el sistema de repaso espaciado fueron clave para conseguir mi plaza. No se me olvidaba nada el día del examen.',
    avatar: '/testimonials/maria-gonzalez.webp',
  },
  {
    name: 'Juan Pérez Martínez',
    title: 'Opositor de Hacienda',
    stars: 5,
    testimonial:
      'Llevo 8 meses usándola y ha transformado mi forma de estudiar. Todo está actualizado con la última legislación y los simulacros son muy realistas. Poder estudiar desde el móvil me permite aprovechar cada momento libre. Mis resultados han mejorado un 35%.',
    avatar: '/testimonials/juan-perez-martinez.webp',
  },
  {
    name: 'Laura Martín Ruiz',
    title: 'Preparando Auxiliar Administrativo',
    stars: 4,
    testimonial:
      'Perfecto para compaginar trabajo y estudio. El panel de estadísticas me ayuda a ver qué temas reforzar y los test son muy similares a los reales. Solo le falta añadir más casos prácticos resueltos, pero por lo demás es excelente.',
    avatar: '/testimonials/laura-martin-ruiz.webp',
  },
  {
    name: 'Carlos Rodríguez',
    title: 'Maestro de Educación Primaria',
    stars: 5,
    testimonial:
      'Aprobé el año pasado gracias a esta plataforma. La comunidad de opositores es muy activa y los recursos para preparar la programación didáctica me ahorraron semanas de trabajo. Los tutores realmente saben de lo que hablan. Totalmente recomendable.',
    avatar: '/testimonials/carlos-rodriguez.webp',
  },
  {
    name: 'Ana Sánchez Torres',
    title: 'Opositora de Enfermería',
    stars: 5,
    testimonial:
      'Como madre de dos niños, optimizar el tiempo es crucial. Esta plataforma me permite estudiar en sesiones cortas adaptadas a mi disponibilidad. Los vídeos son concisos y el sistema me recuerda qué repasar. En 5 meses he mejorado muchísimo.',
    avatar: '/testimonials/ana-sanchez-torres.webp',
  },
  {
    name: 'David López García',
    title: 'Administrativo del Estado',
    stars: 4,
    testimonial:
      'Tras suspender por poco, esta herramienta me dio el empujón que necesitaba. Banco enorme de preguntas siempre actualizado y test personalizables por temas. Mi velocidad resolviendo ejercicios ha aumentado considerablemente. Las estadísticas comparativas son muy útiles.',
    avatar: '/testimonials/david-lopez-garcia.webp',
  },
]

export default function Testimonials
    ...
```

> As you can see, this component its a bit more exomplex, because it includes data, types, libraries and components. Just in cases like this, we should format the imports to make it more readable.

### After formatting

```typescript
// /src/components/organisms/Testimonials.tsx

// Libs
import { clsx } from 'clsx'

// Components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import TestimonialCard from '../molecules/TestimonialCard'
import H2 from '../atoms/H2.tsx'

// Styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Types
type Testimonial = {
  name: string
  title: string
  stars: number
  testimonial: string
  avatar: string
}

type TestimonialsProps = {
  items?: Testimonial[]
  className?: string
  autoplayMs?: number
  loop?: boolean
}

// Data
const defaultItems: Testimonial[] = [
  {
    name: 'María González',
    title: 'Aprobada en Justicia 2024',
    stars: 5,
    testimonial:
      'Después de tres años intentándolo por mi cuenta, esta plataforma marcó la diferencia. Los test personalizados que se adaptan a tus puntos débiles y el sistema de repaso espaciado fueron clave para conseguir mi plaza. No se me olvidaba nada el día del examen.',
    avatar: '/testimonials/maria-gonzalez.webp',
  },
  {
    name: 'Juan Pérez Martínez',
    title: 'Opositor de Hacienda',
    stars: 5,
    testimonial:
      'Llevo 8 meses usándola y ha transformado mi forma de estudiar. Todo está actualizado con la última legislación y los simulacros son muy realistas. Poder estudiar desde el móvil me permite aprovechar cada momento libre. Mis resultados han mejorado un 35%.',
    avatar: '/testimonials/juan-perez-martinez.webp',
  },
  {
    name: 'Laura Martín Ruiz',
    title: 'Preparando Auxiliar Administrativo',
    stars: 4,
    testimonial:
      'Perfecto para compaginar trabajo y estudio. El panel de estadísticas me ayuda a ver qué temas reforzar y los test son muy similares a los reales. Solo le falta añadir más casos prácticos resueltos, pero por lo demás es excelente.',
    avatar: '/testimonials/laura-martin-ruiz.webp',
  },
  {
    name: 'Carlos Rodríguez',
    title: 'Maestro de Educación Primaria',
    stars: 5,
    testimonial:
      'Aprobé el año pasado gracias a esta plataforma. La comunidad de opositores es muy activa y los recursos para preparar la programación didáctica me ahorraron semanas de trabajo. Los tutores realmente saben de lo que hablan. Totalmente recomendable.',
    avatar: '/testimonials/carlos-rodriguez.webp',
  },
  {
    name: 'Ana Sánchez Torres',
    title: 'Opositora de Enfermería',
    stars: 5,
    testimonial:
      'Como madre de dos niños, optimizar el tiempo es crucial. Esta plataforma me permite estudiar en sesiones cortas adaptadas a mi disponibilidad. Los vídeos son concisos y el sistema me recuerda qué repasar. En 5 meses he mejorado muchísimo.',
    avatar: '/testimonials/ana-sanchez-torres.webp',
  },
  {
    name: 'David López García',
    title: 'Administrativo del Estado',
    stars: 4,
    testimonial:
      'Tras suspender por poco, esta herramienta me dio el empujón que necesitaba. Banco enorme de preguntas siempre actualizado y test personalizables por temas. Mi velocidad resolviendo ejercicios ha aumentado considerablemente. Las estadísticas comparativas son muy útiles.',
    avatar: '/testimonials/david-lopez-garcia.webp',
  },
]

export default function Testimonials
    ...
```