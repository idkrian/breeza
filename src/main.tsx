import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="bg-lightBackground h-screen w-screen p-8 flex justify-center items-center">
    <App />
  </div>
);
