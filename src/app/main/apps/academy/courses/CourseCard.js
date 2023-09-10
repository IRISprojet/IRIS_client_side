import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { lighten } from "@mui/material/styles";
import CourseInfo from "../CourseInfo";
import CourseProgress from "../CourseProgress";
import { applyToInternship } from "../store/courseSlice";
import Snackbar from "@mui/material/Snackbar";

function CourseCard({ course }) {
  const dispatch = useDispatch();
  const [isApplied, setIsApplied] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleApplyClick = () => {
    if (!isApplied) {
      // If not already applied, make a POST request to the API
      axios
      .post(`http://localhost:8000/api/applied/${course.id}`, {}, {
        headers: {
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNhMTFlZTllMzJiMjhkMWYwMTkwNjYiLCJpYXQiOjE2OTQyMTU4OTAsImV4cCI6MTY5NjgwNzg5MH0.yRAB5_kPyXI3C8rGdwNXdU7qbLiTexFZaYqwIBMuRTI',
        }
      })
      .then((response) => {
        console.log('Response Status:', response.status);
        // Handle success
        if (response.status === 200) {
          // Dispatch the applyToInternship action or perform other actions
          dispatch(applyToInternship());
          // Update the state to indicate that the application was successful
          setIsApplied(true);
          // Show the notification
          setIsNotificationOpen(true);
          // Close the notification after 3 seconds
          setTimeout(() => {
            setIsNotificationOpen(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error applying to internship:', error);
      });
  
    
    
    
    
    }
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
        <Button
          component={Link}
          onClick={handleApplyClick}
          className="px-16 min-w-128"
          color="secondary"
          variant="contained"
          style={{ backgroundColor: "#00285b" }}
        >
          {isApplied ? "Applied To" : "Apply Now"}
        </Button>
      </CardActions>

      {/* Notification Snackbar */}
      <Snackbar
        open={isNotificationOpen}
        autoHideDuration={3000}
        onClose={() => setIsNotificationOpen(false)}
        message="Application successful!"
      />
    </Card>
  );
}

export default CourseCard;

