import React, { useEffect, useState } from "react";
import axios from "axios";
import YearlySalesChart from './SaleReportComponent/YearlySalesChart'
import YearlySalesChartWithCus  from './SaleReportComponent/YearlySalesChartWithCus'
import YearlySalesChartWithMat  from './SaleReportComponent/YearlySalesChartWithMat'


const OrderChart = () => {
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/db.json');
        setOrderData(response.data.orders);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
