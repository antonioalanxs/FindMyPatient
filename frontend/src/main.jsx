import { createRoot } from "react-dom/client";

import "bootstrap-icons/font/bootstrap-icons.css";

import { setupIonicReact } from "@ionic/react";

setupIonicReact();

import "@/index.scss";

import App from "@/App.jsx";

createRoot(document.getElementById("root")).render(<App />);
