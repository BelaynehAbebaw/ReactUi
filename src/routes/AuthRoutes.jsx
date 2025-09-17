import Login from '../features/auth/pages/Login.jsx';
import Register from '../features/auth/pages/Register.jsx';

const AuthRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

export default AuthRoutes;
