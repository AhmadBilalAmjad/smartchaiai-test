import axios from 'axios';
import { API_URL, DJANGO_API_URL, WEATHER_API_URL } from '../constants';

// Below two are the axios instances for the Open Meteo API
export const geocodingApi = axios.create({
  baseURL: API_URL,
});

export const weatherApi = axios.create({
  baseURL: WEATHER_API_URL,
});

// This is the axios instance for the Django API
export const djangoApi = axios.create({
  baseURL: DJANGO_API_URL,
});
