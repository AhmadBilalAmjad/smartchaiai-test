from django.urls import path
from .views import CurrentWeatherView, ForecastWeatherView

urlpatterns = [
    path('weather/current/<str:city>/', CurrentWeatherView.as_view(), name='current_weather'),
    path('weather/forecast/<str:city>/', ForecastWeatherView.as_view(), name='forecast_weather'),
]
