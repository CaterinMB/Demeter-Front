import axios from './Axios';

export const getCategory_suppliesRequest = () => axios.get('/suppliescategory')
export const getOne_Category_suppliesRequest = (ID_SuppliesCategory) => axios.get(`/suppliescategory/${ID_SuppliesCategory}`);  
export const createCategory_suppliesRequest = (category) => axios.post('/suppliescategory', category);
export const disableCategory_suppliesRequest = (ID_SuppliesCategory) => axios.put(`/suppliescategory/disable/${ID_SuppliesCategory}`);
export const updateCategory_suppliesRequest = (ID_SuppliesCategory, categorySupplies) => axios.put(`/suppliescategory/update/${ID_SuppliesCategory}`, categorySupplies)
export const deleteCategory_suppliesRequest = (ID_SuppliesCategory) => axios.delete(`/suppliescategory/${ID_SuppliesCategory}`);