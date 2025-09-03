// src/api/paymentApi.js
import axios from "axios";

const API_BASE_URL = "https://localhost:7282/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Users
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);

// Accounts
export const getAccounts = () => api.get("/accounts");

// Transactions
export const createTransaction = (data) => api.post(data, controller);
export const getTransactions = () => api.get("/transactions");

// Payment Methods
export const getPaymentMethods = () => api.get("/paymentmethods");
