import { useContext } from "react";
import { Link } from "react-router-dom";
import WeatherContext from "./../../context/WeatherContext";

import { formatDate, groupWeatherDataByDate } from "./../../utils/dateUtils";

import styles from "./WeatherSummary.module.css";

const WeatherSummary = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return <div>Weather data missing...</div>;

  const groupedData = groupWeatherDataByDate(weatherData);
  const fiveDaysEntryWeatherData = Object.entries(groupedData).slice(0, 5);

  return (
    <div className={styles.container}>
      {fiveDaysEntryWeatherData.map(([date, dayData]) => (
        <div key={date} className={styles.day}>
          <Link to={`/details/${date}`}>
            <div className={styles.temperature}>
              {Math.round(dayData[0].main.temp)}°C
            </div>
            <div className={styles.description}>
              {dayData[0].weather[0].description}
            </div>
            <div className={styles.date}>{formatDate(date)}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default WeatherSummary;
