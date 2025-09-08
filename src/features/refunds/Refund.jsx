import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DataTable from '../../shared/ui/DataTable';
import { createRefund, getAllRefunds, updateRefund, deleteRefund } from '../../Api/refund_Api';

export default function Refund() {
  const [formData, setFormData] = useState({
    RefundId: 0,
    TransactionId: '',
    Reason: '',
    Amount: '',
    Status: 'Requested'
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'transactionId', headerName: 'Transaction', width: 140 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllRefunds();
      const mapped = data.map((item, index) => ({ id: item.id ?? item.refundId ?? index, ...item }));
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
      RefundId: row.id,
      TransactionId: row.transactionId,
      Reason: row.reason,
      Amount: row.amount,
      Status: row.status
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, Amount: parseFloat(formData.Amount) };
    const res = isEditing ? await updateRefund(payload) : await createRefund(payload);
    if (res) {
      setIsEditing(false);
      setFormData({ RefundId: 0, TransactionId: '', Reason: '', Amount: '', Status: 'Requested' });
      await fetchData();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this refund?')) return;
    await deleteRefund(id);
    setRows(prev => prev.filter(r => r.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        <AssignmentReturnIcon sx={{ fontSize: 40, verticalAlign: 'bottom', mr: 1 }} /> Refunds
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Transaction ID" name="TransactionId" value={formData.TransactionId} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Amount" name="Amount" type="number" value={formData.Amount} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Reason" name="Reason" value={formData.Reason} onChange={handleChange} required disabled={loading} />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, backgroundColor: '#1a552a' }} disabled={loading}>
              {loading ? (<CircularProgress size={24} />) : isEditing ? ('Update Refund') : ('Request Refund')}
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


