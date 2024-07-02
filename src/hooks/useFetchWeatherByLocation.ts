import { useState, useEffect } from "react";
import axios from "axios";
import { WeatherData } from "./../types/WeatherData";

const useFetchWeatherByLocation = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByLocation = async () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast`,
            {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
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
      },
      (error) => {
        setError("Error fetching location");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return { weatherData, loading, error, fetchWeatherByLocation };
};

export default useFetchWeatherByLocation;
