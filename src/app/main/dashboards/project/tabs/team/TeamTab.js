import { motion } from 'framer-motion';
import TeamMembersWidget from './widgets/TeamMembersWidget';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { lighten } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Avatar from '@mui/material/Avatar';


function TeamTab() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses when the component mounts
    axios.get('http://localhost:8000/api/Internship/', {
      headers: {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNhMTFlZTllMzJiMjhkMWYwMTkwNjYiLCJpYXQiOjE2OTQyMTU4OTAsImV4cCI6MTY5NjgwNzg5MH0.yRAB5_kPyXI3C8rGdwNXdU7qbLiTexFZaYqwIBMuRTI',
      }
    })
    .then((response) => {
      console.log('API Response:', response.data);
      setCourses(response.data);
    })
    .catch((error) => {
      console.error('Error fetching courses:', error);
    });
  }, []);
 

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    
      <div>
<CardActions
  className="items-center justify-end py-16 px-24"
  sx={{
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? lighten(theme.palette.background.default, 0.4)
        : lighten(theme.palette.background.default, 0.03),
  }}
>
  {courses.map((course) => (
    <Card
      key={course.id}
      className="mb-16"
      style={{ width: '300px', height: '400px' }} // Set your desired width and height
    >
      <CardContent className="p-24">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h5" component="div">
            {course.title}
          </Typography>
          <Avatar
            alt="user photo"
            src='https://res.cloudinary.com/dhufakahz/image/upload/v1694357223/avatar_tzul1p.jpg'
          />
        </div>
        <Typography variant="body2" color="text.secondary" paragraph>
          {`-description :${course.description}`}
        </Typography>
        <div className="flex items-center">
          <FuseSvgIcon size={20} color="action">
            heroicons-solid:bell
          </FuseSvgIcon>
          <Typography variant="body2" color="text.secondary">
            {`-Type: ${course.type}`}
          </Typography>
        </div>
      </CardContent>
    </Card>
  ))}
</CardActions>




    
        
      
      <div>
      
        <video
          controls
          autoPlay  
          muted
          
      
          width="100%"
          src="https://res.cloudinary.com/dhufakahz/video/upload/v1693815975/video/utooirkedevo7bupowdo.mp4"
         
        >
          Your browser does not support the video tag.
        </video>
        </div>
        </div>
    );
    
 
}

export default TeamTab;
