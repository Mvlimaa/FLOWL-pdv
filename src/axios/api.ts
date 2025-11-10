import axios from "axios";
import { Platform } from "react-native";

const getBaseUrl = () => {
    // Android emulator (Android Studio)
    if (Platform.OS === "android") {
        return "http://10.0.2.2:8000";
    }
    // iOS simulator uses localhost
    // Real device: use your machine IP na rede local, ex: 192.168.0.100
    return "http://127.0.0.1:8000";
};

const api = axios.create({
    baseURL: getBaseUrl(),
    // timeout: 10000,
});

export default api;