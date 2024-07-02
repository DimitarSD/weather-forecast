import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useFetchWeatherByLocation from "../../hooks/useFetchWeatherByLocation";

const mock = new MockAdapter(axios);

describe("useFetchWeatherByLocation", () => {
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

  it("fetches weather data by geolocation", async () => {
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

    const { result } = renderHook(() => useFetchWeatherByLocation());

    await act(async () => {
      result.current.fetchWeatherByLocation();
    });

    expect(result.current.weatherData).toEqual([
      {
        dt: 1625817600,
        main: { temp: 298.77 },
        weather: [{ description: "clear sky" }],
        pop: 0,
      },
    ]);
  });
});
