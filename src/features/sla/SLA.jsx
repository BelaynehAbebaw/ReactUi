import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DataTable from '../../shared/ui/DataTable';
import { createSla, getAllSlas, updateSla, deleteSla } from '../../Api/sla_Api';

export default function SLA() {
  const [formData, setFormData] = useState({
    SlaId: 0,
    ServiceName: '',
    ResponseTimeMs: '',
    ResolutionTimeMs: '',
    Status: 'Active'
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'serviceName', headerName: 'Service', width: 160 },
    { field: 'responseTimeMs', headerName: 'Response (ms)', width: 140 },
    { field: 'resolutionTimeMs', headerName: 'Resolution (ms)', width: 160 },
    { field: 'status', headerName: 'Status', width: 120 }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllSlas();
      const mapped = data.map((item, index) => ({ id: item.id ?? item.slaId ?? index, ...item }));
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
      SlaId: row.id,
      ServiceName: row.serviceName,
      ResponseTimeMs: row.responseTimeMs,
      ResolutionTimeMs: row.resolutionTimeMs,
      Status: row.status
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { 
      ...formData, 
      ResponseTimeMs: parseInt(formData.ResponseTimeMs, 10),
      ResolutionTimeMs: parseInt(formData.ResolutionTimeMs, 10)
    };
    const res = isEditing ? await updateSla(payload) : await createSla(payload);
    if (res) {
      setIsEditing(false);
      setFormData({ SlaId: 0, ServiceName: '', ResponseTimeMs: '', ResolutionTimeMs: '', Status: 'Active' });
      await fetchData();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this SLA?')) return;
    await deleteSla(id);
    setRows(prev => prev.filter(r => r.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        <AssessmentIcon sx={{ fontSize: 40, verticalAlign: 'bottom', mr: 1 }} /> SLA Management
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Service Name" name="ServiceName" value={formData.ServiceName} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Response Time (ms)" name="ResponseTimeMs" type="number" value={formData.ResponseTimeMs} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Resolution Time (ms)" name="ResolutionTimeMs" type="number" value={formData.ResolutionTimeMs} onChange={handleChange} required disabled={loading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Status" name="Status" value={formData.Status} onChange={handleChange} disabled={loading} />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, backgroundColor: '#1a552a' }} disabled={loading}>
              {loading ? (<CircularProgress size={24} />) : isEditing ? ('Update SLA') : ('Create SLA')}
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


