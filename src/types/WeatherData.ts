export type WeatherMain = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
}

export type Sys = {
  pod: string;
}

export type WeatherData = {
  dt: number;
  main: WeatherMain;
  weather: WeatherDescription[];
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}