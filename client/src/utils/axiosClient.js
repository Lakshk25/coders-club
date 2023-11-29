import axios from 'axios'
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from './localStorageManager';

const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosClient = axios.create({
    baseURL: apiURL,
    withCredentials: true, // with cookies
});

axiosClient.interceptors.request.use((request) => {
    try {
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        if (accessToken) {
            request.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return request;
    } catch (error) {
        console.log('request interceptor error ', error);
        return Promise.reject(error);
    }
})

axiosClient.interceptors.response.use(
    async (response) => {
        try {
            const data = response.data;
            const statusCode = data.statusCode;
            const config = response.config;
            if (statusCode === 401) {
                // refresh token expired so redirect to login page
                if (config.url === '/auth/refresh') {
                    removeItem(KEY_ACCESS_TOKEN)
                    window.location.replace("/login", "_self");
                    return Promise.reject(response);
                }
                // access token expire generate new access token
                else {
                    const newResponse = await axiosClient('/auth/refresh');
                    const newAccessToken = newResponse.data.result
                    setItem(KEY_ACCESS_TOKEN, newAccessToken);
                    response.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios.request(config)
                }
            }
            return response;
        } catch (error) {
            console.log('response interceptor error ', error);
        }
    }, (error) => {
        if (axios.isAxiosError(error)) {
            console.log('Axios error: ', error.message);
        }
        return Promise.reject(error);
    })

export { axiosClient };