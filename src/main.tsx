import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="bg-lightBackground dark:bg-background md:h-screen md:w-screen max-w-full p-8 flex justify-center items-center">
    <App />
  </div>
);
