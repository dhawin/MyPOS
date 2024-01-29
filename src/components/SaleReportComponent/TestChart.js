import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { DataFrame } from 'pandas-js';
import _ from 'lodash';

const CorrelationChart = ({ salesData }) => {
  const [data, setData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  useEffect(() => {
    if (salesData.length > 0 && salesData[0] && selectedCustomer) {
      // Filter data for the selected customer
      const filteredData = selectedCustomer
        ? salesData.filter(row => row['Customer'] === selectedCustomer)
        : salesData;

        debugger

      if (filteredData.length > 0) {
        // Process data to create a DataFrame using pandas-js
        const df = new DataFrame(filteredData);

        // Use Lodash to efficiently group and pivot the data
        const grouped = _.groupBy(df.values, row => {
            console.log(row)
            return `${row['Customer']}_${row['material']}`
        });
        const pivoted = _.map(grouped, (group, key) => {
          const [customer, material] = key.split('_');
          const pcSum = _.sumBy(group, row => row['Pc']);
          return [customer, material, pcSum];
        });

        // Convert the pivoted data to an array for Chart.js
        const correlationData = pivoted.map(row => row.map(val => val || 0));

        setData(correlationData);
      } else {
        setData([]); // No data for the selected customer, reset data
      }
    }
  }, [salesData, selectedCustomer]);

  // Render chart only if a customer is selected
  const renderChart = selectedCustomer && data.length > 0;

  const chartData = {
    labels: _.uniq(salesData.map(row => row['Customer'])),
    datasets: salesData.map((sale, index) => ({
      label: `Material ${index + 1}`,
      data: data[index] || [],
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.7)`,
      borderWidth: 1,
    })),
  };

  const chartOptions = {
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      <label>Select Customer:</label>
      <select onChange={(e) => setSelectedCustomer(e.target.value)}>
        <option value="">All Customers</option>
        {_.uniq(salesData.map(row => row['Customer'])).map((customer, index) => (
          <option key={index} value={customer}>
            {customer}
          </option>
        ))}
      </select>

      {renderChart ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Please select a customer to view the chart.</p>
      )}
    </div>
  );
};

export default CorrelationChart;
