import VerifyAccountPage from "./VerifyAccountPage";
import authRoles from "../../auth/authRoles";

const VerifyAccountConfig = {
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
      path: "verify-account/:token",
      element: <VerifyAccountPage />,
    },
  ],
};

export default VerifyAccountConfig;
