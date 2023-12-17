import { createContext, useContext, useState, useEffect } from "react";
import {
  getSaleByTimepc,
  getSaleByuserpc,
  getBestProd,
  getShopByTimepc,
  getEXPS

} from "../Api/Dashboard.request";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "Ha ocurrido un error con el uso del contexto del dashboard"
    );
  }

  return context;
};

export function DashboardProvider({ children }) {
  const [salesChart, setsalesChart] = useState([]);
  const [shopsChart, setshopsChart] = useState([]);
  const [salesuserChart, setsalesuserChart] = useState([]);
  const [besProd, setbesProd] = useState([]);
  const [supli, setsupli] = useState([]);


  

  const fetchSales= async () => {
    try {
      const res = await getSaleByTimepc();
      setsalesChart(res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchShops= async () => {
    try {
      const res = await getShopByTimepc();
      setshopsChart(res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSalesusers= async () => {
    try {
      const res = await getSaleByuserpc();
      setsalesuserChart(res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBP= async () => {
    try {
      const res = await getBestProd();
      setbesProd(res.data)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchsupli= async () => {
    try {
      const res = await getEXPS();
      setsupli(res.data)
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <DashboardContext.Provider
      value={{
        salesChart,
        fetchSales,
        fetchSalesusers,
        salesuserChart,
        fetchBP,
        besProd,
        shopsChart,
        fetchShops,
        fetchsupli,
        supli

      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}