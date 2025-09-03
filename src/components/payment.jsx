import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  CreditCard, 
  AccountBalance,
  Payment 
} from '@mui/icons-material';
import { createTransaction } from '../Api/payment_Api'; // Adjust the path as needed

function payment() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    AccountNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    accountNumber: '',
    routingNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (showCardDetails) {
      if (!formData.AccountNumber) tempErrors.AccountNumber = 'Account Number is required';
      else if (!/^\d{16}$/.test(formData.AccountNumber.replace(/\s/g, ''))) 
        tempErrors.AccountNumber = 'Account Number must be 16 digits';
      
      if (!formData.expiryDate) tempErrors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) 
        tempErrors.expiryDate = 'Format must be MM/YY';
      
      if (!formData.cvv) tempErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) 
        tempErrors.cvv = 'CVV must be 3 or 4 digits';
    } else {
      if (!formData.accountNumber) tempErrors.accountNumber = 'Account number is required';
      if (!formData.routingNumber) tempErrors.routingNumber = 'Routing number is required';
    }
    if (!formData.amount) tempErrors.amount = 'Amount is required';
    else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) 
      tempErrors.amount = 'Amount must be a positive number';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setApiError('');
    
    try {
      // Prepare the data for API
      const transactionData = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        amount: parseFloat(formData.amount),
        paymentMethod: showCardDetails ='BankTransfer',
        // Add payment method specific details
        ...(showCardDetails ? {
          AccountNumber: formData.AccountNumber.replace(/\s/g, ''),
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        } : {
          accountNumber: formData.accountNumber,
          routingNumber: formData.routingNumber
        })
      };
      
      // Call the API
      const response = await createTransaction(transactionData);
      if(response.sucess){
      console.log('Transaction created:', response.data);
      setSubmitted(true);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      setApiError(error.response?.data?.message || 'Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatAccountNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleAccountNumberChange = (e) => {
    const formattedValue = formatAccountNumber(e.target.value);
    setFormData({ ...formData, AccountNumber: formattedValue });
  };

  return (
    <Box sx={{ 
      maxWidth: 800, 
      padding: 3,
      backgroundColor: 'white',
      borderRadius: 2,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        <Payment sx={{ fontSize: 40, verticalAlign: 'bottom', mr: 1 }} />
        Payment Form
      </Typography>
      
      <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
        Secure payment processing with industry-standard encryption
      </Typography>
      
      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Payment processed successfully! Thank you for your transaction.
        </Alert>
      )}
      
      {apiError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {apiError}
        </Alert>
      )}
      
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        
            <Button
              variant={!showCardDetails ? "contained" : "outlined"}
              startIcon={<AccountBalance />}
              onClick={() => setShowCardDetails(false)}
              fullWidth
              disabled={loading}
            >
              Bank Transfer
            </Button>
          </Box>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  required
                  disabled={loading}
                />
              </Grid>
              
            
              
              {showCardDetails ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      name="AccountNumber"
                      value={formData.AccountNumber}
                      onChange={handleAccountNumberChange}
                      error={!!errors.AccountNumber}
                      helperText={errors.AccountNumber}
                      inputProps={{ maxLength: 19 }}
                      required
                      disabled={loading}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate}
                      placeholder="MM/YY"
                      inputProps={{ maxLength: 5 }}
                      required
                      disabled={loading}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.cvv}
                      onChange={handleChange}
                      error={!!errors.cvv}
                      helperText={errors.cvv}
                      inputProps={{ maxLength: 4 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              disabled={loading}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      required
                      disabled={loading}
                    />
                  </Grid>
                </>
              ) : (
                <>
                    <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bank Name"
                      name="BankName"
                      value={formData.BankName}
                      onChange={handleChange}
                      error={!!errors.BankName}
                      helperText={errors.accountNumber}
                      required
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      error={!!errors.accountNumber}
                      helperText={errors.accountNumber}
                      required
                      disabled={loading}
                    />
                  </Grid>
                  
                      <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  error={!!errors.amount}
                  helperText={errors.amount}
               
                  required
                  disabled={loading}
                />
              </Grid>
                </>
              )}
            </Grid>
            
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Process Payment'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Your payment details are securely encrypted
        </Typography>
      </Box>
    </Box>
  );
}

export default payment;