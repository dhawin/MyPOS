import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const YearlySalesChartWithCus = ({ salesData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [filteredSalesData, setFilteredSalesData] = useState(salesData);
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const calculateTotalSalesByCustomer = (salesData) => {
    const totalSalesByCustomer = salesData.reduce((acc, item) => {
      const { Customer, Pc } = item;
      const parsedPc = parseInt(Pc, 10); // Convert 'Pc' to integer
      acc[Customer] = (acc[Customer] || 0) + parsedPc;
      return acc;
    }, {});

    const totalSalesArray = Object.entries(totalSalesByCustomer).map(([customer, totalSales]) => ({
      customer,
      totalSales,
    }));

    totalSalesArray.sort((a, b) => b.totalSales - a.totalSales);

    console.log(totalSalesArray);
    return totalSalesArray;
  };

  const calculateSalesByYearAndCustomers = (salesData) => {
    const totalSaleByCus = calculateTotalSalesByCustomer(salesData);
    const salesByYearAndCustomers = salesData.reduce((acc, item) => {
      const { Customer, Pc, year } = item;
      const parsedPc = parseInt(Pc, 10);
  
      if (!acc[year]) {
        acc[year] = {
          top1: { total: 0, name: "Top1 :" + totalSaleByCus[0]?.customer },
          top2: { total: 0, name: "Top2 :" + (totalSaleByCus[1]?.customer || "N/A") },
          top3: { total: 0, name: "Top3 :" + (totalSaleByCus[2]?.customer || "N/A") },
          rest: { total: 0, name: "Rest" },
        };
      }
  
      const customerData = {
        customer: Customer,
        pc: parsedPc,
      };
  
      if (Customer === totalSaleByCus[0]?.customer) {
        acc[year].top1.total += customerData.pc;
      } else if (Customer === totalSaleByCus[1]?.customer) {
        acc[year].top2.total += customerData.pc;
      } else if (Customer === totalSaleByCus[2]?.customer) {
        acc[year].top3.total += customerData.pc;
      } else {
        acc[year].rest.total += customerData.pc;
      }
  
      return acc;
    }, {});
  
    console.log(salesByYearAndCustomers);
  
    return salesByYearAndCustomers;
  };

  const getYearDataName = (data,cat) => {
    return data[Object.keys(data)[0]][cat].name;
  };

  const handleMaterialChange = (event) => {
    const material = event.target.value;
    setSelectedMaterial(material);

    if (material === 'All') {
      setFilteredSalesData(salesData);
    } else {
      const filteredData = salesData.filter((item) => item.material === material);
      setFilteredSalesData(filteredData);
    }
  };

  useEffect(() => {
    setFilteredSalesData(salesData);
  },[salesData])

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
      ];

      const labels = Object.keys(salesByYearAndCustomers);
      const datasets = ["rest", "top3", "top2", "top1"].map((category, index) => ({
        label:getYearDataName(salesByYearAndCustomers, category), // Capitalize the first letter
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
              text: "Yearly Sales with Top 1, Top 2, Top 3 Customers and the Rest",
            },
          },
        },
      });
    }
  }, [filteredSalesData]);

  const distinctMaterials = [...new Set(salesData.map((item) => item.material))];
  distinctMaterials.unshift('All');

  return (
    <div>
      <label htmlFor="materialDropdown">Select Material:</label>
      <select id="materialDropdown" value={selectedMaterial} onChange={handleMaterialChange}>
        {distinctMaterials.map((material) => (
          <option key={material} value={material}>
            {material}
          </option>
        ))}
      </select>
      <canvas ref={chartRef} />
    </div>
  );
};

export default YearlySalesChartWithCus;
