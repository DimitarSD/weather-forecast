import { WeatherData } from "./WeatherData";

export type WeatherContextType = {
  weatherData: WeatherData[] | null;
  fetchWeatherByCity: (city: string) => void;
  loading: boolean;
  error: string | null;
}