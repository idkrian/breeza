import axios from "axios";
export const getOpenWeather = async (lat: number, lon: number) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=a84fa02c10f107905f4968c8ec0bea59`
    );
    return res.data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};
export const getTermOpenWeather = async (city: string) => {
  try {
    const res = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    );
    return res.data;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};
export const getOpenMeteo = async (latitude: number, longitude: number) => {
  try {
    const res = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,,snowfall,cloud_cover,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset,sunshine_duration,uv_index_max,precipitation_sum,precipitation_probability_max,rain_sum&timezone=America%2FSao_Paulo&forecast_days=1`
    );
    return res;
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
};
