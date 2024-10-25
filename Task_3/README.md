# Weather API

This Django REST API provides weather data for a limited number of cities.

## Endpoints

- `/api/weather/current/<city>/`: Provides the current weather for the specified city.
- `/api/weather/forecast/<city>/`: Provides a 5-day weather forecast for the specified city.

## Cities

- Lahore
- Tokyo
- Paris

## Usage

- Clone the repository
- cd into Task_3 and then weather_project
- Create a virtual environment
  ```bash
  python -m venv venv
  ```
- Install dependencies
  ```bash
  pip install django djangorestframework django-cors-headers
  ```
- Run migrations
  ```bash
  python manage.py migrate
  ```
- Run the server
  ```bash
  python manage.py runserver
  ```
- Use the endpoints
