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
  const [selectedTab, setSelectedTab] = useState(0);
  const mainThemeDark = useSelector(selectMainThemeDark);

  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const user = useSelector(selectUser);
  const [selectedProject, setSelectedProject] = useState({
    id: "645b01cc16d7736f71d0d84e",
    menuEl: null,
    description: "t zgfgdfgfdgdfdfdfdfgfdgfdg",
    name: "omar",
    email: "teacher@gmail.com",
    budget: 260,
    ExecutivePhoto:
      "https://res.cloudinary.com/dmmvnp0ns/image/upload/v1683685820/ap99ikcpxbg1c20zfyo7.png",
  });
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  function handleChangeProject(projet) {
    setSelectedProject({
      id: projet.id,
      description: projet.description,
      ExecutivePhoto: projet.ExecutivePhoto,
      name: projet.name,
      email: projet.email,
      budget: projet.budget,
      menuEl: null,
    });
  }

  function handleOpenProjectMenu(event) {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: event.currentTarget,
    });
  }
  function handleCloseProjectMenu() {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: null,
    });
  }
  if (_.isEmpty(projects)) {
    return null;
  }
  return (
    <div>
      <div className="flex flex-col w-full px-24 sm:px-32">
        {/* <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
          <div className="flex flex-auto items-center min-w-0">
            <Avatar
              className="flex-0 w-64 h-64"
              alt="user photo"
              src={_.find(projects, ["id", selectedProject.id])?.photoURL}
            >
              {user?.data?.displayName[0]}
            </Avatar>
            <div className="flex flex-col min-w-0 mx-16">
              <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
                {`Welcome to explore, ${_.find(projects, ["id", selectedProject.id])?.name}!`}
              </Typography>
              <div className="flex items-center">
                <FuseSvgIcon size={20} color="action">
                  heroicons-solid:bell
                </FuseSvgIcon>
                <Typography className="mx-6 leading-6 truncate" color="text.secondary">
                  Explore the club!
                </Typography>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col shadow">
        <ThemeProvider theme={mainThemeDark}>
        <Box
          className="relative pt-32 pb-112 px-16 sm:pt-80 sm:pb-192 sm:px-64 overflow-hidden"
          sx={{
            backgroundColor: 'primary.dark',
            color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
          }}
        >
          <div className="flex flex-col items-center justify-center  mx-auto w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
              <Typography className="mt-4 text-32 sm:text-48 font-extrabold tracking-tight leading-tight text-center">
                WELCOME TO ESPRIT CLUBS
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography
                color="text.secondary"
                className="mt-12 sm:text-20 text-center tracking-tight"
              >
                Here you can find all the <h1>CLUBS</h1> 
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

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
                <Avatar
                  sx={{ borderColor: 'background.paper' }}
                  className="w-128 h-128 border-4"
                  src={_.find(projects, ["id", selectedProject.id])?.photoURL}
                  alt="User avatar"
                />
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography className="text-lg font-bold leading-none">{`Welcome to ${_.find(projects, ["id", selectedProject.id])?.name}`}</Typography>
              <Typography color="text.secondary"></Typography>
            </div>

            <div className="hidden lg:flex h-32 mx-32 border-l-2" />

        

       
          </div>
        </div>
        <div className="flex items-center">
          <Button
            onClick={handleOpenProjectMenu}
            className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
            variant="default"
            sx={{
              backgroundColor: (theme) => theme.palette.background.default,
              borderColor: (theme) => theme.palette.divider,
            }}
            endIcon={
              <FuseSvgIcon size={20} color="action">
                heroicons-solid:chevron-down
              </FuseSvgIcon>
            }
          >
            {_.find(projects, ["id", selectedProject.id])?.name}
          </Button>
          <Menu
            id="project-menu"
            anchorEl={selectedProject.menuEl}
            open={Boolean(selectedProject.menuEl)}
            onClose={handleCloseProjectMenu}
          >
            {projects &&
              projects.map((project) => (
                <MenuItem
                  key={project.id}
                  onClick={(ev) => {
                    handleChangeProject(project);
                  }}
                >
                  {project?.name}
                </MenuItem>
              ))}
          </Menu>
        </div>
      </div>
      <motion.div initial="hidden" animate="show" className="w-full">
        <div className="md:flex">
          <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
            <Card component={motion.div} className="w-full mb-32">
              <div className="px-32 pt-24">
                <Typography
                  variant="h4"
                  style={{ color: "#1A0D72", fontWeight: "bold" }}
                  gutterBottom
                >
                  General Information
                </Typography>
              </div>

              <CardContent className="px-32 py-24">
                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Name</Typography>
                  <Typography>{selectedProject?.name}</Typography>
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Email</Typography>
                  <Typography>{selectedProject?.email}</Typography>
                </div>

                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">Budget</Typography>

                  <div className="flex items-center">
                    <Typography>{selectedProject?.budget}</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card component={motion.div} className="w-full mb-32">
              <div className="px-32 pt-24">
                <Typography
                  variant="h4"
                  style={{ color: "#1A0D72", fontWeight: "bold" }}
                  gutterBottom
                >
                  About us
                </Typography>
              </div>

              <CardContent className="px-32 py-24">
                <div className="mb-24">
                  <Typography className="font-semibold mb-4 text-15">
                    {selectedProject?.description}
                  </Typography>
                </div>
              </CardContent>
            </Card>

            <Card component={motion.div} className="w-full mb-32">
              <Typography
                variant="h4"
                style={{ color: "#1A0D72", fontWeight: "bold" }}
                align="center"
                gutterBottom
              >
                {`${selectedProject?.name} , Student Branch Executive Committee! `}
              </Typography>
              <CardContent className="flex flex-wrap px-32 flex justify-center items-center">
                <img
                  className="w-1/2 h-auto object-contain"
                  src={selectedProject?.ExecutivePhoto}
                  alt="Executive"
                />
              </CardContent>
            </Card>
          </div>

          {/* <div className="flex flex-col md:w-320">
          <Card   className="w-full mb-32">
          
          <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
                {`${
                  selectedProject?.name
                } , Student Branch Executive Committee! `}
              </Typography>
            <CardContent className="flex flex-wrap px-32">

            <img
        className="w-full h-auto object-contain"
        src={selectedProject?.ExecutivePhoto}
        alt="Executive"
      />
              
              
            </CardContent>
          </Card>

         
        </div> */}
        </div>
      </motion.div>
    </div>
  );
}
export default ProjectDashboardAppHeader;
