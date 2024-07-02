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

export const formatHour = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}h`;
};

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};