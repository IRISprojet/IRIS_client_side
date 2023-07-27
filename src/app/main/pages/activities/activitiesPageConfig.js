import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const ActivitiesPage = lazy(() => import('./ActivitiesPage'));

const activitiesPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },

  routes: [
    {
      path: 'pages/activities',
      element: <ActivitiesPage />,
    },
  ],
};

export default activitiesPageConfig;
