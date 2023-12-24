import { Dispatch, SetStateAction } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { CityProps, CoordinateProps } from "../helpers/interfaces";

interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  getCity: (e: string) => void;
  city?: CityProps[];
  setCityName?: Dispatch<SetStateAction<string>>;
  setIsHome?: Dispatch<SetStateAction<boolean>>;
  setCoordinates?: Dispatch<SetStateAction<CoordinateProps>>;
  getDataByCoord?: (arg1: number, arg2: number) => void;
}

const SearchInput = ({
  setSearch,
  search,
  getCity,
  setCityName,
  getDataByCoord,
  city,
  setIsHome,
  setCoordinates,
}: Props) => {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute right-2 top-6">
          <BiSearchAlt size={25} color={`#0095ff`} />
        </div>
        <input
          type="text"
          placeholder="Sydney"
          className="bg-lightWhite rounded-3xl p-2 px-4 mt-4 w-full dark:bg-[#2c3b51] dark:text-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            getCity(e.target.value);
          }}
        />
        {search.length > 2 && city && (
          <div className="overflow-auto bg-white dark:bg-[#2c3b51] mt-2 max-h-64 w-full absolute rounded-xl">
            {city.map((e) => (
              <div
                key={e.id}
                onClick={() => {
                  setCityName?.(e.name);
                  setSearch("");
                  getDataByCoord?.(e.latitude, e.longitude);
                  setCoordinates?.({
                    lat: Number(e.latitude),
                    lon: e.longitude,
                  });
                  setIsHome?.(false);
                }}
                className="px-4 flex cursor-pointer align-middle items-center hover:bg-lightBackground rounded-lg"
              >
                <img
                  src={`https://flagsapi.com/${e.country_code}/flat/64.png`}
                />
                <h1 className="font-semibold text-xl pl-3 dark:text-white">
                  {e.name}
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
