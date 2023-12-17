import axios from "./Axios.js";

export const CreateShopping = (data) => axios.post('/shopping', data);
export const CreateMultipleShopping = (data) => axios.post('/multpleShopping', data);
export const GetShopingAndShopingDetails = () => axios.get('/getShopingAndShopingDetails');
export const GetShopingByProvider = () => axios.get('/getShopingByProvider');
export const GetOneShopping = (ID_Shopping) => axios.get(`/shopping/${ID_Shopping}`);
export const GetShoppingAndSuppliesBySupplierId = (ID_Shopping) => axios.get(`/getShoppingAndSuppliesBySupplierId/${ID_Shopping}`);
export const GetShoppingAndSuppliesBySupplierIdAndDateTime = (id, date) => axios.get(`/getShoppingAndSuppliesBySupplierIdAndDateTime/${id}/${date}`);
export const GetShopping = () => axios.get('/shopping');
export const DisableShopping = (id) => axios.put(`/shopping/disable/${id}`);
export const UpdateShopping = (id, data) => axios.put(`/shopping/update/${id}`, data);

export const GetShoppingDetail = (id) => axios.get(`/shoppingdetail/${id}`);
export const GetShoppingDetails = () => axios.get('/shoppingdetail');
export const CreateShoppingDetail = (data) => axios.post('/shoppingdetail', data);
export const CreateManyDetails = (data) => axios.post('/manyDetails', data);