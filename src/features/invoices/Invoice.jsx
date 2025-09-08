import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DataTable from '../../shared/ui/DataTable';
import { createInvoice, getAllInvoices, updateInvoice, deleteInvoice } from '../../Api/invoice_Api';

export default function Invoice() {
  const [formData, setFormData] = useState({
    InvoiceId: 0,
    CustomerName: '',
    Amount: '',
    DueDate: '',
    Status: 'Pending'
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'customerName', headerName: 'Customer', width: 160 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'dueDate', headerName: 'Due Date', width: 160 },
    { field: 'status', headerName: 'Status', width: 120 }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllInvoices();
      const mapped = data.map((item, index) => ({ id: item.id ?? item.invoiceId ?? index, ...item }));
      setRows(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (row) => {
    setFormData({
      InvoiceId: row.id,
      CustomerName: row.customerName,
      Amount: row.amount,
      DueDate: row.dueDate,
      Status: row.status
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, Amount: parseFloat(formData.Amount) };
    const res = isEditing ? await updateInvoice(payload) : await createInvoice(payload);
    if (res) {
      setIsEditing(false);
      setFormData({ InvoiceId: 0, CustomerName: '', Amount: '', DueDate: '', Status: 'Pending' });
      await fetchData();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this invoice?')) return;
    await deleteInvoice(id);
    setRows(prev => prev.filter(r => r.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        <ReceiptIcon sx={{ fontSize: 40, verticalAlign: 'bottom', mr: 1 }} /> Invoices
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Customer Name" name="CustomerName" value={formData.CustomerName} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Amount" name="Amount" type="number" value={formData.Amount} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Due Date" name="DueDate" type="date" InputLabelProps={{ shrink: true }} value={formData.DueDate} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Status" name="Status" value={formData.Status} onChange={handleChange} disabled={loading} />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, backgroundColor: '#1a552a' }} disabled={loading}>
              {loading ? (<CircularProgress size={24} />) : isEditing ? ('Update Invoice') : ('Create Invoice')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Button variant="outlined" onClick={fetchData} sx={{ mb: 2 }}>Refresh</Button>
        <DataTable rows={rows} columns={columns} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>
    </Box>
  );
}


