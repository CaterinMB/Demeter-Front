import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://10.10.10.202:5080',
    baseURL: 'http://44.242.125.70:5080',
    withCredentials: true
})

export default instance