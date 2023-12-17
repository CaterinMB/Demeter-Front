import axios from './Axios';

export const getLossesRequest = () => axios.get('/losses');
export const getLossRequest = (ID_Losses) => axios.get(`/losses/${ID_Losses}`);
export const createLossRequest = (loss) => axios.post('/losses', loss);