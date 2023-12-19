import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.10.10.202:5080',
    // baseURL: 'https://demeter-back-production.up.railway.app',
    withCredentials: true
})

export default instance