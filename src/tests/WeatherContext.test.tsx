import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import WeatherContext, { WeatherProvider } from './../context/WeatherContext';

const mock = new MockAdapter(axios);

beforeAll(() => {
  Object.defineProperty(global.navigator, 'geolocation', {
    value: {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        })
      ),
    },
    writable: true,
  });
});

describe('WeatherContext', () => {
  it('provides weather data to components', async () => {
    mock.onGet('https://api.openweathermap.org/data/2.5/forecast').reply(200, {
      list: [
        {
          dt: 1625817600,
          main: { temp: 298.77 },
          weather: [{ description: 'clear sky' }],
          pop: 0,
        },
      ],
    });

    const TestComponent = () => {
      const { weatherData, fetchWeatherByCity } = React.useContext(WeatherContext);

      React.useEffect(() => {
        fetchWeatherByCity('London');
      }, [fetchWeatherByCity]);

      if (!weatherData) return <div>Loading...</div>;

      return <div>{weatherData[0].weather[0].description}</div>;
    };

    render(
      <WeatherProvider>
        <TestComponent />
      </WeatherProvider>
    );

    expect(await screen.findByText('clear sky')).toBeInTheDocument();
  });
});