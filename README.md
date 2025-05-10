# django_job_search
# Job Search Platform

This is a simple Django-based web application that allows users to browse and search for job listings.

## Features

- Job search by keyword
- Job detail pages
- Admin dashboard for managing jobs
- PostgreSQL support

## Requirements

- Python 3.8+
- Django 5.2.1
- psycopg2-binary
- sqlparse

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Houssam-GH/django_job_search.git
cd django_job_search

# 2. Create and activate a virtual environment
python -m venv env
env\Scripts\activate   # On Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run migrations
python manage.py migrate

# 5. (Optional) Create a superuser
python manage.py createsuperuser

# 6. Run the development server
python manage.py runserver

# 7. Open in browser
http://127.0.0.1:8000
