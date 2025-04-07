import { createRoot } from "react-dom/client";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "flatpickr/dist/flatpickr.min.css";

import "@/index.scss";

import App from "@/App.jsx";

createRoot(document.getElementById("root")).render(<App />);
