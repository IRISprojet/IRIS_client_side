import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { lighten, ThemeProvider } from '@mui/material/styles';
import { selectMainThemeDark } from 'app/store/fuse/settingsSlice';
//import { OutlinedInput } from '@mui/material';
import Card from '@mui/material/Card';
import { Link, useLocation } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect } from 'react';
import { getFaqsMost, selectFaqsMost } from '../store/faqsMostSlice';

function Course_level() {

  const mainThemeDark = useSelector(selectMainThemeDark);
  const dispatch = useDispatch();
  const faqsMost = useSelector(selectFaqsMost);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");

  useEffect(() => {
    dispatch(getFaqsMost());
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-auto min-w-0">
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
               ACADEMIC LEVELS
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
                Here you can find all the resources you need throughout your studies at Esprit.
              </Typography>
            </motion.div>
            {/* <OutlinedInput
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex flex-1 items-center px-16 mx-8 rounded-full h-44 w-full max-w-320 sm:max-w-480 mt-40 sm:mt-80"
              placeholder="Enter a question, topic or keyword"
              variant="outlined"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
                </InputAdornment>
              }
              inputProps={{
                'aria-label': 'Search',
              }}
            /> */}
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

      <div className="flex flex-col items-center sm:px-40">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-60 gap-x-8 sm:gap-x-4 sm:gap-y-4 w-full max-w-sm md:max-w-4xl -mt-64 sm:-mt-96">
          <Card
            component={Link}
            to="/apps/academy/courses/1"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150 mx-4"

            style={{ width: "300px", height: "300px",marginLeft: "-30%"}}
            
          >
                <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
             
             <img src="https://res.cloudinary.com/dbqzzf5xt/image/upload/v1683738333/345066841_732538565227284_5118005753146312244_n_i6iv8y.png" style={{width:"80px",height:"70px"}} />
             <div style={{marginTop:"5%"}}></div>
 
              <div className="text-3xl font-extrabold">first year</div>
              
            </div>
            
              <Box
                className="flex items-center justify-center py-16 px-32"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
              >
                <Typography color="secondary" className="mx-8">
                  Consult first year courses
                </Typography>
                <FuseSvgIcon size={20} color="secondary">
                  heroicons-solid:arrow-narrow-right
                </FuseSvgIcon>
              </Box>
           
            
        

          </Card>
       
          <Card
            component={Link}
            to="/apps/academy/courses/2"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150 mx-4"
            style={{ width: "300px", height: "300px" }}
          >
                   
          <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
             
             <img src="https://res.cloudinary.com/dbqzzf5xt/image/upload/v1683738333/343381914_223520516984921_5431106241961317105_n_vmq24j.png" style={{width:"80px",height:"70px"}} />
             <div style={{marginTop:"5%"}}></div>
 
              <div className="text-3xl font-extrabold">second year</div>
              
            </div>
            
              <Box
                className="flex items-center justify-center py-16 px-32"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
              >
                <Typography color="secondary" className="mx-8">
                  Consult first year courses
                </Typography>
                <FuseSvgIcon size={20} color="secondary">
                  heroicons-solid:arrow-narrow-right
                </FuseSvgIcon>
              </Box>
           
        

          </Card>
          <Card
            component={Link}
            to="/apps/academy/courses/3"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150 mx-4"
            style={{ width: "300px", height: "300px",marginLeft: "30%" }}
          >
          
            
              
          <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
             
             <img src="https://res.cloudinary.com/dbqzzf5xt/image/upload/v1683738333/343772260_6299612550059223_2759246906896416124_n_vqvl87.png" style={{width:"80px",height:"70px"}} />
             <div style={{marginTop:"5%"}}></div>
 
              <div className="text-3xl font-extrabold">third year</div>
              
            </div>
            
              <Box
                className="flex items-center justify-center py-16 px-32"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
              >
                <Typography color="secondary" className="mx-8">
                  Consult first year courses
                </Typography>
                <FuseSvgIcon size={20} color="secondary">
                  heroicons-solid:arrow-narrow-right
                </FuseSvgIcon>
              </Box>

          </Card>

          <Card
            component={Link}
            to="/apps/academy/courses/4"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150 mx-4"
            style={{ width: "300px", height: "300px",marginLeft: "-30%",marginTop: "30%",  }}

          >
               <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
             
             <img src="https://res.cloudinary.com/dbqzzf5xt/image/upload/v1683738333/343284242_473399214949094_8222129045991604768_n_lc9rl2.png" style={{width:"70px",height:"70px"}} />
             <div style={{marginTop:"5%"}}></div>
 
              <div className="text-3xl font-extrabold">fourth year</div>
              
            </div>
            
              <Box
                className="flex items-center justify-center py-16 px-32"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
              >
                <Typography color="secondary" className="mx-8">
                  Consult first year courses
                </Typography>
                <FuseSvgIcon size={20} color="secondary">
                  heroicons-solid:arrow-narrow-right
                </FuseSvgIcon>
              </Box>
          </Card>
         

          <Card
            component={Link}
            to="/apps/academy/courses/5"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150 mx-100"
            style={{ width: "300px", height: "300px",marginTop: "30%", }}


          >
            <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
             
            <img src="https://res.cloudinary.com/dbqzzf5xt/image/upload/v1683738650/343753435_1062254551828353_5086198370804891898_n_yrwmap.png" style={{width:"80px",height:"70px"}} />
            <div style={{marginTop:"5%"}}></div>

             <div className="text-3xl font-extrabold">fifth year</div>
             
           </div>
           
             <Box
               className="flex items-center justify-center py-16 px-32"
               sx={{
                 backgroundColor: (theme) =>
                   theme.palette.mode === 'light'
                     ? lighten(theme.palette.background.default, 0.4)
                     : lighten(theme.palette.background.default, 0.02),
               }}
             >
               <Typography color="secondary" className="mx-8">
                 Consult first year courses
               </Typography>
               <FuseSvgIcon size={20} color="secondary">
                 heroicons-solid:arrow-narrow-right
               </FuseSvgIcon>
             </Box>
          
          </Card>

        </div>
      </div>

     
    </div>
  );
}

export default Course_level;
