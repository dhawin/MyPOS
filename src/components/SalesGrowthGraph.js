import React from "react";
import { Bar } from "react-chartjs-2";

function SalesGrowthGraph({ data }) {
  const years = data.map((row) => row.year.toString());
  const posValues = data.map((row) => row.POS);
  const growthRateValues = data.map((row) => row.GrowthRate);

console.log(years)

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Pcs",
        data: posValues,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
      {
        label: "Growth Rate",
        data: growthRateValues,
        type: "line",
        yAxisID: "y-axis-2",
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        // type: "linear",
        position: "bottom",
      },
      y: {
        beginAtZero: true,
      },
      y2: {
        type: "linear",
        position: "right",
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default SalesGrowthGraph;
