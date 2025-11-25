---
title: SEO component
description: How to use the SEO component in frontend projects
---

## Preparing (env variables)

Before starting, be sure to have the env variable VITE_BASE_URL set in the .env file, with the current domain of the project.

```bash
# .env
VITE_BASE_URL=https://domain.com
```

## Base component

For easy manage the seo (metadata tags) for each page, we have a component that can be used.

You should have a `src/components/utils/base/BaseSEO.astro` file, with the following content:

```astro
---
// src/components/utils/base/BaseSEO.astro
interface Props {
  currentPage: string; // Current page
  jsonType: string; // Type of the page
  extraJson?: Record<string, any>; // Extra JSON data
  baseDescription?: string; // Description of the page (optional, to ignore i18n)
  baseKeywords?: string; // Keywords of the page (optional, to ignore i18n)
  author?: string; // Author of the page (optional, to ignore i18n)
  useTagLine?: boolean; // Use tag line from i18n
}
const {
  jsonType,
  extraJson = {},
  baseDescription = "",
  baseKeywords = "",
  author = "Dari Dev's Team",
} = Astro.props as Props;

// Data
import { email, socialNetworks, googleMapsLink } from "../../../libs/constants/contact";

const domain = import.meta.env.VITE_BASE_URL;

// Get page metadata (no i18n)
const title = "Socialia";
const description = baseDescription;
const image = `${domain}/banner.webp`;

const twitterHandle = "@DeveloperDari";
let keywords = baseKeywords;

// Split keywords into an array if it's a string
const keywordsContent = Array.isArray(keywords)
  ? keywords.join(", ")
  : keywords;

// Generate data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": jsonType || "EducationalOrganization",
  "@id": `#website`,
  name: title,
  description: description,
  url: domain,
  logo: `${domain}/logo.png`,
  image: `${domain}/banner.webp`,
  email: email,
  serviceArea: ["Canarias", "España"],
  hasMap: googleMapsLink,
  sameAs: [...socialNetworks.map((social) => social.link)],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Canarias" },
    { "@type": "Country", name: "España" },
  ],
  inLanguage: "es",
  ...extraJson,
};

const ogTypeMap = {
  LocalBusiness: "website",
  Blog: "blog",
  BlogPosting: "article",
};
const ogType = ogTypeMap[jsonType as keyof typeof ogTypeMap] || "website";
---

<!-- Html tags -->
<title>{title}</title>
<meta name="description" content={description} />
{keywordsContent && <meta name="keywords" content={keywordsContent} />}
<meta name="author" content={author} />

<!-- Open Graph tags -->
<meta property="og:type" content={ogType} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={domain} />
<meta property="og:image" content={image} />
<!-- this auto generate with platform like facebook, instagram, twitter, etc. -->
<meta property="og:site_name" content={title} />

<!-- Twitter tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content={twitterHandle} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
<meta name="twitter:creator" content="@DeveloperDari" />

<!-- Json Ld -->
<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />

<!-- Sitemap -->
<link rel="sitemap" href="/sitemap-index.xml" />
```

> Be sure to update all required data

As you can see, this component auto renders the main metadata tags: vanilla html tags, open graph tags, twitter tags, json ld and sitemap.

## Constants

Like in the last component, if you need fixed data, you can use the constants file.
Example:
```ts
// src/libs/constants/contact.ts
export const email = 'contact@socialia.com'
export const socialNetworks = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/socialia',
  },
]
export const googleMapsLink = 'https://www.google.com/maps/place/Socialia'
```

## PageSeo component

We can extend the base component to create a page seo component, or blog post seo component, etc.
The main idea its to send extra json data to the component, to make it more dynamic and reusable.

Also we can use the `src/libs/constants` to reuse data between components and seo

Each specific json data change for the business or project.

```ts
---
// src/components/utils/PageSEO.astro
// Components
import BaseSEO from './base/BaseSEO.astro'

// example of data (reused from components)
import { plansData } from '../../libs/constants/plans'
import { heroTitle, heroDescription } from '../../libs/constants/hero'

// Read props
interface Props {
  currentPage: string // Current page
  pageDescription: string // Description
  extraKeywords?: string // Extra keywords
}
const {
  currentPage,
  pageDescription,
  extraKeywords = '',
} = Astro.props as Props

// Environment variables
const domain = import.meta.env.VITE_BASE_URL

// Description and keywords
const defaultDescription = `${heroTitle} ${heroDescription}`
const defaultKeywords =
  'trabajo social canarias, oposiciones trabajo social canarias, temario trabajo social, casos prácticos trabajo social, estudio trabajo social, preparación oposiciones trabajo social, examen trabajo social canarias, temario canario trabajo social, generador casos prácticos IA, tests trabajo social, ejercicios oposiciones, preguntas trabajo social, recursos trabajo social canarias, preparar oposiciones, convocatorias trabajo social, plaza trabajo social canarias'
