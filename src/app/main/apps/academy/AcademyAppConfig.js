import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AcademyApp from "./AcademyApp";

const Course = lazy(() => import("./course/Course"));
const Courses = lazy(() => import("./courses/Courses"));
const Course_level = lazy(() => import("./Course_level/Course_level"));

const AcademyAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/academy",
      element: <AcademyApp />,
      children: [
        {
          path: "",
          element: <Navigate to="/apps/academy/type" />,
        },
         {
           path: "courses/:courseId/*",
           element: <Course />,
         },
        {
          path: "internship/:type",
          element: <Courses />,
        },
        {
          path: "type",
          element: <Course_level />,
        },
      ],
    },
  ],
};

export default AcademyAppConfig;
