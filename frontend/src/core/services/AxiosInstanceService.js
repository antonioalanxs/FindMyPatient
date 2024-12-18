import axios from "axios";

import { API_URL } from "@/core/constants/general";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

const axiosInstanceWithTokens = axios.create({
  baseURL: API_URL,
});

export { axiosInstance, axiosInstanceWithTokens };
