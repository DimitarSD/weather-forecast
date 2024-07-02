import { createContext, useState, ReactNode } from 'react';

import useFetchWeatherByCity from './../hooks/useFetchWeatherByCity';
import useFetchWeatherByLocation from './../hooks/useFetchWeatherByLocation';

import { WeatherContextType } from './../types/WeatherContextType';

const defaultWeatherContext: WeatherContextType = {
  weatherData: null,
  fetchWeatherByCity: async (city: string) => {},
  loading: true,
  error: null,
};

const WeatherContext = createContext<WeatherContextType>(defaultWeatherContext);

type WeatherProviderProps = {
  children: ReactNode;
};

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [city, setCity] = useState<string | null>(null);
  const { weatherData: locationWeatherData, loading: locationLoading, error: locationError } = useFetchWeatherByLocation();
  const { weatherData: cityWeatherData, loading: cityLoading, error: cityError } = useFetchWeatherByCity(city || '');

  const fetchWeatherByCity = (city: string) => {
    setCity(city);
  };

  const weatherData = city ? cityWeatherData : locationWeatherData;
  const loading = city ? cityLoading : locationLoading;
  const error = city ? cityError : locationError;

  return (
    <WeatherContext.Provider value={{ weatherData, fetchWeatherByCity, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;