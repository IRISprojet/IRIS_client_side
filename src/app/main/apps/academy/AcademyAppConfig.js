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
          element: <Navigate to="/apps/academy/level" />,
        },
         {
           path: "courses/:courseId/*",
           element: <Course />,
         },
        {
          path: "courses/:level",
          element: <Courses />,
        },
        {
          path: "level",
          element: <Course_level />,
        },
      ],
    },
  ],
};

export default AcademyAppConfig;
