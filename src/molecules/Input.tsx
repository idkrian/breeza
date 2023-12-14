import { BiSearchAlt } from "react-icons/bi";

const SearchInput = ({ setSearch, search, getCity }) => {
  return (
    <div className="relative w-full">
      <div className="absolute right-2 top-6">
        <BiSearchAlt size={25} color={`#0095ff`} />
      </div>
      <input
        type="text"
        placeholder="Toronto, Canada"
        className="bg-lightWhite rounded-3xl p-2 px-4 mt-4 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          getCity(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
