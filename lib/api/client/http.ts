import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://food-flow-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
