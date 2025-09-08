import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Paper,
  Typography,
  Alert
} from "@mui/material";

// Mock accounts data - in real app, this would come from API
const mockAccounts = [
  { id: 1, userId: 1, accountType: "CHECKING", balance: 1500.00, currency: "USD" },
  { id: 2, userId: 1, accountType: "SAVINGS", balance: 5000.00, currency: "USD" },
  { id: 3, userId: 2, accountType: "CHECKING", balance: 2500.00, currency: "EUR" },
  { id: 4, userId: 2, accountType: "INVESTMENT", balance: 10000.00, currency: "EUR" }
];

function CreateTransaction() {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState(mockAccounts);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Filter accounts based on selection to prevent self-transfer
  const availableToAccounts = accounts.filter(account => 
    account.id !== parseInt(fromAccountId)
  );

  const availableFromAccounts = accounts.filter(account =>
    account.id !== parseInt(toAccountId)
  );

  const getAccountDetails = (accountId) => {
    return accounts.find(account => account.id === parseInt(accountId));
  };

  const validateForm = () => {
    if (!fromAccountId || !toAccountId || !amount) {
      setError("All fields are required");
      return false;
    }

    if (fromAccountId === toAccountId) {
      setError("Cannot transfer to the same account");
      return false;
    }

    const fromAccount = getAccountDetails(fromAccountId);
    const amountNum = parseFloat(amount);

    if (amountNum <= 0) {
      setError("Amount must be greater than 0");
      return false;
    }

    if (fromAccount && amountNum > fromAccount.balance) {
      setError(`Insufficient balance. Available: ${fromAccount.balance} ${fromAccount.currency}`);
      return false;
    }

    const toAccount = getAccountDetails(toAccountId);
    if (fromAccount && toAccount && fromAccount.currency !== toAccount.currency) {
      setError("Currency mismatch between accounts");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const transactionData = {
      fromAccountId: parseInt(fromAccountId),
      toAccountId: parseInt(toAccountId),
      amount: parseFloat(amount),
      currency: getAccountDetails(fromAccountId)?.currency,
      timestamp: new Date().toISOString()
    };

    console.log("Transaction data:", transactionData);
    
    // Here you would typically make an API call
    setSuccess("Transaction created successfully!");
    
    // Reset form
    setFromAccountId("");
    setToAccountId("");
    setAmount("");
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(""), 3000);
  };

  const formatAccountOption = (account) => {
    return `${account.accountType} - ${account.balance} ${account.currency} (ID: ${account.id})`;
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Create Transaction
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>From Account</InputLabel>
              <Select
                value={fromAccountId}
                label="From Account"
                onChange={(e) => setFromAccountId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select account</em>
                </MenuItem>
                {availableFromAccounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {formatAccountOption(account)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>To Account</InputLabel>
              <Select
                value={toAccountId}
                label="To Account"
                onChange={(e) => setToAccountId(e.target.value)}
                disabled={!fromAccountId}
              >
                <MenuItem value="">
                  <em>Select account</em>
                </MenuItem>
                {availableToAccounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {formatAccountOption(account)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <TextField
                type="number"
                label="Amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                inputProps={{ 
                  min: 0.01,
                  step: 0.01,
                  max: getAccountDetails(fromAccountId)?.balance || undefined
                }}
                placeholder="Enter amount"
                disabled={!fromAccountId || !toAccountId}
              />
            </FormControl>
            
            {fromAccountId && (
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Available balance: {getAccountDetails(fromAccountId)?.balance} {getAccountDetails(fromAccountId)?.currency}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              disabled={!fromAccountId || !toAccountId || !amount}
            >
              Create Transaction
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default CreateTransaction;