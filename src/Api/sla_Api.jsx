import { triggerNotification } from '../shared/services/notificationService';

const API_BASE_URL = "http://localhost:5006/api";

export const createSla = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Sla`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "SLA creation failed");
    }
    triggerNotification(result.message || 'SLA created', 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllSlas = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/Sla`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch SLAs");
    }
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSlaById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Sla/${id}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "SLA not found");
    }
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateSla = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Sla`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update SLA");
    }
    triggerNotification(result.message || 'SLA updated', 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteSla = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Sla/${id}`, { method: "DELETE" });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to delete SLA");
    }
    triggerNotification(result.message || 'SLA deleted', 'success');
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


