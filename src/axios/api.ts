import axios from "axios";

const api = axios.create({
    baseURL: "http://26.183.174.132:8000",
});

export default api;