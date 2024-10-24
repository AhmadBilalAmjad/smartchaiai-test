import React from 'react';
import { MapPin } from 'lucide-react';
import { getWeatherDescription } from '../utils/weatherCodes';
import type { ForecastData } from '../types/weather';
import WeatherIcon from './shared/WeatherIcon';

interface ForecastDisplayProps {
  forecast: ForecastData;
  cityName: string;
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast, cityName }) => {
  const { temperature_2m_max, temperature_2m_min, weather_code, time } = forecast.daily;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2">
        <MapPin className="w-5 h-5 text-gray-600" />
        <h2 className="text-2xl font-semibold text-gray-800">{cityName} - 5-Day Forecast</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {time.map((date, index) => (
          <div key={date} className="bg-white/50 rounded-lg p-3 text-center flex flex-col justify-between">
            <p className="font-semibold text-gray-800 text-sm">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <div className="flex items-center justify-center my-2">
              <WeatherIcon code={weather_code[index]} />
            </div>
            <p className="text-xs text-gray-600 mb-1">
              {getWeatherDescription(weather_code[index])}
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-800">
                {Math.round(temperature_2m_max[index])}°
              </span>
              <span className="text-gray-600">
                {Math.round(temperature_2m_min[index])}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
