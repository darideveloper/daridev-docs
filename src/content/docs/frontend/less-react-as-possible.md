---
title: Less React as Possible
description: How to use react only for absolutely necessary cases in astro projects
---

In astro projects, we should use react for interactive parts, but have have to use it only for absolutely necessary cases.

## Why Less React as Possible in astro projects?

Because react is a bit **more complex** than astro, react components are **more difficult to maintain**, they **only load when the page is rendered** (that means, when the user visits the page, and that make react components **invisible** for example, for **SEO purposes**), and they are **more difficult to debug**.

## How to Less React as Possible?

1. Identify the minimal part that required react
2. Create a new react component for that part
3. Use astro for the rest of the element
4. If need to share or store data, use zustand

### Example 1: Keep the react only for absolutely necessary cases

> **Context:** 

we need a section with a small form: only user and email. This section also have the page logo, a button and a h2.

We alredy have create the logo and the h2 as astro components (because we reuse them in other parts of the project).
Then, how to solve it?

The first approach could be to create a new react component and wrap everything inside of it:

```tsx
// src/components/organisms/Form.tsx
// THIS IS WRONG

// Components
import H2 from '../atoms/H2.astro';
import Logo from '../atoms/Logo.astro';
import Button from '../atoms/Button.tsx';

// Hooks
import { useState } from 'react';

export default function Form() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');

  return (
    <section id="form" class="container">
      <H2>Form</H2>
      <Logo />
      <form>
        <input 
            type="text"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
        />
        <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={() => console.log(user, email)} />
      </form>
    </section>
  );
}
```

> Why the above code is wrong?

- We **cannot use the Logo and the H2 components inside react, because they are astro components** (**we can only use react inside astro**, not the other way around)
- The main react component is **not reusable**, because it is not a component, it is a page section.
- The state is saved in the parent component, but the parent should not be responsible for the state and should be astro component.
- To make it work, we should **convert the Logo and the H2 components to react components** and fix the imports of **any component that use them** (_a lot of extra work_)

> How to solve it?

- Create a new react component for the form (a molecule component)
- Convert the main component to an astro component
- Use the new react component in the astro component

```tsx
// src/components/molecules/ContactForm.tsx

// Components
import Button from '../atoms/Button.tsx';

// Hooks
import { useState } from 'react';

export default function ContactForm() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log(user, email);
  };

  return (
    <form>
      <input type="text" placeholder="User" />
      <input type="email" placeholder="Email" />
      <Button onClick={handleSubmit} />
    </form>
  );
}
```

```tsx
// src/components/organisms/Form.astro
// Components
import H2 from '../atoms/H2.astro';
import Logo from '../atoms/Logo.astro';
import ContactForm from '../molecules/ContactForm.tsx';

export default function Form() {
  return (
    <section class="container" id="form">
      <H2>Form</H2>
      <Logo />
      <ContactForm />
    </section>
  );
}
```

> Extra: we could split the input fields into separate components, to make it more reusable and maintainable.

### Example 2:Instead of the parent, save the state in zustand

> **Context:** 

We have a section with a title, service options and a price summary (like a quote form).

The title its an H2 (already created as astro component). 

Following the same pattern, we could create a main astro component, with astro and react components inside.

```tsx
// src/components/organisms/Form.astro
// Components
import H2 from '../atoms/H2.astro';
import ServiceOptions from '../molecules/ServiceOptions.tsx';
import ServiceSummary from '../molecules/ServiceSummary.tsx';

export default function QuoteForm() {
  return (
    <section class="container" id="quote-form">
      <H2>Quote Form</H2>
      <ServiceOptions />
      <ServiceSummary />
    </section>
  );
}
```

> But now we have a big problem: we **cannot share the state/data** between the service options and the service summary components.

The `ServiceSummary` component needs the data from the `ServiceOptions` component, to calculate the total price or show the selected service.

How to solve it?

Easy: just create a zustand store to share the data between the components.

```tsx
// src/libs/stores/useQuoteStore.ts
import { create } from 'zustand';

type QuoteService = {
  id: string;
  name: string;
  description: string;
};

type QuoteStore = {
  selectedService: QuoteService | null;
  setSelectedService: (service: QuoteService | null) => void;
};

export const useQuoteStore = create<QuoteStore>((set) => ({
  selectedService: null,
  setSelectedService: (service) => set({ selectedService: service }),
}));
```

And now, we can use the store in the `ServiceOptions` and `ServiceSummary` components:

```tsx
// src/components/molecules/ServiceOptions.tsx
import { useQuoteStore } from '../../libs/stores/useQuoteStore';

export default function ServiceOptions() {
  const { selectedService, setSelectedService } = useQuoteStore();
  return (
    <div>
      <h3>Service Options</h3>
      <button
        onClick={() =>
          setSelectedService({
            id: 'service-1',
            name: 'Service 1',
            description: 'Basic service package',
          })
        }
      >
        Add Service 1
      </button>
      <button
        onClick={() =>
          setSelectedService({
            id: 'service-2',
            name: 'Service 2',
            description: 'Premium service package',
          })
        }
      >
        Add Service 2
      </button>
    </div>
  );
}
```

```tsx
// src/components/molecules/ServiceSummary.tsx
import { useQuoteStore } from '../../libs/stores/useQuoteStore';

export default function ServiceSummary() {
  const { selectedService } = useQuoteStore();
  return (
    <div>
      <h3>Service Summary</h3>
      <p>
        Selected Service:{' '}
        {selectedService ? `${selectedService.name} – ${selectedService.description}` : 'None'}
      </p>
    </div>
  );
}
```

And keep the main component as astro component (like the original one, no changes needed):

```tsx
// src/components/organisms/QuoteForm.astro
// Components
import H2 from '../atoms/H2.astro';
import ServiceOptions from '../molecules/ServiceOptions.tsx';
import ServiceSummary from '../molecules/ServiceSummary.tsx';

export default function QuoteForm() {
  return (
    <section class="container" id="quote-form">
      <H2>Quote Form</H2>
      <ServiceOptions />
      <ServiceSummary />
    </section>
  );
}
```