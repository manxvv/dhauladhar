import axios from "axios";
import Urls from "../../config/urls";
import useAuth from "../store/useAuth";

const http = axios.create({
    baseURL: Urls.baseURL,
    withCredentials: true
});

http.interceptors.request.use(config => {
    const {token} = useAuth.getState();

    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;

}, error => {
    return Promise.reject(error);
})


export default http;