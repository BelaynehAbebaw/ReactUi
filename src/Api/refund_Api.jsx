import { triggerNotification } from '../shared/services/notificationService';

const API_BASE_URL = "http://localhost:5006/api";

export const createRefund = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Refund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Refund request failed");
    }
    triggerNotification(result.message || 'Refund created', 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllRefunds = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/Refund`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch refunds");
    }
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRefundById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Refund/${id}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Refund not found");
    }
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateRefund = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Refund`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update refund");
    }
    triggerNotification(result.message || 'Refund updated', 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteRefund = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Refund/${id}`, { method: "DELETE" });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to delete refund");
    }
    triggerNotification(result.message || 'Refund deleted', 'success');
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


