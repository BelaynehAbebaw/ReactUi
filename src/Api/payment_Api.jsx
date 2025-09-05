import { triggerNotification  } from '../services/notificationService';
  const API_BASE_URL = "http://localhost:5006/api";
export const createTransaction = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
console.log(result)
    if (!res.ok) {
      throw new Error(result.message || "Payment failed");
    }
    triggerNotification(result.message, 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ✅ Get all transactions
export const getAllTransactions = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/Payment`);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch transactions");
    }

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ✅ Get transaction by ID
export const getTransactionById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Payment/${id}`);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Transaction not found");
    }

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ✅ Update transaction
export const updateTransaction = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Payment/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update transaction");
    }
    console.log(result)
     triggerNotification(result.message, 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ✅ Delete transaction
export const deleteTransaction = async (id) => {
  try {
    console.log(id)
    const res = await fetch(`${API_BASE_URL}/Payment/${id}`, {
      method: "DELETE",
    });
     const result = await res.json();
    if (!res.ok) {
     
      throw new Error(result.message || "Failed to delete transaction");
    }
       console.log(result.message)
   triggerNotification(result.message, 'success');
    return true; // success
  } catch (err) {
    console.error(err);
    throw err;
  }
};
