import Card from "../molecules/Card";
import { OpenMeteoProps, WeatherProps } from "../helpers/interfaces";
interface Props {
  weather?: WeatherProps;
  meteo?: OpenMeteoProps;
}
const WeatherCards = ({ weather, meteo }: Props) => {
  return (
    <>
      {weather && (
        <div className={`grid grid-cols-2 gap-6 grid-rows-3 md:grid-cols-3`}>
          <Card
            title={"Wind"}
            text={Number(weather.wind.speed * 3.6).toFixed(2)}
            subtitle={"East"}
          />
          <Card
            title={"Humidity"}
            text={`${weather.main.humidity}%`}
            subtitle={"East"}
          />
          <Card
            title={"Feels Like"}
            text={`${weather.main.temp}°C`}
            subtitle={"East"}
          />
          <Card
            title={"Pressure"}
            text={`${weather.main.pressure}hPa`}
            subtitle={"East"}
          />
          {meteo && (
            <>
              <Card
                title={"UV Index"}
                text={String(meteo.daily.uv_index_max[0])}
                subtitle={"East"}
              />
              <Card
                title={"Chance of Rain"}
                text={`${meteo.daily.precipitation_probability_max[0]}%`}
                subtitle={"East"}
              />
              <Card title={"Snow"} text={`${meteo.current.snowfall}%`} />
              <Card
                title={"Cloud Cover"}
                text={`${meteo.current.cloud_cover}%`}
              />
              <Card
                title={"Sun"}
                subtitle={new Date(meteo.daily.sunrise[0]).toLocaleTimeString(
                  "en-US"
                )}
                subtitle2={new Date(meteo.daily.sunset[0]).toLocaleTimeString(
                  "en-US"
                )}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default WeatherCards;
