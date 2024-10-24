import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './SearchBar';
import { WeatherDisplay } from './WeatherDisplay';
import { ForecastDisplay } from './ForecastDisplay';
import { EmptyState } from './EmptyState';
import type { WeatherData, ForecastData } from '../types/weather';
import { AxiosError } from 'axios';
import { Sun, CloudRain, Loader2 } from 'lucide-react';
import { djangoApi } from '../api/axiosInstance';

const DjangoAPIDisplay = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'current' | 'forecast'>('current');

  useEffect(() => {
    if (!city.trim()) {
      setCurrentWeather(null);
      setForecast(null);
      setError('');
    }
  }, [city]);

  const fetchWeather = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;

    try {
      setLoading(true);
      setError('');
      setCity(cityName);

      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        djangoApi.get(`/weather/current/${cityName}/`),
        djangoApi.get(`/weather/forecast/${cityName}/`),
      ]);

      setCurrentWeather(currentWeatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (err) {
      console.log({ err })
      setError(err instanceof AxiosError ? (err.response?.data?.error || err.message) : 'Failed to fetch weather data');
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
          <div className="flex justify-center items-center space-x-4 mb-4">
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
            <WeatherDisplay weather={currentWeather} cityName={city} />
          )}
          {view === 'forecast' && forecast && (
            <ForecastDisplay forecast={forecast} cityName={city} />
          )}
        </>
      )}
    </>
  );
}

export default DjangoAPIDisplay;
