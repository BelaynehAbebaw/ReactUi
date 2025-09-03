import Dashboard from './components/Dashboard.jsx';
import Payment from './components/payment.jsx';
import TransactionsList from './components/TransactionList.jsx';
import CreateTransaction from './components/CreateTransaction.jsx';

const appRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/payments', element: <Payment /> },
  { path: '/Transaction', element: <TransactionsList /> },
  { path: '/create', element: <CreateTransaction /> },

];
export default appRoutes;
