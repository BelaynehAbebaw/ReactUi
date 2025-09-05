import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/Payment';
import { getAllTransactions } from '../Api/payment_Api';
 

export default function Dashboard() {
    const [countData, setCountData] = useState(0);

  const fetchData = async () => {
    try {
      const data = await getAllTransactions(); // fetch all transactions
      setCountData(data.length); // set the count
      console.log('Transaction count:', data.length);
    } catch (err) {
      console.error(err.message); // log error
    }
  };

  // Call fetchData when component mounts
  useEffect(() => {
    fetchData();
  }, []);


  
  return (
    <Box sx={{ flexGrow: 1 }}>


      <Grid container spacing={4}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <DashboardIcon fontSize="large" color="primary" />
            <Box>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="subtitle1">150</Typography>
            </Box>
          </Paper>
        </Grid>
           <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <DashboardIcon fontSize="large" color="primary" />
            <Box>
            <Typography variant="h6">No of user that perform  Payments</Typography>
              <Typography variant="subtitle1">{countData}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <PaymentIcon fontSize="large" color="success" />
            <Box>
              <Typography variant="h6">Total Payments</Typography>
              <Typography variant="subtitle1">$12,340</Typography>
            </Box>
          </Paper>
        </Grid>
         
        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <AccountBalanceIcon fontSize="large" color="warning" />
            <Box>
              <Typography variant="h6">Pending Invoices</Typography>
              <Typography variant="subtitle1">23</Typography>
            </Box>
          </Paper>
        </Grid>
            <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <PaymentIcon fontSize="large" color="success" />
            <Box>
              <Typography variant="h6">Total Payments</Typography>
              <Typography variant="subtitle1">$12,340</Typography>
            </Box>
               <Box>
    
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography>- Payment #123 completed</Typography>
          <Typography>- Invoice #456 pending</Typography>
          <Typography>- Refund #789 processed</Typography>
        </Paper>
      </Box>
    </Box>
  );

}