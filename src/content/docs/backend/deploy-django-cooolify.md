---
title: Deploy Django in Coolify
description: Deploy Django in Coolify with AWS S3 storage
---

## 1. Update Dockerfile

```bash
#
# NOTE: THIS DOCKERFILE IS GENERATED VIA "apply-templates.sh"
#
# PLEASE DO NOT EDIT IT DIRECTLY.
#

# Use Python 3.12 slim image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app/

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
    # add any other system dependencies here

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Collect static files and migrate database
RUN python manage.py collectstatic --noinput
RUN python manage.py makemigrations
RUN python manage.py migrate
# RUN python manage.py apps_loaddata # enable this if you have data (fixtures)

# Expose the port that Django/Gunicorn will run on
EXPOSE 80

# Command to run Gunicorn with the WSGI application for production
CMD ["gunicorn", "--bind", "0.0.0.0:80", "project.wsgi:application"]
```

## 2. Setup AWS S3

TODO

## 3. Create coolify project

- Go to [https://apps.darideveloper.com/projects](https://apps.darideveloper.com/projects)
- Create new project (if required) with project name, example: "project-name"
- Open the project
- Open "production" environment

## 4. Create database instance

### 4.1 Validate database free ports

Tun this command to detect the next free port to use.

```bash
sudo ss -tuln
```

### 4.2. Create instance

- Click in "+ Add New Resource"
- Select "Postgresql"
- Select "PostgreSQL 16 (default)"
- Change name to "db"
- Change username and password
- Set next db free port in "Public Port"
- Start / Deploy database
- Enable checkbox "Make it publicly available"
- Check database connection with PGAdmin
- Create new database inside the database instance, with project name (with PGAdmin)

## 5. Update db connection in .env.prod

- Open .env.prod file (create it if it doesn't exist)
- Change env in .env file to "prod"
```bash
ENV=prod
```
- Update database credentials
```bash
DB_HOST=server ip
DB_PORT=db free port
DB_NAME=db name
DB_USER=db username
DB_PASSWORD=db password
```

### 5.1. Run migrations and create superuser to check connection
- Run migrations and create superuser
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```
- Run project in local to check admin login
- Reset back to dev env in .env file
```bash
ENV=dev
```

## 6. Enable database backups

- Open database instance in coolify
- Click in "Backups Tab"
- Click in "+ Add"
- Set a cronjob ro every day at random time, example:
```bash
7 15 * * * # every day at 15:07
```
- Click in "Save"
- Open Backup created
- Enable checkbox "Backup All Databases"
- Check if working clicking in "Backup Now"
- Check backup created in "Status: success"

## 7. Create django app

- Go to coolify project
- Open "production" environment
- Click in "+ Add New Resource"
- Select "Public Repository"
- Paste github repository url
- Click in "Check Repository"
- In Build Pack select "Dockerfile"

### 7.1 General
- Go to "General" tab
- Change name to repository name, example: "project-name"
- Update subdomain to repository name, example: "https://project-name.apps.darideveloper.com"
- Set "Ports Exposes" to "80"
- Press "Enter" at last field to save changes

### 7.2. Advanced
- Go to "Advanced" tab
- Set "Custom Container Name" to project name, example: "project-name"
- Press "Enter" at last field to save changes

### 7.3. Environment Variables
- Open project database instance in coolify, in new tab
- Copy Postgres URL (internal)
- Go back to django app in coolify
- Go to "Environment Variables" tab
- Click in "Developer view"
- Setup all env variables from .env.prod file (copy and paste)
- Update database host and port, from Postgres URL (internal)
- Update host to current project domain
- Add project domain to ALLOWED_HOSTS (without https)
- Add project domain to CSRF_TRUSTED_ORIGINS
- Add project domain to CORS_ALLOWED_ORIGINS
- Click in "Save All Environment Variables"

### 7.3.1. Setup build variables
- Go back to regular view clicking in "Environment Variables" tab
- Mark all variables as "Build Variable?" (checkbox)

## 8. Deploy project
- Deploy project clicking in "Deploy" button
- Check deploy status in "Status: success"
- Check project working in the domain (wait for the domain ssl to be available)

## 9. Enable auto deploy
TODO