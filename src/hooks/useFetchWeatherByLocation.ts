import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherData } from './../types/WeatherData';

const useFetchWeatherByLocation = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: process.env.REACT_APP_API_KEY,
            units: 'metric',
          },
        });
        setWeatherData(response.data.list);
      } catch (error) {
        setError("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setError("Error fetching location");
        setLoading(false);
      }
    );
  }, []);

  return { weatherData, loading, error };
};

export default useFetchWeatherByLocation;