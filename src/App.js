import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import POSPage from "./pages/POSPage";
import CartPage from "./pages/CartPage";
import MainLayout from "./layouts/MainLayout";

import { db } from "./firebase";
import SalesReport from "./components/SalesReport";
import SalesGrowth from "./components/SalesGrowth";
import OrderChart from "./components/OrderChart";
import CsvUploader from "./components/CsvUploader";
import { CartProvider } from "./store/CartContext";
import { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const ordersCollectionRef = collection(db, "orders");

function App() {
  return (
    <HashRouter>
      <CartProvider>
        <MainLayout>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<POSPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/sales" element={<SalesReport />} />
            <Route path="/saleR" element={<SalesReport />} />
            <Route path="/saleG" element={<SalesGrowth />} />
            <Route path="/upload" element={<CsvUploader />} />
            <Route path="/report" element={<OrderChart />} />
          </Routes>
        </MainLayout>
      </CartProvider>
    </HashRouter>
  );
}

export default App;

// useEffect(() => {
//   getData();
// }, []);

// const getData = async () => {
//   try {
//     const data = await getDocs(ordersCollectionRef);
//     const filteredData = data.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (err) {
//     console.error(err);
//   }
// };

// const saveData = async (item) => {
//   await addDoc(ordersCollectionRef, item);
// };

// const deleteData = async (id) => {
//   const Doc = doc(db, "orders", id);
//   await deleteDoc(Doc);
// };

// const updateMovieTitle = async (id) => {
//   const movieDoc = doc(db, "orders", id);
//   await updateDoc(movieDoc, { title: "updatedTitle" });
// };
