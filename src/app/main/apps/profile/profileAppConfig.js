import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));
const ProductApp = lazy(() => import('../e-commerce/product/Product.js'));
const profileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/profile',
      element: <ProfileApp />,
    },
  ],
};

export default profileAppConfig;
