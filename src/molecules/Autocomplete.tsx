import { Dispatch, SetStateAction } from "react";
import { CityProps } from "../helpers/interfaces";

interface Props {
  search: string;
  city?: CityProps[];
  setCityName: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  getDataByCoord: (arg1: number, arg2: number) => void;
}

const Autocomplete = ({
  search,
  city,
  setCityName,
  setSearch,
  getDataByCoord,
}: Props) => {
  return (
    <>
      {search.length > 2 && city && (
        <div className="overflow-auto bg-white mt-16 h-40 w-5/6 absolute rounded-xl">
          {city.map((e) => (
            <div
              key={e.id}
              onClick={() => {
                setCityName(e.name);
                setSearch("");
                getDataByCoord(e.latitude, e.longitude);
              }}
              className="flex cursor-pointer align-middle items-center hover:bg-lightBackground rounded-lg"
            >
              <img src={`https://flagsapi.com/${e.country_code}/flat/64.png`} />
              <h1 className="font-semibold text-xl pl-3">{e.name}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Autocomplete;
