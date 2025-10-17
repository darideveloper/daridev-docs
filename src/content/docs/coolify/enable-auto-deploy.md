---
title: Enable Auto Deploy in Coolify
description: How to enable auto deploy in Coolify
---

## 1. Setup auto deploy wih coolify webhooks

1. Inside cooolify app (frontend or backend), go to "Webhooks" tab
2. Identify "GitHub" section
3. Copy github link
4. Click in "Webhook Configuration on GitHub"
5. In new github tab, click in "Add Webhook"
6. Paste github link in "Payload URL" field
6. Generate a random long password (without special characters) with [LastPass](https://www.lastpass.com/features/password-generator)
7. Copy the password and paste it in "Secret" field
8. Click in "Add Webhook"
9. Go back to coolify app
10. Paste same password in "GitHub Webhook Secret" field
11. Click in "Save"


## 2. Validate auto deploy

1. Push a new commit to github repository
2. Check coolify "Deployments" tab
3. Check new deployment running