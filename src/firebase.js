import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDDnbzU3m7sH8NonJWRqot4nCfihwE6CNU",
//   authDomain: "trusty-spanner-412208.firebaseapp.com",
//   projectId: "trusty-spanner-412208",
//   storageBucket: "trusty-spanner-412208.appspot.com",
//   messagingSenderId: "643920235965",
//   appId: "1:643920235965:web:d859889b4bc64e6b3816d4",
//   measurementId: "G-R3Q6V8SGLD"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCJdTH9JxGrTSE0b5kZoF-YOEUgC6iXgn4",
  authDomain: "orderingsys-e83f1.firebaseapp.com",
  projectId: "orderingsys-e83f1",
  storageBucket: "orderingsys-e83f1.appspot.com",
  messagingSenderId: "618021157942",
  appId: "1:618021157942:web:5f048675cf9f7cc4b9ac97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
