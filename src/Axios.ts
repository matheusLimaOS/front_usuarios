import axios from 'axios'
import {getToken} from "./config";

const api = axios.create({
    baseURL: 'http://localhost:8686/'
})

api.interceptors.request.use(
    async config =>{
        let token = getToken();
        if(token){
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
    error =>{
        return Promise.reject(error);
    }
)

export default api;
