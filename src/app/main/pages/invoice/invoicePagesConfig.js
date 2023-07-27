import { Navigate } from 'react-router-dom';
import CompactInvoicePage from './printable/CompactInvoicePage';
import ModernInvoicePage from './printable/ModernInvoicePage';
import { authRoles } from 'src/app/auth';

const invoicePagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/invoice/printable',
      children: [
        {
          path: '',
          element: <Navigate to="compact" />,
        },
        {
          path: 'compact',
          element: <CompactInvoicePage />,
        },
        {
          path: 'modern',
          element: <ModernInvoicePage />,
        },
      ],
    },
  ],
};

export default invoicePagesConfig;
