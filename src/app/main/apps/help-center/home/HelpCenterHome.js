import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { lighten, ThemeProvider } from '@mui/material/styles';
import { selectMainThemeDark } from 'app/store/fuse/settingsSlice';
import { OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect } from 'react';
import { getFaqsMost, selectFaqsMost } from '../store/faqsMostSlice';
import FaqList from '../faqs/FaqList';

function HelpCenterHome() {
  const mainThemeDark = useSelector(selectMainThemeDark);
  const dispatch = useDispatch();
  const faqsMost = useSelector(selectFaqsMost);

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
                WELCOME TO Iris team
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
                Here you can find all the information you need.
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

      <div className="flex flex-col items-center px-24 sm:px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-60 md:gap-y-0 md:md:gap-x-60 w-full max-w-sm md:max-w-4xl -mt-64 sm:-mt-96">
          <Card
            component={Link}
            to="/apps/forum"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
            style={{ width: "300px", height: "300px" }}
          >
            <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
              <div className="text-4xl font-extrabold">Event</div>
              <div className="md:max-w-160 mt-4" color="text.secondary">
                Stay informed with Iris event.
              </div>
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/calendar-3981416-3297354.png"
                alt="Ma superbe image"
                style={{ display: "block", margin: "0 auto", width: "100px", height: "100px" }}
              />
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
                  Consult Event
                </Typography>
                <FuseSvgIcon size={20} color="secondary">
                  heroicons-solid:arrow-narrow-right
                </FuseSvgIcon>
              </Box>
        

          </Card>

          <Card
            component={Link}
            to="/apps/academy/level"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
            style={{ width: "300px", height: "300px" }}

          >
            <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
              <div className="text-4xl font-extrabold">internship</div>

              <div className="md:max-w-160 mt-4" color="text.secondary">
                Discover with iris internship .
              </div>
              <img
                src="https://img.freepik.com/premium-vector/open-book-diary-with-white-paper-blank-pages-bookmark-3d-vector-icon-cartoon-minimal-style_365941-745.jpg"
                alt="Ma superbe image"
                style={{ display: "block", margin: "0 auto", width: "100px", height: "90px" }}
              />

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
                Check internship
              </Typography>
              <FuseSvgIcon size={20} color="secondary">
                heroicons-solid:arrow-narrow-right
              </FuseSvgIcon>
            </Box>
          </Card>

          <Card
            component={Link}
            to="/apps/notes"
            role="button"
            className="relative flex flex-col rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow ease-in-out duration-150"
            style={{ width: "300px", height: "300px" }}


          >
            <div className="flex flex-col flex-auto items-center justify-center p-32 text-center">
              <div className="text-4xl font-extrabold">Notes</div>
              <div className="md:max-w-160 mt-4" color="text.secondary">
                creat you notes to not forget.
              </div>
              <img
                src="https://media.istockphoto.com/id/1480640586/photo/check-mark-megaphone-3d-render-illustration-in-minimal-cartoon-style-isolated-on-white.jpg?s=612x612&w=0&k=20&c=acA6nedVdQlH8neJ1lzj71ZpFgdFVwqARCqQj7792dA="
                alt="Ma superbe image"
                style={{ display: "block", margin: "0 auto", width: "120px", height: "100px" }}
              />
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
                Explore notes
              </Typography>
              <FuseSvgIcon size={20} color="secondary">
                heroicons-solid:arrow-narrow-right
              </FuseSvgIcon>
            </Box>
          </Card>
        </div>
      </div>

      <Typography className="mt-96 px-16 text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-center">
        Most frequently asked questions
      </Typography>
      <Typography className="mt-8 px-16 text-xl text-center" color="text.secondary">
        Here are the most frequently asked questions you may check before getting started
      </Typography>

      <div className="flex flex-col w-full px-16 items-center my-48">
        <FaqList className="w-full max-w-4xl" list={faqsMost} />
      </div>
    </div>
  );
}

export default HelpCenterHome;
