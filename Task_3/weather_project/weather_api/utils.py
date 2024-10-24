import random
from datetime import datetime, timedelta

CITIES = ['Lahore', 'Tokyo', 'Paris']

def generate_current_weather_data():
    return {
        'time': datetime.now().strftime('%Y-%m-%dT%H:%M'),
        'interval': 900,
        'temperature_2m': round(random.uniform(15, 35), 1),
        'relative_humidity_2m': random.randint(30, 90),
        'apparent_temperature': round(random.uniform(15, 35), 1),
        'weather_code': random.randint(0, 3),
        'wind_speed_10m': round(random.uniform(0, 30), 1)
    }

def get_current_weather(city):
    if city not in CITIES:
        return None
    return {
        'current': generate_current_weather_data()
    }

def generate_daily_forecast():
    return {
        'time': [(datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(5)],
        'weather_code': [random.randint(0, 3) for _ in range(5)],
        'temperature_2m_max': [round(random.uniform(25, 35), 1) for _ in range(5)],
        'temperature_2m_min': [round(random.uniform(15, 25), 1) for _ in range(5)]
    }

def get_forecast(city):
    if city not in CITIES:
        return None
    
    return {
        'daily': generate_daily_forecast()
    }
