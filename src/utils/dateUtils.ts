import { WeatherData } from "./../types/WeatherData";

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', options);
};

export const groupWeatherDataByDate = (weatherData: WeatherData[]) => {
  return weatherData.reduce((arr, data) => {
    const date = new Date(data.dt * 1000).toISOString().split("T")[0];

    if (!arr[date]) {
      arr[date] = [];
    }

    arr[date].push(data);

    return arr;
  }, {} as { [key: string]: WeatherData[] });
};