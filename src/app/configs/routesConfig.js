import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import userInterfaceConfigs from "../main/user-interface/UserInterfaceConfigs";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import dashboardsConfigs from "../main/dashboards/dashboardsConfigs";
import appsConfigs from "../main/apps/appsConfigs";
import pagesConfigs from "../main/pages/pagesConfigs";
import authRoleExamplesConfigs from "../main/auth/authRoleExamplesConfigs";
import SignUpCompleteConfig from "../main/sign-up-complete/SignUpCompleteConfig";
import VerifyAccountConfig from "../main/verify-account/VerifyAccountConfig";
import ResetPasswordPageConfig from "../main/reset-password/ResetPasswordPageConfig";
import UpdatePost  from "../main/apps/forum/components/updatePost";

const routeConfigs = [
  ...appsConfigs,
  ...dashboardsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  ...userInterfaceConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  SignUpCompleteConfig,
  VerifyAccountConfig,
  ResetPasswordPageConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="apps/academy/level" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "*",
    element: <Navigate to="pages/error/404" />,
  },
 
];

export default routes;