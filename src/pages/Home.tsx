import { Dispatch, SetStateAction, useState } from "react";
import Logo from "../assets/umbrella.png";
import SearchInput from "../molecules/Input";
import { getTermOpenWeather } from "../services/api";
import { CityProps, CoordinateProps } from "../helpers/interfaces";

interface Props {
  setIsHome?: Dispatch<SetStateAction<boolean>>;
  setCoordinates?: Dispatch<SetStateAction<CoordinateProps>>;
  setCityName?: Dispatch<SetStateAction<string>>;
}
const Home = ({ setIsHome, setCoordinates, setCityName }: Props) => {
  const [city, setCity] = useState<CityProps[]>();
  const [search, setSearch] = useState("");

  const getCity = async (text: string) => {
    const res = await getTermOpenWeather(text);
    const filteredCities = res?.results?.filter(
      (obj: { country: string }, index: number, arr: CityProps[]) =>
        arr.findIndex((o) => o.country === obj.country) === index
    );
    setCity(filteredCities);
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-around align-middle items-center">
      <div>
        <img src={Logo} className="w-40 md:w-72" />
      </div>
      <div>
        <h1 className="text-6xl font-semibold font-poppins dark:text-white ">
          Breeze
        </h1>
        <SearchInput
          setSearch={setSearch}
          search={search}
          getCity={getCity}
          city={city}
          setIsHome={setIsHome}
          setCoordinates={setCoordinates}
          setCityName={setCityName}
        />
      </div>
    </div>
  );
};

export default Home;
