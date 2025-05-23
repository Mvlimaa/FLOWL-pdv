import axios from "axios";

const api = axios.create({
    baseURL: "https://nossa-api.com",
    headers: {
        "Content-Type": "aplication/json",  // Confirmar que o arquivo vai ser lido no formato JSON
    },
});

export default api;