from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import get_current_weather, get_forecast

class CurrentWeatherView(APIView):
    def get(self, request, city):
        weather_data = get_current_weather(city)
        if weather_data is None:
            return Response(
                {'error': f'City not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        return Response(weather_data)

class ForecastWeatherView(APIView):
    def get(self, request, city):
        forecast_data = get_forecast(city)
        if forecast_data is None:
            return Response(
                {'error': f'City not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        return Response(forecast_data)
