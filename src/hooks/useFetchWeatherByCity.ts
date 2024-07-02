import { useState, useEffect } from "react";
import axios from "axios";
import { WeatherData } from "./../types/WeatherData";

const useFetchWeatherByCity = (initialCity: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCity = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: city,
            appid: process.env.REACT_APP_API_KEY,
            units: "metric",
          },
        }
      );
      setWeatherData(response.data.list);
    } catch (error) {
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByCity(initialCity);
  }, [initialCity]);

  return { weatherData, loading, error, fetchWeatherByCity };
};

export default useFetchWeatherByCity;
