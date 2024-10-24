import React from 'react';
import { MapPin, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherDescription } from '../utils/weatherCodes';
import WeatherIcon from './shared/WeatherIcon';

interface WeatherDisplayProps {
  weather: WeatherData;
  cityName: string;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, cityName }) => {
  const { temperature_2m, relative_humidity_2m, apparent_temperature, weather_code, wind_speed_10m } = weather.current;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-800">{cityName}</h2>
        </div>
        <WeatherIcon code={weather_code} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/50 p-4 rounded-lg">
          <p className="text-4xl font-bold text-gray-800">
            {Math.round(temperature_2m)}°C
          </p>
          <p className="text-gray-600">
            Feels like {Math.round(apparent_temperature)}°C
          </p>
        </div>

        <div className="space-y-4 bg-white/50 p-4 rounded-lg flex flex-col justify-center">
          <div className="flex items-center gap-2 text-gray-700">
            <Wind className="w-5 h-5" />
            <span>{wind_speed_10m} km/h</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Droplets className="w-5 h-5" />
            <span>{relative_humidity_2m}%</span>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600">
        {getWeatherDescription(weather_code)}
      </div>
    </div>
  );
};
