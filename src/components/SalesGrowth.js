import React, { useEffect, useState } from "react";
import { fetchDataOrders } from "../store/api";
import '../assets/styles/SalesGrowth.css'
import SalesGrowthGraph from "./SalesGrowthGraph";

const SalesGrowth = () => {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchDataOrders();
        setSalesData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Calculate POS and Growth Rate for each year
    const distinctYears = Array.from(new Set(salesData.map((item) => item.year))).sort((a, b) => a - b);
    const tableRows = distinctYears.map((year, index) => {
      const pos = salesData
        .filter((item) => item.year === year)
        .reduce((sum, currItem) => sum + parseInt(currItem.Pc, 10), 0);

      return {
        year,
        POS: pos,
      };
    });

    const tableDataWithGrowthRate = tableRows.map((row, index) => {
      // Calculate Growth Rate
      const growthRate =
        index > 0 ? ((row.POS - tableRows[index - 1].POS) / tableRows[index - 1].POS) * 100 : 0;

      return {
        ...row,
        GrowthRate: growthRate,
      };
    });

    setTableData(tableDataWithGrowthRate);
  }, [salesData]);

  return (
    <div className="container">
      <div className="row">
        {/* Table on the left */}
        <div className="col-md-6">
          <div className="table-container">
            <h2>Sales Growth Table</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Pcs</th>
                  <th>Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.year}>
                    <td>{row.year}</td>
                    <td>{row.POS.toLocaleString()}</td>
                    <td style={{ color: row.GrowthRate >= 0 ? "green" : "red" }}>
                      {row.GrowthRate.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Graph on the right */}
        <div className="col-md-6">
          <div className="graph-container">
            <h2>Sales Growth Graph</h2>
            <SalesGrowthGraph data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesGrowth;
