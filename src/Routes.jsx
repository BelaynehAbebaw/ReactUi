

import TransactionsList from './features/transactions/TransactionList.jsx';
import CreateTransaction from './features/transactions/CreateTransaction.jsx';
import Invoice from './features/invoices/Invoice.jsx';
import Refund from './features/refunds/Refund.jsx';
import SLA from './features/sla/SLA.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';
import Payment from './features/payments/Payment.jsx';

const appRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/payments', element: <Payment /> },
  { path: '/Transaction', element: <TransactionsList /> },
  { path: '/create', element: <CreateTransaction /> },
  { path: '/invoices', element: <Invoice /> },
  { path: '/refunds', element: <Refund /> },
  { path: '/SLA', element: <SLA /> },

];
export default appRoutes;
