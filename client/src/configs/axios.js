import axios from 'axios';

const backendURL = 'http://localhost:8000/api';

const axiosClient = axios.create({
    baseURL: backendURL,
    headers: {
        "Content-Type":"application/json"
    },
    withCredentials:true,
    credentials:true
});

export default axiosClient;