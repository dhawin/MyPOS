import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function CustomerTab({ salesData }) {
  const [distinctYears, setDistinctYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [thisYearData, setThisYearData] = useState([]);
  const [lastYearData, setLastYearData] = useState([]);
  const [thisYearCustomerSum, setThisYearCustomerSum] = useState({});
  const [lastYearCustomerSum, setLastYearCustomerSum] = useState({});
  const [sortedTableData, setSortedTableData] = useState([]);

  useEffect(() => {
    const years = Array.from(new Set(salesData.map((item) => item.year))).sort();
    setDistinctYears(years);
    handleYearChange(years[0]);
  }, [salesData]);

  useEffect(() => {
    // Filter data for the selected year
    const selectedYearData = salesData.filter((item) => item.year == selectedYear);
    setThisYearData(selectedYearData);

    // Calculate sum of Pc for each customer in the selected year
    const thisYearSum = selectedYearData.reduce((sums, item) => {
      const customer = item.Customer;
      sums[customer] = (sums[customer] || 0) + parseInt(item.Pc);
      return sums;
    }, {});
    setThisYearCustomerSum(thisYearSum);

    // Filter data for the last year
    const lastYearData = salesData.filter(
      (item) => item.year == (parseInt(selectedYear) - 1).toString()
    );
    setLastYearData(lastYearData);

    // Calculate sum of Pc for each customer in the last year
    const lastYearSum = lastYearData.reduce((sums, item) => {
      const customer = item.Customer;
      sums[customer] = (sums[customer] || 0) + parseInt(item.Pc);
      return sums;
    }, {});
    setLastYearCustomerSum(lastYearSum);
  }, [selectedYear, salesData]);

  useEffect(() => {
    if (thisYearCustomerSum && lastYearCustomerSum) {
      const customers = Array.from(
        new Set([...Object.keys(thisYearCustomerSum), ...Object.keys(lastYearCustomerSum)])
      );

      const tableData = customers.map((customer) => {
        const pcsThisYear = thisYearCustomerSum[customer] || 0;
        const pcsLastYear = lastYearCustomerSum[customer] || "-";
        const change =
          pcsLastYear != "-"
            ? (((pcsThisYear - pcsLastYear) / pcsLastYear) * 100).toFixed(2)
            : "N/A";

        return { customer, pcsThisYear, pcsLastYear, change };
      });

      // Sort tableData by the "Change" column
      const sortedData = tableData.sort((a, b) => {
        if (a.change === "N/A") return -1;
        if (b.change === "N/A") return 1;
        return parseFloat(b.change) - parseFloat(a.change);
      });

      setSortedTableData(sortedData);
    }
  }, [thisYearCustomerSum, lastYearCustomerSum]);

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  // Data for Bar Chart
  const barChartData = {
    labels: sortedTableData.map((item) => item.customer).slice(0, 10),
    datasets: [
      {
        label: "Pcs This Year",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.8)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: sortedTableData.map((item) => item.pcsThisYear),
      },
      {
        label: "Pcs Last Year",
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.8)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: sortedTableData.map((item) => item.pcsLastYear),
      },
    ],
  };

  const options = {
    indexAxis: "x",
    scales: {
      x: { stacked: false },
      y: { stacked: false },
    },
  };

  return (
    <div>
      <h2>Customer Tab Content</h2>
      {/* Dropdown for selecting years */}
      <label htmlFor="yearDropdown" aria-required="true">
        Overview Year
      </label>
      <select id="yearDropdown" value={selectedYear} onChange={e=>handleYearChange(e.target.value)}>
        <option value="">choose year</option>
        {distinctYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Display data for the selected year and last year in a table */}
      {selectedYear && thisYearData.length > 0 && (
        <div>
          {/* Bar Chart */}
          <Bar data={barChartData} options={options} />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Pcs This Year</th>
                <th>Pcs Last Year</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {sortedTableData.map(({ customer, pcsThisYear, pcsLastYear, change }) => (
                <tr key={customer}>
                  <td>{customer}</td>
                  <td>{parseInt(pcsThisYear).toLocaleString()}</td>
                  <td>{pcsLastYear != "-" ? parseInt(pcsLastYear).toLocaleString() : "-"}</td>
                  <td
                    style={{
                      color:
                        change !== "N/A" ? (parseFloat(change) >= 0 ? "green" : "red") : "black",
                    }}
                  >
                    {change !== "N/A" ? `${change}%` : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomerTab;
