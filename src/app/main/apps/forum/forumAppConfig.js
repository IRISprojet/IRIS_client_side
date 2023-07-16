import { lazy } from 'react';

const ForumApp = lazy(() => import('./forumApp'));

const forumAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/forum',
      element: <ForumApp />,
    },
  ],
};

export default forumAppConfig;
