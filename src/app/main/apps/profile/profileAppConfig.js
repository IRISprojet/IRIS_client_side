import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const ProfileApp = lazy(() => import('./ProfileApp'));
const ProductApp = lazy(() => import('../e-commerce/product/Product.js'));
const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth : authRoles.admin ,
  routes: [
    {
      path: 'apps/profile',
      element: <ProfileApp />,
    },
  ],
};

export default profileAppConfig;
