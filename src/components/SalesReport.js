import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

const SalesReport = () => {
  const [orders, setOrders] = useState([]);

  const collectionRef = collection(db, "orders");
  const queryRef = query(collectionRef, limit(50));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = await getDocs(queryRef);
        const ordersData = ordersCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Material</th>
            <th>Year</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>{order.material}</td>
              <td>{order.year}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
