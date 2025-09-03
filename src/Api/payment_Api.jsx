const API_BASE_URL = "http://localhost:5006/api";

export const createTransaction = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/Payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json(); // always parse JSON

    if (!res.ok) {
      // Non-200 responses throw
      throw new Error(result.message || 'Payment failed');
    }

    return result; // always returns the object
  } catch (err) {
    console.error(err);
    throw err; // component will handle notification
  }
};
