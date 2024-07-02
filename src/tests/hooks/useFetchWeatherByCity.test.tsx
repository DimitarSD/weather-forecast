import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useFetchWeatherByCity from "../../hooks/useFetchWeatherByCity";

const mock = new MockAdapter(axios);

describe("useFetchWeatherByCity", () => {
  it("fetches weather data by city", async () => {
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

    const { result } = renderHook(() => useFetchWeatherByCity("London"));

    await act(async () => {
      result.current.fetchWeatherByCity("London");
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
