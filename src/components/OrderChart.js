import React, { useEffect, useState } from "react";
import axios from "axios";
import YearlySalesChart from './SaleReportComponent/YearlySalesChart'
import YearlySalesChartWithCus  from './SaleReportComponent/YearlySalesChartWithCus'
import YearlySalesChartWithMat  from './SaleReportComponent/YearlySalesChartWithMat'
import fetchDataOrders from '../store/api'


const OrderChart = () => {
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    setOrderData(fetchDataOrders());
  }, []);

  return (
    <div>
      <h2>Order Chart</h2>
      <YearlySalesChart salesData={orderData}/>
      <YearlySalesChartWithCus salesData={orderData}/>
      <YearlySalesChartWithMat salesData={orderData}/>
    </div>
  );
};

export default OrderChart;
