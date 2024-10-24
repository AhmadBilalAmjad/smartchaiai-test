export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}

export interface ForecastData {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface GeocodingResult {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
  }>;
}
