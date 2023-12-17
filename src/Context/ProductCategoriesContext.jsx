import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react'
import { getProductCategories} from '../Api/ProductCategory.request.js'

export const ProductCategoriesContext = createContext();

export const useProductCategories = () => {
    const context = useContext(ProductCategoriesContext);
    if (!context) {
        throw new Error("El useUser debe usarse dentro de ProductCategoriesProvider")
    }
    return context;
}

export const ProductCategoriesProvider = ({ children }) => {

    const [ProductCategories, setProductCategories] = useState([]);


    const fetchProductCategories = async () => {
        try {
            const res = await getProductCategories();
            setProductCategories(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ProductCategoriesContext.Provider
            value={{
                ProductCategories,
                fetchProductCategories,     
            }}
        >
            {children}
        </ProductCategoriesContext.Provider>
    );
};