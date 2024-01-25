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
  apiKey: "AIzaSyBOY8gFJpeVb-imdsqdoLq4L9xR77JdbYc",
  authDomain: "test-c6a06.firebaseapp.com",
  projectId: "test-c6a06",
  storageBucket: "test-c6a06.appspot.com",
  messagingSenderId: "439214314046",
  appId: "1:439214314046:web:7ec9939f93a851e213376f",
  measurementId: "G-EZ57NPVPFQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
