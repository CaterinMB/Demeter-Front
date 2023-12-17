import { createContext, useContext, useState } from "react";
import {
  getSupplierRequest,
  getSupplieRequest,
  createSupplierRequest,
  disableSupplierRequest,
  updateSupplierRequest,
  deleteSupplierRequest
} from "../Api/Supplier.request.js";

const SupplierContext = createContext();

export const useSupplier = () => {
  const context = useContext(SupplierContext);

  if (!context)
    throw new Error(
      "Ha ocurrido un error con el uso del contexto de los proveedores"
    );

  return context;
};

export function Supplier({ children }) {
  const [supplier, setSupplier] = useState([]);

  const getSupplier = async () => {
    try {
      const { data } = await getSupplierRequest() || {
        data: []
      };
      // setSupplier(res.data);
      return data
    } catch (error) {
      return []
    }

  };

  const getSupplierByState = async () => {
    try {
      const res = await getSupplierRequest()
      console.log("res")
      console.log(res)
      setSupplier(res.data);
    } catch (error) {
      console.log("res")
      console.log(error)
    }

  };

  // export function Supplier({ children }) {
  //   const [supplier, setSupplier] = useState([]);

  //   const getSupplier = async () => {
  //     try {
  //       const res = await getSupplierRequest();
  //       setSupplier(res.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const getSupplie = async (id) => {
    try {
      const res = await getSupplieRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createSupplier = async (supplie) => {
    try {
      const res = await createSupplierRequest(supplie);
      console.log(res.data);
      getSupplier();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSupplyStatus = async (id) => {
    try {
      const res = await disableSupplierRequest(id);

      if (res.status === 200) {
        setSupplier((prevSupplier) =>
          prevSupplier.map((supply) =>
            supply.ID_Supplier === id
              ? { ...supply, State: !supply.State }
              : supply
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSupplier = async (id, supplie) => {
    try {
      await updateSupplierRequest(id, supplie);
      getSupplier();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSupplier = async (id) => {
    let isDeleted = false
    try {
      const res = await deleteSupplierRequest(id);
      if (res.status === 204) {
        setSupplier(supplier.filter((supplier) => supplier.ID_Supplier !== id));
        isDeleted = true
      }

        return isDeleted
      } catch (error) {
        console.log(error);
      }
      return isDeleted
  };

  return (
    <SupplierContext.Provider
      value={{
        supplier,
        getSupplier,
        getSupplie,
        createSupplier,
        toggleSupplyStatus,
        updateSupplier,
        deleteSupplier,
        getSupplierByState
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}
