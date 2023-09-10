import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import CourseInfo from "../CourseInfo";
import CourseProgress from "../CourseProgress";
import React, { useState } from "react";
import { applyToInternship } from "../store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
function CourseCard({ course }) {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const dispatch = useDispatch();
  const courses = useSelector(applyToInternship);

  const handleApplyClick = () => {
    // Dispatch the applyToInternship action here
    dispatch(applyToInternship());
  };

  const showMessage = () => {
    setIsMessageVisible(true);

    // Hide the message after 5 seconds
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 5000);
  };

  return (
    <Card className="flex flex-col h-384 shadow">
      <CardContent className="flex flex-col flex-auto p-24">
        <CourseInfo course={course} className="" />
      </CardContent>
      <CourseProgress className="" course={course} />
      <CardActions
        className="items-center justify-end py-16 px-24"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.03),
        }}
      >
        {isMessageVisible && (
          <div className="messageContainer" style={{ color: "green" }}>
            You are applying to this internship successfully.
          </div>
        )}
        <Button
          to="/apps/academy/type"
          component={Link}
          onClick={handleApplyClick}
          className="px-16 min-w-128"
          color="secondary"
          variant="contained"
          style={{ backgroundColor: "#00285b" }}
        ></Button>
      </CardActions>
    </Card>
  );
}

export default CourseCard;
