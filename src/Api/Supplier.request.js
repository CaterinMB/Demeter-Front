import axios from './Axios.js';

export const getSupplierRequest = () => axios.get('/supplier');
export const getSupplieRequest = (ID_Supplier) => axios.get(`/supplier/${ID_Supplier}`);  
export const createSupplierRequest = (supplie) => axios.post('/supplier', supplie);
export const disableSupplierRequest = (ID_Supplier) => axios.put(`/supplier/disable/${ID_Supplier}`);
export const updateSupplierRequest = (ID_Supplier, supplie) => axios.put(`/supplier/update/${ID_Supplier}`, supplie)
export const deleteSupplierRequest = (ID_Supplier) => axios.delete(`/supplier/${ID_Supplier}`);