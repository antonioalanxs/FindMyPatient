import axios from "axios";

import "axios-progress-bar/dist/nprogress.css";

import { API_URL } from "@/core/constants/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export { axiosInstance };
