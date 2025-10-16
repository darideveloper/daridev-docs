// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Theme
import catppuccin from "@catppuccin/starlight";


// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Daridev Docs',
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
        {
          label: 'Frontend',
          items: [
            { label: 'Container', slug: 'frontend/container' },
            { label: 'Components', slug: 'frontend/componentes' },
          ],
        },
        {
          label: 'Backend',
          items: [
            { label: 'Deploy Django in Coolify', slug: 'backend/deploy-django-cooolify' },
          ],
        },
			],
      plugins: [catppuccin({
        dark: { flavor: "macchiato", accent: "sky" },
        light: { flavor: "latte", accent: "sky" },
      })],
		}),
	],
});
