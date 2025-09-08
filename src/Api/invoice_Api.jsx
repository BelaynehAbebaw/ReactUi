import { triggerNotification } from '../shared/services/notificationService';

const API_BASE_URL = "http://localhost:5006/api";

export const createInvoice = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Invoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Invoice creation failed");
    }
    triggerNotification(result.message || 'Invoice created', 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllInvoices = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/Invoice`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch invoices");
    }
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Invoice/${id}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Invoice not found");
    }
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateInvoice = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Invoice`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update invoice");
    }
    triggerNotification(result.message || 'Invoice updated', 'success');
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteInvoice = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Invoice/${id}`, { method: "DELETE" });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to delete invoice");
    }
    triggerNotification(result.message || 'Invoice deleted', 'success');
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


