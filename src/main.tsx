import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="bg-lightBackground md:h-screen md:w-screen max-w-full p-8 flex justify-center items-center">
    <App />
  </div>
);
