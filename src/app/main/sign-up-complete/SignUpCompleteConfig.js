import SignUpCompletePage from "./SignUpCompletePage";
import authRoles from "../../auth/authRoles";

const SignUpCompleteConfig = {
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
      path: "sign-up/complete/:token",
      element: <SignUpCompletePage />,
    },
  ],
};

export default SignUpCompleteConfig;
