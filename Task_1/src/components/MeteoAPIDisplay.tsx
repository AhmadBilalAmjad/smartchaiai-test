import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './SearchBar';
import { WeatherDisplay } from './WeatherDisplay';
import { ForecastDisplay } from './ForecastDisplay';
import { EmptyState } from './EmptyState';
import type { WeatherData, ForecastData, GeocodingResult } from '../types/weather';
import { geocodingApi, weatherApi } from '../api/axiosInstance';
import { Sun, CloudRain, Loader2 } from 'lucide-react';

const MeteoAPIDisplay = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'current' | 'forecast'>('current');

  useEffect(() => {
    if (!city.trim()) {
      setCurrentWeather(null);
      setForecast(null);
      setCityName('');
      setError('');
    }
  }, [city]);

  const fetchWeather = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;

    try {
      setLoading(true);
      setError('');
      setCity(cityName);

      const { data: geocodingData } = await geocodingApi.get<GeocodingResult>('', {
        params: {
          name: cityName,
          count: 1,
          language: 'en',
          format: 'json',
        },
      });

      if (!geocodingData.results?.length) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name } = geocodingData.results[0];
      setCityName(name);

      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        weatherApi.get('', {
          params: {
            latitude,
            longitude,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
          },
        }),
        weatherApi.get('', {
          params: {
            latitude,
            longitude,
            daily: 'weather_code,temperature_2m_max,temperature_2m_min',
            timezone: 'auto',
            forecast_days: 5,
          },
        }),
      ]);

      setCurrentWeather(currentWeatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleCitySelect = (selectedCity: string) => {
    fetchWeather(selectedCity);
  };

  return (
    <>
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && (
        <div className="text-red-500 text-center bg-red-100 rounded-lg p-3">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-600">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}

      {!currentWeather && !forecast && !error && !loading && (
        <EmptyState onCitySelect={handleCitySelect} />
      )}

      {(currentWeather || forecast) && !error && (
        <>
          <div className="flex justify-center items-center space-x-4">
            <span className={`text-sm ${view === 'current' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
              <Sun className="inline mr-1" size={16} /> Current
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={view === 'forecast'}
                onChange={() => setView(view === 'current' ? 'forecast' : 'current')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className={`text-sm ${view === 'forecast' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
              <CloudRain className="inline mr-1" size={16} /> 5-Day Forecast
            </span>
          </div>
          {view === 'current' && currentWeather && (
            <WeatherDisplay weather={currentWeather} cityName={cityName} />
          )}
          {view === 'forecast' && forecast && (
            <ForecastDisplay forecast={forecast} cityName={cityName} />
          )}
        </>
      )}
    </>
  );
}

export default MeteoAPIDisplay