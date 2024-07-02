import { useContext } from "react";
import { useParams } from "react-router-dom";
import WeatherContext from "./../../context/WeatherContext";

import { formatHour, formatDateString } from "./../../utils/dateUtils";

import styles from "./WeatherDetails.module.css";

const WeatherDetails = () => {
  const { weatherData } = useContext(WeatherContext);
  const { dayId } = useParams<{ dayId: string }>();

  if (!dayId || !weatherData) {
    return <div>Invalid Data.</div>;
  }

  const date = new Date(dayId).toISOString().split("T")[0];

  const hourlyData = weatherData.filter((data) => {
    const dataDate = new Date(data.dt * 1000).toISOString().split("T")[0];

    return dataDate === date;
  });

  if (hourlyData.length === 0) {
    return <div>No data available for this day.</div>;
  }

  return (
    <>
      <h2>Weather Details: {formatDateString(dayId)}</h2>
      <div className={styles.container}>
        {hourlyData.map((hour) => (
          <div key={hour.dt} className={styles.hourly}>
            <div className={styles.row}>
              <div className={styles.temperature}>{Math.round(hour.main.temp)}°C</div>
              <div className={styles.time}>{formatHour(hour.dt)}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.description}>
                (feels like {Math.round(hour.main.feels_like)}°C)
              </div>
              <div className={styles.description}>
                {hour.weather[0].description}
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.detailsRow}>
                <div className={styles.detailsRowKey}>Humidity</div>
                <div className={styles.detailsRowValue}>
                  {hour.main.humidity}%
                </div>
              </div>
              <div className={styles.detailsRow}>
                <div className={styles.detailsRowKey}>Pressure</div>
                <div className={styles.detailsRowValue}>
                  {hour.main.pressure} hPa
                </div>
              </div>
              <div className={styles.detailsRow}>
                <div className={styles.detailsRowKey}>Wind</div>
                <div className={styles.detailsRowValue}>
                  {hour.wind.speed} m/s
                </div>
              </div>
              <div className={styles.detailsRow}>
                <div className={styles.detailsRowKey}>
                  Probability of Precipitation
                </div>
                <div className={styles.detailsRowValue}>
                  {Math.round(hour.pop * 100)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherDetails;
