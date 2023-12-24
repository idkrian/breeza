import { useState } from "react";
import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";

const Switcher = () => {
  const [count, setCount] = useState(0);
  const theme = localStorage.getItem("theme") === "dark";
  return (
    <div className="flex justify-end shadow-3xl h-fit m-2 rounded-md absolute right-0 bg-white dark:bg-[#2c3b51] z-10">
      <div
        className={`${
          theme ? "" : "bg-blue text-white"
        }hover:bg-blue text-white w-fit h-fit rounded-md cursor-pointer p-2 m-1`}
        onClick={() => {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
          setCount(count + 1);
        }}
      >
        <LuSun size={20} />
      </div>
      <div
        className={`${
          theme ? "bg-blue text-white" : ""
        } hover:bg-blue hover:text-white w-fit h-fit rounded-md cursor-pointer p-2 m-1`}
        onClick={() => {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
          setCount(count + 1);
        }}
      >
        <LuMoon size={20} />
      </div>
    </div>
  );
};

export default Switcher;
