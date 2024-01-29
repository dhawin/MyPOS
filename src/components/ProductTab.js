import React, { useEffect, useState } from "react";

function ProductTab({ salesData }) {
  const [distinctYears, setDistinctYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    // Extract distinct years from salesData
    const years = Array.from(new Set(salesData.map((item) => item.year))).sort();
    setDistinctYears(years);
  }, [salesData]);

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    // Do something with the selected year, e.g., filter data
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

      {/* Add product-related content here */}
    </div>
  );
}

export default ProductTab;
