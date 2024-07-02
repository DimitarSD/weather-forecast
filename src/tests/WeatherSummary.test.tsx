import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import { WeatherProvider } from "../context/WeatherContext";
import WeatherSummary from "./../components/WeatherSummary/WeatherSummary";

import "@testing-library/jest-dom/extend-expect";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("WeatherSummary", () => {
  beforeAll(() => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn().mockImplementation((success) => {
          success({
            coords: {
              latitude: 51.1,
              longitude: 45.3,
            },
          });
        }),
        watchPosition: jest.fn(),
      },
    });
  });

  it("renders weather data correctly", async () => {
    mock.onGet("https://api.openweathermap.org/data/2.5/forecast").reply(200, {
      list: [
        {
          dt: 1625817600,
          main: { temp: 298.77 },
          weather: [{ description: "clear sky" }],
          pop: 0,
        },
      ],
    });

    render(
      <WeatherProvider>
        <Router>
          <WeatherSummary />
        </Router>
      </WeatherProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("clear sky")).toBeInTheDocument();
    });
  });
});