const description = pageDescription || defaultDescription
const keywords = `${defaultKeywords}, ${extraKeywords}`

// addressElems = {
//   streetAddress: "Cto. Colonias 118",
//   addressLocality: "Mérida",
//   addressRegion: "Yucatán",
//   postalCode: "97100",
//   addressCountry: "Mexico"
// }

// const phoneUnformatted = '+52 999 448 6075'
// const phone = phoneUnformatted.replace(/\s/g, '').replace('+', '')
// const openingHours = ['Mo-Fr 10:00-20:00', 'Sa 11:00-17:00']
// const openingHoursSpecification = [
//   {
//     '@type': 'OpeningHoursSpecification',
//     dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//     opens: '10:00',
//     closes: '20:00',
//   },
//   {
//     '@type': 'OpeningHoursSpecification',
//     dayOfWeek: 'Saturday',
//     opens: '11:00',
//     closes: '17:00',
//   }
// ]

// Extra JSON
const extraJson = {
  // Price
  priceRange: '€€',

  // Contact
  // telephone: phoneUnformatted,

  // Hours
  // openingHours: openingHours,
  // openingHoursSpecification: openingHoursSpecification,

  // Services
  makesOffer: [
    ...plansData.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      url: `${domain}/pricing`,
      priceCurrency: 'EUR',
      price: plan.price,
      availability: 'https://schema.org/InStock',
      category: 'Servicio de Preparación de Oposiciones',
    })),
  ],

  // Founder
  foundingDate: '2025',
  founder: {
    '@type': 'Organization',
    name: 'Socialia',
    description: 'Plataforma de preparación de oposiciones de Trabajo Social en Canarias',
  },

  // rating
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '75',
  },

  // Keywords adicionales para el JSON-LD
  keywords: 'trabajo social canarias, oposiciones trabajo social, preparación oposiciones, casos prácticos trabajo social, temario canario',

  // // Location
  // address: {
  //   '@type': 'PostalAddress',
  //   ...addressElems,
  // },
  // geo: {
  //   '@type': 'GeoCoordinates',
  //   latitude: 20.9984621,
  //   longitude: -89.6152096,
  // },
}
---

<BaseSEO
  currentPage={currentPage}
  jsonType='EducationalOrganization'
  extraJson={extraJson}
  description={description}
  keywords={keywords}
  author='Socialia Team'
/>
```

## Using the component in a page

After create the component, be sure to import and use it in any page (or the required scope, like using the PostSEO component in each blog post page)

```astro
---
// src/pages/about.astro
// Fonts
import '@fontsource-variable/inter'
import '@fontsource/belleza'

// Styles
import '../styles/global.css'

// Components
import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer.astro'
---

<!doctype html>
<html
  lang='en'
  data-theme='winter'
>
  <head>
    <meta charset='UTF-8' />
    <meta
      name='viewport'
      content='width=device-width'
    />
    <link
      rel='icon'
      type='image/svg+xml'
      href='/favicon.svg'
    />
    <meta
      name='generator'
      content={Astro.generator}
    />
    <!-- SEO Slot: dynamic seo in all pages -->
    <slot name='seo' />
  </head>
  <body class:list={['!bg-base-200']}>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

And finally, in the page, we can use the SEO component to set the metadata for the page.

```astro
---
// Layout
import Layout from '../layouts/Layout.astro'

// Components
import HeroHome from '../components/organisms/HeroHome.astro'
import InfoCards from '../components/organisms/InfoCards.astro'
import Features from '../components/organisms/Features.astro'
import PricingCards from '../components/organisms/PricingCards.astro'
import Testimonials from '../components/organisms/Testimonials'

// Utils components
import PageSEO from '../components/utils/PageSEO.astro'
---

<Layout>
  <!-- SEO component with custom props for the page -->
  <PageSEO
    slot="seo"
    currentPage='Prepara tus Oposiciones de Trabajo Social en Canarias'
    pageDescription='Plataforma especializada en preparación de oposiciones de Trabajo Social en Canarias. Temario 100% canario, casos prácticos ilimitados generados por IA y herramientas avanzadas para conseguir tu plaza.'
    extraKeywords='preparación oposiciones trabajo social canarias, temario trabajo social canarias, casos prácticos trabajo social, estudio trabajo social online, plataforma estudio oposiciones'
  />
  <HeroHome />
  <InfoCards />
  <Features />
  <PricingCards />
  <Testimonials client:load />
</Layout>
```

## Sitemap

In order to auto generate the sitemap, we use [astro sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/).

Install it and follow the setup, in order to auto generate the sitemap xml files. 

> Skip the step `Sitemap link in <head>` because the BaseSEO.astro component already renders the sitemap link.

> In the `Sitemap link in robots.txt` use the alternative with the file `src/pages/robots.txt.ts` instead of `public/robots.txt`