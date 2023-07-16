import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import CourseCategory from "./CourseCategory";

function CourseInfo({ course, className }) {
  if (!course) {
    return null;
  }
  return (
    <div className={clsx("w-full", className)}>
    <div className="flex items-center justify-center mb-16"> {/* Utilisez "justify-center" pour centrer horizontalement */}
    <img src="https://res.cloudinary.com/dbqzzf5xt/image/upload/v1683751395/344097291_2320612068119634_1870344413599346915_n_aooiim.png" style={{width:"60px",height:"60px"}} />
  </div>

      <Typography className="text-16 font-medium">{course.title}</Typography>

      <Typography className="text-13 mt-2 line-clamp-2" color="text.secondary">
        {course.description}
      </Typography>

      <Divider className="w-48 my-24 border-1" light />

      <Typography
        className="flex items-center space-x-6 text-13"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          heroicons-solid:clock
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">{`${course.duration} minutes`}</span>
      </Typography>
      <Typography
        className="flex items-center space-x-6 text-13 mt-8"
        color="text.secondary"
      >
        <FuseSvgIcon color="disabled" size={20}>
          heroicons-solid:academic-cap
        </FuseSvgIcon>
        <span className="whitespace-nowrap leading-none">
          {course.progress.completed === 1 && "Completed once"}
          {course.progress.completed === 2 && "Completed twice"}
          {course.progress.completed > 2 &&
            `Completed ${course.progress.completed} times`}
          {course.progress.completed <= 0 && "Never completed"}
        </span>
      </Typography>
    </div>
  );
}

export default CourseInfo;
