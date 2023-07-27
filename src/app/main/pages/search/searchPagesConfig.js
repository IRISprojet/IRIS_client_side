import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const ClassicSearchPage = lazy(() => import('./ClassicSearchPage'));
const ModernSearchPage = lazy(() => import('./ModernSearchPage'));

const searchPagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.onlyGuest ,
  routes: [
    {
      path: 'pages/search',
      children: [
        {
          path: '',
          element: <Navigate to="modern" />,
        },
        {
          path: 'modern',
          element: <ModernSearchPage />,
        },
        {
          path: 'classic',
          element: <ClassicSearchPage />,
        },
      ],
    },
  ],
};

export default searchPagesConfig;
