import { lazy } from 'react';

const MySecurityApp = lazy(() => import('./mySecurityApp'));

const mySecurityAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/mySecurity',
      element: <MySecurityApp />,
    },
  ],
};

export default mySecurityAppConfig;
