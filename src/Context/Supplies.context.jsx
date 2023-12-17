import { createContext, useContext, useState } from "react";
import { getSuppliesRequest, getSupplieRequest, createSuppliesRequest, disableSuppliesRequest, updateSuppliesRequest, deleteSuppliesRequest } from "../Api/Supplies.request"

const SuppliesContext = createContext();

export const useSupplies = () => {
    const context = useContext(SuppliesContext);

    if (!context)
        throw new Error("Ha ocurrido un error con el uso del contexto de los insumos");

    return context;
}

export function Supplies({ children }) {
    const [supplies, setSupplies] = useState([]);

    const getSupplies = async () => {
        try {
            const res = await getSuppliesRequest();
            setSupplies(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getSupplie = async (id) => {
        try {
            const res = await getSupplieRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createSupplies = async (supplie) => {
        try {
            const res = await createSuppliesRequest(supplie);
            getSupplies(res);
        } catch (error) {
            console.error(error);
        }
    }

    const toggleSupplyStatus = async (id) => {
        try {
            const res = await disableSuppliesRequest(id);

            if (res.status === 200) {
                setSupplies((prevSupplies) =>
                    prevSupplies.map((supply) =>
                        supply.ID_Supplies === id ? { ...supply, State: !supply.State } : supply
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateSupplies = async (id, supplie) => {
        try {
            await updateSuppliesRequest(id, supplie);
            getSupplies(); 
        } catch (error) {
            console.error(error);
        }
    }

    const deleteSupplies = async (id) => {
        try {
            const res = await deleteSuppliesRequest(id)
            if (res.status === 204) setSupplies(supplies.filter(supplies => supplies.ID_Supplies !== id))
        } catch (error) {
            console.log(error);
        }

    }

    const getShopSupplies = async () => {
        try {
            const { data } = await getSuppliesRequest() || {
                data: []
            };
            return data
            // setSupplies(res.data);
        } catch (error) {
            return []
        }
    }

    return (
        <SuppliesContext.Provider value={{
            supplies,
            getSupplies,
            getSupplie,
            createSupplies,
            toggleSupplyStatus,
            updateSupplies,
            deleteSupplies,
            getShopSupplies
        }}>
            {children}
        </SuppliesContext.Provider>
    );
}
