import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import { db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { forInitDb } from "../constants/initDb";

const CsvUploader = () => {
  const handleCsvData = async (data) => {
    // Assuming CSV has headers (first row)
    const [headers, ...rows] = data;

    // Get distinct materials
    const distinctMaterials = Array.from(new Set(rows.map((row) => row[2])));

    // Create an array of objects with distinct materials and random prices
    const materialsData = distinctMaterials.map((material) => ({
      name: material,
      price: Math.floor(Math.random() * 20) + 1,
    }));

    // Log the materials data
    console.log("Distinct materials and random prices:", materialsData);

    debugger;

    // Add materialsData to Firestore
    const materialsCollectionRef = collection(db, "products"); // Replace with your Firestore collection name
    materialsData.forEach(async (material) => {
      await addDoc(materialsCollectionRef, material);
    });

    const collectionRef = collection(db, "orders");

    rows.forEach(async (row) => {
      const dataObj = {};

      // Assuming headers and row have the same length
      headers.forEach((header, index) => {
        dataObj[header] = row[index];
      });

      // Add data to Firestore
      await addDoc(collectionRef, dataObj);
    });

    console.log("CSV data imported to Firebase!");
  };

  const handleUpload = async () => {
    console.log(forInitDb)
    await addDataToCollection('products', forInitDb.products);
    await addDataToCollection('orders', forInitDb.orders);
    await addDataToCollection('saleorders', forInitDb.saleorders);
    await addDataToCollection('customers', forInitDb.customers);
  };

  // Function to add data to Firestore
const addDataToCollection = async (collectionName, dataArray) => {
  for (const data of dataArray) {
    await addDoc(collection(db, collectionName), data);
  }
};

  return (
    <div>
      <button onClick={handleUpload}>Upload</button>
      {/* <CSVReader onFileLoaded={handleCsvData} /> */}
    </div>
  );
};

export default CsvUploader;
