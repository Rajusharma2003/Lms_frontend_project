import axios from "axios";

// const BASE_URL = "http://localhost:3008/api/v1";
const BASE_URL = "https://lmsbackend-m6fr.onrender.com";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
