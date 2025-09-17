import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const AuthForm = ({ onSubmit, isLoading, error, showRegisterLink = false }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ email, password });
  };
const user={id:1,
  name:'belay'
}
var name=user.name
  return (
   
    <Card sx={{ width: 400, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          {showRegisterLink ? 'Login' : 'Register'}
         
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button>

          {error && <Typography color="error">{error}</Typography>}

          {showRegisterLink && (
            <Typography variant="body2">
              Don't have an account? <Link to="/register">Create Account</Link>
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
