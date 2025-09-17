import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid, CircularProgress, Alert } from '@mui/material';
import { Payment } from '@mui/icons-material';
import DataTable from '../services/Table';
import { createTransaction, getAllTransactions, updateTransaction, deleteTransaction } from "../Api/payment_Api";

export default function payment() {
  const [formData, setFormData] = useState({
    FirstName: '', MiddleName: '', LastName: '', Amount: '', BankName: '', AccountNumber: '',
    PaymentMethod:'BankTransfer',TransactionDate:'null',Status:'pending',TransactionId:'0'
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'firstName', headerName: 'First Name', width: 120 },
      { field: 'middleName', headerName: 'Middle Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 120 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'bankName', headerName: 'Bank Name', width: 150 },
     { field: 'transactionId', headerName: 'Transaction Id', width: 150 },
  ];
// Fetch dynamic data from API
const fetchData = async () => {
  setLoading(true);
  try {
    const data = await getAllTransactions();
    const mapped = data.map((item, index) => ({
      id: item.id ?? item.TransactionId ?? index, // Ensure each row has a unique id
      ...item,
    }));
    setRows(mapped);
  } catch (err) {
    showNotification(err.message, 'error');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);

// Form handlers
const handleChange = e => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleEdit = (row) => {
  setFormData({
    Id: row.id,
    FirstName: row.firstName,
    MiddleName: row.middleName,
    LastName: row.lastName,
    Amount: row.amount,
    BankName: row.bankName,
    AccountNumber: row.accountNumber,
    paymentMethod: row.paymentMethod,
    Status: row.status,
    TransactionId: row.transactionId,
    TransactionDate: row.transactionDate,
  });

  setIsEditing(true); // switch form into edit mode
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
    const transactionData = { 
      ...formData, 
      Amount: parseFloat(formData.Amount), 
      TransactionDate: new Date() 
    };
let response;
if (isEditing) {
  response = await updateTransaction(transactionData);
} else {
  response = await createTransaction(transactionData);
}

if (response.success) {
  

  if (isEditing) setIsEditing(false);

  await fetchData(); // Refresh data

  // Reset form
  setFormData({
    Id: 0,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Amount: '',
    BankName: '',
    AccountNumber: '',
    paymentMethod: 'BankTransfer',
    Status: '',
    TransactionId: '',
    TransactionDate: ''
  });
}
}
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this transaction?")) return;
    try {
      await deleteTransaction(id);
      setRows(prev => prev.filter(r => r.id !== id));
      showNotification("Transaction deleted successfully!", "success");
    } catch (err) {
      showNotification(err.message || "Delete failed", "error");
    }
  };

  return (
    <Box sx={{ Width: '100%', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        <Payment sx={{ fontSize: 40, verticalAlign: 'bottom', mr: 1 }} /> Payment Form
      </Typography>

    

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" name="FirstName" value={formData.FirstName} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Middle Name" name="MiddleName" value={formData.MiddleName} onChange={handleChange} disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" name="LastName" value={formData.LastName} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Bank Name" name="BankName" value={formData.BankName} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Account Number" name="AccountNumber" value={formData.AccountNumber} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Amount" name="Amount" type="number" value={formData.Amount} onChange={handleChange} required disabled={loading} />
              </Grid>
            </Grid>
         <Button type="submit"  variant="contained"  fullWidth sx={{ mt: 3,backgroundColor:'#1a552a' }}  disabled={loading}>
  {loading ? (<CircularProgress size={24} />) : isEditing ? (  'Update Payment' ) : (
    'Process Payment' )}
</Button>

            
          </form>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={fetchData} sx={{ mb: 2 }}>Refresh Table</Button>
        <DataTable rows={rows} columns={columns} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>
    </Box>
  );
}


