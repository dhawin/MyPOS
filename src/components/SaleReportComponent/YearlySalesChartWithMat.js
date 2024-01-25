import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const YearlySalesChartWithMat = ({ salesData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [filteredSalesData, setFilteredSalesData] = useState(salesData);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const calculateTotalSalesByCustomer = (salesData) => {
    const totalSalesByCustomer = salesData.reduce((acc, item) => {
      const { material, Pc } = item;
      const parsedPc = parseInt(Pc, 10); // Convert 'Pc' to integer
      acc[material] = (acc[material] || 0) + parsedPc;
      return acc;
    }, {});

    const totalSalesArray = Object.entries(totalSalesByCustomer).map(([material, totalSales]) => ({
      material,
      totalSales,
    }));

    totalSalesArray.sort((a, b) => b.totalSales - a.totalSales);

    console.log(totalSalesArray);
    return totalSalesArray;
  };

  const calculateSalesByYearAndCustomers = (salesData) => {
    const totalSaleByCus = calculateTotalSalesByCustomer(salesData);
    debugger
    const salesByYearAndCustomers = salesData.reduce((acc, item) => {
      const { material, Pc, year } = item;
      const parsedPc = parseInt(Pc, 10);
  
      if (!acc[year]) {
        acc[year] = {
          top1: { total: 0, name: "Top1 :" + totalSaleByCus[0]?.material },
          top2: { total: 0, name: "Top2 :" + (totalSaleByCus[1]?.material || "N/A") },
          top3: { total: 0, name: "Top3 :" + (totalSaleByCus[2]?.material || "N/A") },
          top4: { total: 0, name: "Top4 :" + (totalSaleByCus[3]?.material || "N/A") },
          top5: { total: 0, name: "Top5 :" + (totalSaleByCus[4]?.material || "N/A") },
          rest: { total: 0, name: "Rest" },
        };
      }
  
      const materialData = {
        material: material,
        pc: parsedPc,
      };
  
      if (material === totalSaleByCus[0]?.material) {
        acc[year].top1.total += materialData.pc;
      } else if (material === totalSaleByCus[1]?.material) {
        acc[year].top2.total += materialData.pc;
      } else if (material === totalSaleByCus[2]?.material) {
        acc[year].top3.total += materialData.pc;
      } else if (material === totalSaleByCus[3]?.material) {
        acc[year].top4.total += materialData.pc;
      } else if (material === totalSaleByCus[4]?.material) {
        acc[year].top5.total += materialData.pc;
      } else {
        acc[year].rest.total += materialData.pc;
      }
  
      return acc;
    }, {});
  
    console.log(salesByYearAndCustomers);
  
    return salesByYearAndCustomers;
  };

  const getYearDataName = (data, cat) => {
    return data[Object.keys(data)[0]][cat].name;
  };

  const handleCustomerChange = (event) => {
    const customer = event.target.value;
    setSelectedCustomer(customer);

    if (customer === 'All') {
      setFilteredSalesData(salesData);
    } else {
      const filteredData = salesData.filter((item) => item.Customer === customer);
      setFilteredSalesData(filteredData);
    }
  };

  useEffect(() => {
    setFilteredSalesData(salesData);
  }, [salesData]);

  useEffect(() => {
    const salesByYearAndCustomers = calculateSalesByYearAndCustomers(filteredSalesData);

    if (!salesByYearAndCustomers || Object.keys(salesByYearAndCustomers).length === 0) {
      return;
    }

    if (chartInstance.current) {
      // Destroy the existing chart
      chartInstance.current.destroy();
    }

    // Create a new chart with salesByYearAndCustomers
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const colors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ];

      const labels = Object.keys(salesByYearAndCustomers);
      const datasets = ["rest", "top5", "top4", "top3", "top2", "top1"].map((category, index) => ({
        label: getYearDataName(salesByYearAndCustomers, category), // Capitalize the first letter
        backgroundColor: colors[index],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        data: labels.map((year) => salesByYearAndCustomers[year][category].total),
        stack: "stack1", // Assign a unique stack ID for correct stacking order
      }));

      // Create a new chart
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stacked: true, // Enable stacking on the y-axis
            },
            x: {
              stacked: true, // Enable stacking on the x-axis
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "Yearly Sales with Top 1 to Top 5 Customers and the Rest (Stacked)",
            },
          },
        },
      });
    }
  }, [filteredSalesData]);

  const distinctCustomers = [...new Set(salesData.map((item) => item.Customer))];
  distinctCustomers.unshift('All');

  return (
    <div>
      <label htmlFor="customerDropdown">Select Customer:</label>
      <select id="customerDropdown" value={selectedCustomer} onChange={handleCustomerChange}>
        {distinctCustomers.map((customer) => (
          <option key={customer} value={customer}>
            {customer}
          </option>
        ))}
      </select>
      <canvas ref={chartRef} />
    </div>
  );
};

export default YearlySalesChartWithMat;
