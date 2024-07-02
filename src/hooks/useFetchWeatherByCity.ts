import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherData } from './../types/WeatherData';

const useFetchWeatherByCity = (city: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            q: city,
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

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return { weatherData, loading, error };
};

export default useFetchWeatherByCity;