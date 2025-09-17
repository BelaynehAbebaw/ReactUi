import Dashboard from './components/Dashboard.jsx';
import Payment from './components/payment.jsx';
import TransactionsList from './components/TransactionList.jsx';
import CreateTransaction from './components/CreateTransaction.jsx';
import Login from './components/Login.jsx';
import Register from './components/Rigster.jsx';

const appRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/payment', element: <Payment /> },
  { path: '/Transaction', element: <TransactionsList /> },
  { path: '/create', element: <CreateTransaction /> },
  {path:'/login',element:<Login/>},
  {path:'/rigister',element:<Register/>}

];
export default appRoutes;
