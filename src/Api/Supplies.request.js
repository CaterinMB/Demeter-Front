import axios from './Axios';

export const getSuppliesRequest = () => axios.get('/supplies');
export const getSupplieRequest = (ID_Supplies) => axios.get(`/supplies/${ID_Supplies}`);
export const createSuppliesRequest = (supplie) => axios.post('/supplies', supplie);
export const disableSuppliesRequest = (ID_Supplies) => axios.put(`/supplies/disable/${ID_Supplies}`);
export const updateSuppliesRequest = (ID_Supplies, supplie) => axios.put(`/supplies/update/${ID_Supplies}`, supplie)
export const deleteSuppliesRequest = (ID_Supplies) => axios.delete(`/supplies/${ID_Supplies}`);
