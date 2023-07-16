import { lazy } from 'react';


const Profile2App = lazy(() => import('./Profile2App'));

const profile2AppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/profile2',
      element: <Profile2App />,
    },
  ],
};

export default profile2AppConfig;