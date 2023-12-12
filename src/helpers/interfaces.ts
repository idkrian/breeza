export interface WeatherProps {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: "stations";
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface OpenMeteoProps {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    snowfall: string;
    cloud_cover: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation: string;
    rain: string;
    showers: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    snowfall: number;
    cloud_cover: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    rain: number;
    showers: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily_units: {
    time: string;
    sunrise: string;
    sunset: string;
    sunshine_duration: string;
    uv_index_max: string;
    precipitation_sum: string;
    precipitation_probability_max: string;
    rain_sum: string;
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
    sunshine_duration: number[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    rain_sum: number[];
  };
}

export interface CityProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  timezone: string;
  population: number;
  country_id: number;
  country: string;
  admin1: string;
}
