import React, { useState, useEffect } from "react";
import ProductTab from "./ProductTab";
import CustomerTab from "./CustomerTab";
import {fetchDataOrders} from '../store/api'

function SaleReport() {
  const [activeTab, setActiveTab] = useState("product");

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchDataOrders();
        setOrderData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="mb-3">
        <button
          className={`btn ${activeTab === "product" ? "btn-primary" : "btn-light"}`}
          onClick={() => handleTabChange("product")}
        >
          Product Report
        </button>
        <button
          className={`btn ${activeTab === "customer" ? "btn-primary" : "btn-light"}`}
          onClick={() => handleTabChange("customer")}
        >
          Customer Report
        </button>
      </div>

      {activeTab === "product" ? <ProductTab salesData={orderData}/> : <CustomerTab salesData={orderData}/>}
    </div>
  );
}

export default SaleReport;
