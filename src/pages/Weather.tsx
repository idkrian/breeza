import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchInput from "../molecules/Input";
import {
  CityProps,
  CoordinateProps,
  OpenMeteoProps,
  WeatherProps,
} from "../helpers/interfaces";
import {
  get7DaysForecast,
  getOpenMeteo,
  getOpenWeather,
  getTermOpenWeather,
} from "../services/api";
import WeatherCards from "../templates/WeatherCards";
import Chart from "../templates/Chart";
import Loading from "../assets/loading.svg";

interface Props {
  coordinates: CoordinateProps;
  setCityName?: Dispatch<SetStateAction<string>>;
  cityName: string;
}
const Weather = ({ coordinates, setCityName, cityName }: Props) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [page, setPage] = useState("card");
  const [city, setCity] = useState<CityProps[]>();
  const [weather, setWeather] = useState<WeatherProps>();
  const [meteo, setMeteo] = useState<OpenMeteoProps>();
  const [search, setSearch] = useState("");
  const [daysForecast, setDaysForecast] = useState();
  const [loading, setLoading] = useState(true);

  const getDataByCoord = async (lat: number, lon: number) => {
    setLoading(true);
    const meteoData = await getOpenMeteo(lat, lon);
    setMeteo(meteoData.data);
    const weatherData = await getOpenWeather(lat, lon);
    setWeather(weatherData);
    const daysForecastData = await get7DaysForecast(lat, lon);
    setDaysForecast(daysForecastData.daily);
    setLoading(false);
  };

  useEffect(() => {
    getDataByCoord(coordinates.lat, coordinates.lon);
  }, []);

  const getCity = async (text: string) => {
    const res = await getTermOpenWeather(text);
    const filteredCities = res?.results?.filter(
      (obj: { country: string }, index: number, arr: CityProps[]) =>
        arr.findIndex((o) => o.country === obj.country) === index
    );
    setCity(filteredCities);
  };
  const PageDisplay = () => {
    if (page === "card") {
      return <WeatherCards weather={weather} meteo={meteo} />;
    } else if (page === "chart") {
      return <Chart daysForecast={daysForecast} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center align-middle w-full h-full">
        <img src={Loading} className="w-36" />
      </div>
    );
  } else {
    return (
      <div className="w-full h-full">
        <div className={`grid grid-cols-2 md:grid-cols-3 h-full`}>
          {weather && (
            <div className="flex flex-col p-4 col-span-2 md:col-span-1 items-center relative">
              <SearchInput
                setSearch={setSearch}
                search={search}
                getCity={getCity}
                setCityName={setCityName}
                getDataByCoord={getDataByCoord}
                city={city}
              />
              <div className="flex flex-col justify-center items-center ">
                <img
                  className=""
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  width={250}
                />
                <div className="flex">
                  <p className="text-6xl dark:text-white">
                    {Math.trunc(weather.main.temp)}{" "}
                  </p>
                  <span className="text-3xl dark:text-white">°C</span>
                </div>
              </div>
              <p className="text-center font-semibold text-2xl capitalize dark:text-white">
                {weather.weather[0].description}
              </p>
              <div className="border border-lightBackground my-8 w-8/12" />
              {meteo && (
                <p className="text-center font-semibold text-xl dark:text-white">
                  {new Date(meteo.current.time).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
              )}
              <p className="text-center font-semibold text-3xl dark:text-white">
                {cityName === "" ? weather.name : cityName}
              </p>
            </div>
          )}
          <div className="col-span-2 bg-lightWhite dark:bg-[#2c3b51] p-4 rounded-lg flex flex-col relative">
            <div className="flex gap-4 mt-4">
              <p
                onClick={() => setPage("card")}
                className={`text-xl dark:text-white ${
                  page === "card" ? "font-bold" : ""
                } cursor-pointer`}
              >
                Cards
              </p>
              <p
                onClick={() => setPage("chart")}
                className={`text-xl dark:text-white ${
                  page === "chart" ? "font-bold" : ""
                } cursor-pointer`}
              >
                Week Chart
              </p>
            </div>
            {PageDisplay()}
            <p className="font-semibold absolute pt-8 bottom-0 text-xs dark:text-white">
              Made by <span className="text-blue">Rian</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Weather;
