import React, { useState, useContext } from 'react';
import WeatherContext from './../../context/WeatherContext';
import styles from './LocationSearch.module.css';

const LocationSearch = () => {
  const [city, setCity] = useState('');
  const { fetchWeatherByCity } = useContext(WeatherContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherByCity(city);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
};

export default LocationSearch;