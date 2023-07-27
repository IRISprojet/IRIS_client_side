import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { selectUser } from "app/store/userSlice";
import { getProjects, selectProjects } from "./store/projectsSlice";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { motion } from "framer-motion";
import Tabs from '@mui/material/Tabs';
import { lighten, ThemeProvider } from '@mui/material/styles';


import { selectMainThemeDark } from 'app/store/fuse/settingsSlice';
import { Box } from "@mui/system";





function ProjectDashboardAppHeader(props) {
  const mainThemeDark = useSelector(selectMainThemeDark);

  // const [selectedTab, setSelectedTab] = useState(0);
  // const mainThemeDark = useSelector(selectMainThemeDark);

  // const dispatch = useDispatch();
  // const projects = useSelector(selectProjects);
  // const user = useSelector(selectUser);
  // const [selectedProject, setSelectedProject] = useState({
  //   id: "645b01cc16d7736f71d0d84e",
  //   menuEl: null,
  //   description: "t zgfgdfgfdgdfdfdfdfgfdgfdg",
  //   name: "omar",
  //   email: "teacher@gmail.com",
  //   budget: 260,
  //   ExecutivePhoto:
  //     "https://res.cloudinary.com/dmmvnp0ns/image/upload/v1683685820/ap99ikcpxbg1c20zfyo7.png",
  // });
  // useEffect(() => {
  //   dispatch(getProjects());
  // }, [dispatch]);
  // function handleChangeProject(projet) {
  //   setSelectedProject({
  //     id: projet.id,
  //     description: projet.description,
  //     ExecutivePhoto: projet.ExecutivePhoto,
  //     name: projet.name,
  //     email: projet.email,
  //     budget: projet.budget,
  //     menuEl: null,
  //   });
  //}

  // function handleOpenProjectMenu(event) {
  //   setSelectedProject({
  //     id: selectedProject.id,
  //     menuEl: event.currentTarget,
  //   });
  // }
  // function handleCloseProjectMenu() {
  //   setSelectedProject({
  //     id: selectedProject.id,
  //     menuEl: null,
  //   });
  // }
  // if (_.isEmpty(projects)) {
  //   return null;
  // }
  return (
    
    <div className="flex flex-col flex-auto min-w-0" >
      <ThemeProvider theme={mainThemeDark}>
    <Box
      className="relative pt-32 pb-112 px-16 sm:pt-80 sm:pb-192 sm:px-64 overflow-hidden"
      sx={{
        backgroundColor: "#8B0001",
        color: (theme) =>
          theme.palette.getContrastText(theme.palette.primary.main),
      }}
    >
      <div className="flex flex-col items-center justify-center  mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0 } }}
        >
          <Typography
className="mt-4 text-32 sm:text-48 font-extrabold tracking-tight leading-tight text-center animate-rounde"
style={{ whiteSpace: 'pre-line', color: 'white' }}
>
my internships
</Typography>
        </motion.div>
      
      </div>

      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          className="text-gray-700 opacity-25"
          fill="none"
          stroke="currentColor"
          strokeWidth="100"
        >
          <circle r="234" cx="196" cy="23" />
          <circle r="234" cx="790" cy="491" />
        </g>
      </svg>
    </Box>
  </ThemeProvider>
 
 
  <div class="py-16 bg-dark-200">
  <div class="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
    <div class="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">
      <div class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
        <div class="mb-12 space-y-4">
          <h3 class="text-2xl font-semibold text-purple-900">summer internship </h3>
          <p class="mb-6">i propose summer internship for 2 months full stack js.</p>
          <a href="#" class="block font-medium text-purple-600">Know more</a>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dhufakahz/image/upload/v1690422739/full-stack-javascript-developer_a0e0kg.jpg" class="w-2/3 ml-auto -mb-12" alt="illustration" loading="lazy" width="900" height="600"/>
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
        <div class="mb-12 space-y-4">
          <h3 class="text-2xl font-semibold text-purple-900">summer internship</h3>
          <p class="mb-6">i propose summer internship for 2 months native php .</p>
          <a href="#" class="block font-medium text-purple-600">Know more</a>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dhufakahz/image/upload/v1690422864/phpcmsnew_rqy7do.jpg" class="w-2/3 ml-auto" alt="illustration" loading="lazy" width="900" height="600"/>
        </div>
      </div>
      <div class="bg-white rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8">
        <div class="mb-12 space-y-4">
          <h3 class="text-2xl font-semibold text-purple-900">pfe internship</h3>
          <p class="mb-6">i propose PFE internship for 6 months spring/angular.</p>
          <a href="#" class="block font-medium text-purple-600">Know more</a>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dhufakahz/image/upload/v1690422950/download_hkvbit.png" class="w-2/3 ml-auto" alt="illustration" loading="lazy" width="900" height="600"/>
        </div>
      </div>
    </div>
  </div>
</div>

   
    

</div>
  );
  }
export default ProjectDashboardAppHeader;
