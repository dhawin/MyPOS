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
    handleYearChange(years[0]);
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
        "-";
      const changePercentage =
        pcsLastYear == "-"
          ? "N/A"
          : (((pcsThisYear - pcsLastYear) / pcsLastYear) * 100 || 0).toFixed(2);

      return {
        material: item.material,
        pcsThisYear,
        pcsLastYear,
        changePercentage,
      };
    });

    tableData.sort((a, b) => {
      if (a.changePercentage === "N/A" && b.changePercentage !== "N/A") {
        return 1; // Move "N/A" to the end
      } else if (a.changePercentage !== "N/A" && b.changePercentage === "N/A") {
        return -1; // Move "N/A" to the end
      } else {
        return parseFloat(b.changePercentage) - parseFloat(a.changePercentage);
      }
    });

    setMaterialTableData(tableData);
  };

  useEffect(() => {
    calculateYearTotals(selectedYear);
    calculateMaterialSumData();
  }, [selectedYear]);

  useEffect(() => {
    calculateMaterialTableData();
  }, [materialSumData, lastYearMaterialSum]);

  const handleYearChange = (selectedYear) => {
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
      {/* Dropdown for selecting years */}
      <div class="container-fluid">
        <div className="row">
          <div className="col-xl-4 col-md-6 mb-4">
            <label htmlFor="yearDropdown" aria-required="true">
              Overview Year
            </label>
            <select
              id="yearDropdown"
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="">choose year</option>
              {distinctYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Display total pc for selected year and previous year */}
      {selectedYear && (
        <>
          <div class="container-fluid">
            <div className="row">
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Total ({selectedYear})
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {selectedYearTotal.toLocaleString()} Pcs
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Target Sale
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {targetSale.toLocaleString()} Pcs
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Earnings (Monthly) Card Example */}
              <div className="col-xl-4 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div
                          className={
                            "text-xs font-weight-bold text-uppercase mb-1 " +
                            (targetSaleGoal >= 0 ? "text-info" : "text-danger")
                          }
                        >
                          Target Sale Goal (%)
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div
                              className={
                                "h5 mb-0 mr-3 font-weight-bold text-gray-800 " +
                                (targetSaleGoal >= 0 ? "" : "text-danger")
                              }
                            >
                              {targetSaleGoal >= 0
                                ? targetSaleGoal === Infinity
                                  ? "N/A"
                                  : `+${targetSaleGoal.toFixed(2).toLocaleString()}%`
                                : `${targetSaleGoal.toFixed(2).toLocaleString()}%`}
                            </div>
                          </div>
                          <div className="col">
                            <div className="progress progress-sm mr-2">
                              <div
                                className={
                                  "progress-bar " + (targetSaleGoal >= 0 ? "bg-info" : "bg-danger")
                                }
                                role="progressbar"
                                style={{
                                  width:
                                    targetSaleGoal >= 0
                                      ? targetSaleGoal === Infinity
                                        ? "N/A"
                                        : `+${targetSaleGoal.toFixed(2).toLocaleString()}%`
                                      : `${targetSaleGoal.toFixed(2).toLocaleString()}%`,
                                }}
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <p>
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
            </p> */}
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h3>Top Materials Chart:</h3>
                {materialSumData && materialSumData.length > 0 ? (
                  <Bar data={chartTopData} options={chartOptions} />
                ) : (
                  <p>No data available for top materials.</p>
                )}
              </div>
              <div className="col-md-6">
                <h3>Bottom Materials Chart:</h3>
                {materialSumData && materialSumData.length > 0 ? (
                  <Bar data={chartBottomData} options={chartOptions} />
                ) : (
                  <p>No data available for bottom materials.</p>
                )}
              </div>
            </div>
          </div>

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
                    {changePercentage}
                    {changePercentage != "N/A" ? "%" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ProductTab;
