import axios from './Axios';

export const getCategory_productsRequest = () => axios.get('/productcategory')
export const getOne_Category_productsRequest = (ID_ProductCategory) => axios.get(`/productcategory/${ID_ProductCategory}`);  
export const createCategory_productsRequest = (category) => axios.post('/productcategory', category);
export const disableCategory_productsRequest = (ID_ProductCategory) => axios.put(`/productcategory/disable/${ID_ProductCategory}`);
export const updateCategory_productsRequest = (ID_ProductCategory, categoryProducts) => axios.put(`/productcategory/update/${ID_ProductCategory}`, categoryProducts)
export const deleteCategory_productsRequest = (ID_ProductCategory) => axios.delete(`/productcategory/${ID_ProductCategory}`);
export const getProductCategories = () => axios.get(`/productCategories`);