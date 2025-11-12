---
title: AOS
description: How to use AOS in frontend projects
---

To use AOS (animation on scroll) in Astro projects, do the following: 

1. First, install the package:

```bash
npm install aos --save
```

2. If not exist, create the folder `src/components/utils/`
3. Create a component `AOSInit.jsx` with the following content: (and yes, this module its in javascript, not typescript, because AOS don't have a typescript version)

```tsx
// src/components/utils/AOSInit.tsx
import { useEffect } from 'react'
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSInit() {
  // Start AOS when component mounts
  useEffect(() => {
    
    // Start Aos
    AOS.init({
      duration: 1000,
      delay: window.innerWidth < 768 ? 0 : 100,
      once: true,
    })

  }, [])

  return null
}
```

4. Apply the AOS init component to `src/layouts/Layout.astro`

```astro
---
// src/layouts/Layout.astro
...

// Utils
import AOSInit from '../components/utils/AOSInit'
---

<!doctype html>
<html>
  <head>
    ...
  </head>
  <body>
    <!-- Start aos -->
    <AOSInit client:load />

    ...
  </body>
</html>

```

Learn more about the Layout in [Layout](../layout)

1. Use AOS in any component like in the [AOS Docs](https://michalsnik.github.io/aos/)