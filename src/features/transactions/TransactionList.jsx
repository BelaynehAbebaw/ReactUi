// src/components/TransactionsList.jsx
import React, { useEffect, useState } from "react";
const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(res => setTransactions(res.data));
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>From Account</th>
            <th>To Account</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.fromAccountId}</td>
              <td>{txn.toAccountId}</td>
              <td>{txn.amount}</td>
              <td>{txn.status}</td>
              <td>{new Date(txn.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
