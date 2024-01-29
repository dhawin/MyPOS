import axios from "axios";
import { img } from "../constants/constants";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../firebase";

const baseUrl = process.env.NODE_ENV === 'development' ? '':'/MyPOS'
export const fetchDataOrders = async () => {
  try {
    const response = await axios.get(baseUrl + "/db.json");
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchDataProduct = async () => {
  try {
    const response = await axios.get(baseUrl + "/db.json");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const collectionRef = collection(db, "products");
const queryRef = query(collectionRef, limit(50));

export const fetchDataProductFromFirebase = async () => {
  try {
    const ordersCollection = await getDocs(queryRef);

    const ordersData = ordersCollection.docs.map((doc, index) => ({
      id: doc.data().id,
      name: doc.data().name || "N/A",
      price: doc.data().price || 0,
      image: doc.data().image || "",
    }));
    return ordersData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const ordersCollectionRef = collection(db, "orders");
const ordersQueryRef = query(ordersCollectionRef, limit(50));

export const fetchDataOrdersFromFirebase = async () => {
  try {
    const ordersCollection = await getDocs(ordersQueryRef);

    const ordersData = ordersCollection.docs.map((doc) => ({
      saleorder: doc.data().Saleorder || "N/A",
      material_id: doc.data().material_id || "N/A",
      quantity: doc.data().quantity || 0,
    }));
    return ordersData;
  } catch (error) {
    console.error("Error fetching orders data:", error);
  }
};


const saleordersCollectionRef = collection(db, "saleorders");
const saleordersQueryRef = query(saleordersCollectionRef, limit(50));

export const fetchDataSaleordersFromFirebase = async () => {
  try {
    const saleordersCollection = await getDocs(saleordersQueryRef);

    const saleordersData = saleordersCollection.docs.map((doc) => ({
      id: doc.data().id || "N/A",
      customer: doc.data().customer || "N/A",
      year: doc.data().year || 0,
    }));
    return saleordersData;
  } catch (error) {
    console.error("Error fetching saleorders data:", error);
  }
};


const customersCollectionRef = collection(db, "customers");
const customersQueryRef = query(customersCollectionRef, limit(50));

export const fetchDataCustomersFromFirebase = async () => {
  try {
    const customersCollection = await getDocs(customersQueryRef);

    const customersData = customersCollection.docs.map((doc) => ({
      id: doc.data().id || "N/A",
      name: doc.data().name || "N/A",
    }));
    return customersData;
  } catch (error) {
    console.error("Error fetching customers data:", error);
  }
};