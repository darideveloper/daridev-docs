---
title: Set Up Django Base Project
description: Set Up Guide to start a Django project from base project repo
---

## 1. Clone repository
```bash
# Use git clone on bash terminal to clone repository
git clone https://github.com/darideveloper/django-base.git

```

## 2. Set Up Environment

On root you'll find .env.example and .env.dev.example files, you can use them as template to create your own environment files, just remove .example from its name and fill the values.

## 3. Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment (on windows)
```bash
venv\Scripts\activate
```

Activate virtual environment (on linux)
```bash
source venv/bin/activate
```

Deactivate virtual environment
```bash
deactivate
```

## 4. Install dependencies

```bash
pip install -r requirements.txt
```

## 5. Create postgre database

You can create your database from pgadmin or psql. 

In case you want to use psql, access to postgres on terminal

```bash
psql postgres
```

Create database
```bash
CREATE DATABASE database_name;
```


## 6. Database connection

### 6.1 Update db connection in .env.dev

Update database credentials on .env.dev files

```
// .env.dev
...
DB_HOST=server ip
DB_PORT=db free port
DB_NAME=db name
DB_USER=db username
DB_PASSWORD=db password
...
```

### 6.2 Run migrations and create superuser to check connection

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

## 7. Fixtures

In case you need to import fixtures, you can use the following command:
```bash
python manage.py loaddata
```

> NOTE: YOU CAN FIN THIS REPOSITORY AT: https://github.com/darideveloper/django-base