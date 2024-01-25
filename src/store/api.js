import axios from "axios";
const baseUrl = process.env.NODE_ENV === 'development' ? '':'/MyPOS'
export const fetchDataOrders = async () => {
  try {
    const response = await axios.get(baseUrl + "/db.json");
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
