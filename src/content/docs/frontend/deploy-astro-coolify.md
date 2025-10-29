---
title: Deploy Astro to Coolify
description: How to deploy Astro to Coolify
---

## 1. Update Package.json to use node 20

For both (SSR and SSG), add this to Package.json, after 'dependencies' section, if not already set:

```json
{
    "dependencies": {
        ...
    }
    "engines": {
        "node": ">=20.3.0"
    }
}
```

## 2. Create Coolify project

1. Go to [https://apps.darideveloper.com/projects](https://apps.darideveloper.com/projects)
2. Create new project (if required) with project name, example: "project-name"
3. Open the project
4. Open "production" environment

## 3. Create app in coolify

Inside the project:

1. Click in "+ Add New Resource"
2. Select "Public Repository"
3. Paste github repository url
4. Click in "Check Repository"
5. In Build Pack select "Nixpacks"
6. Click in "Save"

## 4. App setup

1. Go to "General" tab
2. Change name to repository name, example: "project-name"
3. Update subdomain to repository name, example: "https://project-name.apps.darideveloper.com"
4. Press "Enter" at last field to save changes

## 4. Update general commands in coolify

Setup the follosing commands in each section:

```bash
# Install Command
npm i

# Build Command
npm run build
```

## 5. Setup environment variables in coolify

Go to "Environment Variables" tab inside the coolify app:
   1. Click in "Developer view"
   2. Setup all env variables from env file (copy and paste)
   3. Click in "Save All Environment Variables"
   4. Add the following env variable if not already set in your env files

```bash
NIXPACKS_NIXPKGS=nodejs_20,npm-9_x
```
   

## 6. Advanced settings in coolify

1. Go to "Advanced" tab
2. Set "Custom Container Name" to project name, example: "project-name"
3. Press "Enter" at last field to save changes

## 7. SSR

Follow this steps for **server side rendering** deployment *only*.

### 7.1. Install @astrojs/node

Install the folllowing package in the project

[Install @astrojs/node package to use Node.js in Astro.](https://docs.astro.build/en/guides/integrations-guide/node/)

Be sure to setup as "standalone" mode

### 7.2. Validate build mode

Build project and run it in local to validate it's working

```bash
npm run build
node dist/server/entry.mjs
```

### 7.3. Update General settings in coolify

1. Setup the follosing start command in coolify "General" tab

```bash
# Start Command
node ./dist/server/entry.mjs
```

2. Set "Ports Exposes" to "3000"
3. Press "Enter" at last field to save changes

## 8. SSG

Follow this steps for **static site generation** deployment *only*.

TODO

## 10. Enable auto deploy

Follow this steps to enable auto deploy with coolify webhooks:

[Enable Auto Deploy in Coolify](../../coolify/enable-auto-deploy)
