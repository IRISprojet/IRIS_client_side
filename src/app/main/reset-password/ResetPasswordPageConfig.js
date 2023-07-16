import authRoles from '../../auth/authRoles';
import ResetPasswordPage from './ResetPasswordPage';


const ResetPasswordPageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'reset-password/:RPWtoken',
      element: <ResetPasswordPage />,
    },
  ],
};

export default ResetPasswordPageConfig;






