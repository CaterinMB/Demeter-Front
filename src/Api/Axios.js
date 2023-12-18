import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5080',
    baseURL: 'demeter-back-production.up.railway.app',
    withCredentials: true
})

export default instance