import axios from 'axios';


axios.interceptors.request.use(async (config) => {
    config.url = process.env.REACT_APP_API_URL + config.url;
    return config;
})

export const HttpInterceptor = axios;
