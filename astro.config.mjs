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
          label: 'Frontend',
          autogenerate: { directory: 'frontend' },
        },
        {
          label: 'Backend',
          autogenerate: { directory: 'backend' },
        },
        {
          label: 'Coolify',
          autogenerate: { directory: 'coolify' },
        },
        {
          label: 'Portfolio',
          autogenerate: { directory: 'portfolio' },
        }
			],
      plugins: [catppuccin({
        dark: { flavor: "macchiato", accent: "sky" },
        light: { flavor: "latte", accent: "sky" },
      })],
		}),
	],
});
