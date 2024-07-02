import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";

import LocationSearch from "./components/LocationSearch/LocationSearch";
import WeatherSummary from "./components/WeatherSummary/WeatherSummary";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";

import Navbar from "./components/Navbar/Navbar";

import styles from "./App.module.css";

const App = () => {
  return (
    <WeatherProvider>
      <Router>
        <div className={styles.app}>
          <Navbar />
          <div className={styles.weatherContainer}>
            <LocationSearch />
            <Routes>
              <Route path="/" element={<WeatherSummary />} />
              <Route path="/details/:dayId" element={<WeatherDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </WeatherProvider>
  );
};

export default App;
