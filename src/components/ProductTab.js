import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

function ProductTab({ salesData }) {
  const [distinctYears, setDistinctYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedYearData, setSelectedYearData] = useState([]);
  const [previousYearData, setPreviousYearData] = useState([]);
  const [selectedYearTotal, setSelectedYearTotal] = useState(0);
  const [previousYearTotal, setPreviousYearTotal] = useState(0);
  const [targetSale, setTargetSale] = useState(0);
  const [targetSaleGoal, setTargetSaleGoal] = useState(0);
  const [materialSumData, setMaterialSumData] = useState([]);
  const [lastYearMaterialSum, setLastYearMaterialSum] = useState([]);

  const [materialTableData, setMaterialTableData] = useState([]);

  useEffect(() => {
    // Extract distinct years from salesData
    const years = Array.from(new Set(salesData.map((item) => item.year))).sort();
    setDistinctYears(years);
  }, [salesData]);

  const calculateYearTotals = (year) => {
    // Calculate total pc for the selected year
    const selectedYearPcTotal = selectedYearData.reduce(
      (total, item) => total + parseInt(item.Pc),
      0
    );

    // Calculate total pc for the previous year
    const previousYearPcTotal = previousYearData.reduce(
      (total, item) => total + parseInt(item.Pc),
      0
    );

    setSelectedYearTotal(selectedYearPcTotal);
    setPreviousYearTotal(previousYearPcTotal);

    // Calculate targetSale
    const targetSaleValue = previousYearPcTotal + previousYearPcTotal * 0.05;
    setTargetSale(targetSaleValue);

    // Calculate targetSaleGoal
    const targetSaleGoalValue = (selectedYearPcTotal * 100) / previousYearPcTotal - 100;
    setTargetSaleGoal(targetSaleGoalValue);
  };

  const calculateMaterialSumData = () => {
    // Calculate material sums and sort
    const sums = {};
    selectedYearData.forEach((item) => {
      if (!sums[item.material]) {
        sums[item.material] = 0;
      }
      sums[item.material] += parseInt(item.Pc);
    });

    const sortedMaterialSumData = Object.entries(sums)
      .map(([material, sum]) => ({ material, sum }))
      .sort((a, b) => b.sum - a.sum);

    setMaterialSumData(sortedMaterialSumData);

    // Calculate material sums and sort for prev year
    const sumsPrev = {};
    previousYearData.forEach((item) => {
      if (!sumsPrev[item.material]) {
        sumsPrev[item.material] = 0;
      }
      sumsPrev[item.material] += parseInt(item.Pc);
    });

    const sortedMaterialSumPrevData = Object.entries(sumsPrev)
      .map(([material, sum]) => ({ material, sum }))
      .sort((a, b) => b.sum - a.sum);

    setLastYearMaterialSum(sortedMaterialSumPrevData);
  };

  const calculateMaterialTableData = () => {
    const tableData = materialSumData.map((item) => {
      const pcsThisYear = item.sum;
      const pcsLastYear =
        lastYearMaterialSum.find((lastYearItem) => lastYearItem.material === item.material)?.sum ||
        0;
      const changePercentage = pcsLastYear == 0 ? pcsThisYear : ((pcsThisYear - pcsLastYear) / pcsLastYear) * 100 || 0;

      return {
        material: item.material,
        pcsThisYear,
        pcsLastYear,
        changePercentage,
      };
    });

    tableData.sort((a, b) => b.changePercentage - a.changePercentage);

    setMaterialTableData(tableData);
  };

  useEffect(() => {
    calculateYearTotals(selectedYear);
    calculateMaterialSumData();
  }, [selectedYear]);

  useEffect(() => {
    calculateMaterialTableData();
  }, [materialSumData, lastYearMaterialSum]);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    const selectedYearData = salesData.filter((item) => item.year == selectedYear);
    setSelectedYearData(selectedYearData);
    const previousYearData = salesData.filter(
      (item) => item.year == (parseInt(selectedYear) - 1).toString()
    );
    setPreviousYearData(previousYearData);
  };

  // Prepare data for top and bottom materials
  const topMaterials = materialSumData?.slice(0, 10) || [];
  const bottomMaterials = materialSumData?.slice(-10) || [];

  // Create datasets for Chart.js
  const topMaterialsDataset = {
    label: "Top 20 Materials",
    data: topMaterials.map((item) => item.sum),
    backgroundColor: "rgba(75,192,192,0.2)",
    borderColor: "rgba(75,192,192,1)",
    borderWidth: 1,
  };

  const bottomMaterialsDataset = {
    label: "Bottom 20 Materials",
    data: bottomMaterials.map((item) => item.sum),
    backgroundColor: "rgba(255,99,132,0.2)",
    borderColor: "rgba(255,99,132,1)",
    borderWidth: 1,
  };

  const chartTopData = {
    labels: [...topMaterials].map((item) => item.material),
    datasets: [topMaterialsDataset],
  };

  const chartBottomData = {
    labels: [...bottomMaterials].map((item) => item.material),
    datasets: [bottomMaterialsDataset],
  };

  const chartOptions = {
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      <h2>Product Tab Content</h2>
      {/* Dropdown for selecting years */}
      <label htmlFor="yearDropdown" aria-required="true">
        Overview Year
      </label>
      <select id="yearDropdown" value={selectedYear} onChange={handleYearChange}>
        <option value="">choose year</option>
        {distinctYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Display total pc for selected year and previous year */}
      {selectedYear && (
        <div>
          <p>
            Total PC for {selectedYear}: {selectedYearTotal.toLocaleString()}
          </p>
          <p>
            Total PC for {parseInt(selectedYear) - 1} (Previous Year):{" "}
            {previousYearTotal.toLocaleString()}
          </p>
          <p>Target Sale: {targetSale.toLocaleString()}</p>
          <p style={{ color: targetSaleGoal >= 0 ? "green" : "red" }}>
            Target Sale Goal:{" "}
            {targetSaleGoal >= 0
              ? `+${targetSaleGoal.toFixed(2).toLocaleString()}%`
              : `${targetSaleGoal.toFixed(2).toLocaleString()}%`}
          </p>
        </div>
      )}

      {/* Display material table */}
      <h3>Material Table:</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Material</th>
            <th>PCS This Year</th>
            <th>PCS Last Year</th>
            <th>Change %</th>
          </tr>
        </thead>
        <tbody>
          {materialTableData.map(({ material, pcsThisYear, pcsLastYear, changePercentage }) => (
            <tr key={material}>
              <td>{material}</td>
              <td>{pcsThisYear.toLocaleString()}</td>
              <td>{pcsLastYear.toLocaleString()}</td>
              <td style={{ color: changePercentage >= 0 ? "green" : "red" }}>
                {changePercentage.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display top and bottom materials charts */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <h3>Top Materials Chart:</h3>
          {materialSumData && materialSumData.length > 0 ? (
            <Bar data={chartTopData} options={chartOptions} />
          ) : (
            <p>No data available for top materials.</p>
          )}
        </div>
        <div style={{ width: "45%" }}>
          <h3>Bottom Materials Chart:</h3>
          {materialSumData && materialSumData.length > 0 ? (
            <Bar data={chartBottomData} options={chartOptions} />
          ) : (
            <p>No data available for bottom materials.</p>
          )}
        </div>
      </div>

      {/* Add product-related content here */}
    </div>
  );
}

export default ProductTab;
