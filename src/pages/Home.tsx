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
    const arrayFiltrado = res?.results?.filter(
      (obj: { country: string }, index: number, arr: CityProps[]) =>
        arr.findIndex((o) => o.country === obj.country) === index
    );
    setCity(arrayFiltrado);
  };

  return (
    <div className="flex w-full justify-around align-middle items-center">
      <div>
        <img src={Logo} className="w-72" />
      </div>
      <div>
        <h1 className="text-6xl font-semibold font-poppins">Breeze</h1>
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
