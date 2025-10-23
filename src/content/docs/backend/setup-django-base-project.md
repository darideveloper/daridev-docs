---
title: Set Up Django Base Project
description: Set Up Guide to start a Django project from base project repo
---

## 1. Clone repository

```bash
#
# NOTE: YOU CAN FIN THIS REPOSITORY AT: https://github.com/darideveloper/django-base
#

# Use git clone on bash terminal to clone repository
git clone https://github.com/darideveloper/django-base.git

```

## 2. Set Up Environment

On root create .env file, it only needs to content this:

```bash
#
# NOTE: YOU MUST DECIDE BETWEEN DEV OR PROD BASED ON THE ENVIRONMENT YOUR TESTING
#

ENV=DEV

```

## 3. Create environment files

In order to be able to select an environment file

On root create .env.dev file, it will content something like this:

```bash
#
# NOTE: THIS FILE CONTENT MAY VARY BASED ON THE PROJECT REQUIREMENTS
#



```

## 4. Create postgre database

Access to postgres on terminal

```bash
psql postgres
```

Create database
```bash
CREATE DATABASE database_name;
```


## Database connection
### 5.1 Update db connection in .env.dev

Update database credentials on .env.dev files
```bash
DB_HOST=server ip
DB_PORT=db free port
DB_NAME=db name
DB_USER=db username
DB_PASSWORD=db password
```

### 5.2 Run migrations and create superuser to check connection

Run migrations and create superuser
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```
Run project in local to check admin login
```bash
python manage.py runserver
```
Enter to localhost:8000/admin and access with admin credentials