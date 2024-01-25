import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const YearlySalesChart = ({ salesData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const getChartData = () => {
      const years = Array.from(new Set(salesData.map(item => item.year)));
      const totalSalesByYear = years.map(year => {
        const totalSales = salesData
          .filter(item => item.year === year)
          .reduce((total, item) => total + parseInt(item.Pc), 0);

        return totalSales;
      });

      console.log(totalSalesByYear)

      return {
        labels: years,
        datasets: [
          {
            label: 'Total Sales',
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.4)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: totalSalesByYear,
          },
        ],
      };
    };

    const chartData = getChartData();

    if (chartInstance.current) {
      // Destroy the existing chart
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Create a new chart
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
      });
    }
  }, [salesData]);

  return <canvas ref={chartRef} />;
};

export default YearlySalesChart;
