import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { lighten, ThemeProvider } from "@mui/material/styles";
import { selectMainThemeDark } from "app/store/fuse/settingsSlice";
import { OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useEffect } from "react";
import { getFaqsMost, selectFaqsMost } from "../store/faqsMostSlice";
import FaqList from "../faqs/FaqList";

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
  className="mt-4 text-32 sm:text-48 font-extrabold tracking-tight leading-tight text-center animate-pulse"
  style={{ whiteSpace: 'pre-line', color: 'white' }}
>
  WELCOME TO Iris
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
                Here you can find all the resources you need throughout your
                internship at Esprit.
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

        
<section class="py-48 bg-white flex flex-col justify-center">
    <div class="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
      <div class="-mt-20 flex justify-end">
        <img class="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden" src="https://res.cloudinary.com/dhufakahz/image/upload/v1690394062/IgCI_pnnv4v.gif" />
      </div>
      <div class="flex justify-start">
        <img class="rounded-lg object-cover overflow-hidden" src="https://res.cloudinary.com/dhufakahz/image/upload/v1690394415/dreamstime_xl_79091934-1024x636_xap0gh.jpg" />
      </div>
      <div class="-mt-64 flex justify-start">
        <img class="rounded-lg object-cover overflow-hidden" src="https://res.cloudinary.com/dhufakahz/image/upload/v1690394462/medium_React_18_New_features_a9ebb05f34_ka7krx.jpg" />
      </div>
      <div class="flex justify-start -mr-28 ml-28">
        <img class="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden" src="https://res.cloudinary.com/dhufakahz/image/upload/v1690394526/Why-AngularJS-A1_xuoz0r.jpg" />
      </div>
      <div class="-translate-y-96 transform ml-28 -mr-28 p-16 shadow-xl rounded-xl overflow-hidden bg-white">
        <div class="space-y-4">
          <p class="text-5xl font-bold text-black tracking-tight">
            In unprecedented times, health and safety remain the priority.
          </p>
          <p class="text-xl text-black">
            From the moment the threat of COVID‑19 emerged, Apple took action. Working closely with medical experts and our suppliers, we put the health and safety of the people in our supply chain first. We implemented standard measures like
            personal protective equipment, deep‑cleaning protocols and health screenings. But we went much further, re‑imagining entire factory layouts and processes to ensure that people could practise proper social distancing. We continue to
            support our suppliers around the world and have shared our best practices and lessons learned with partners across the industry.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-6 border-t border-b border-gray-200 my-12 py-8">
          <div>
            <p class="text-4xl font-bold text-black">
              2M+
            </p>
            <p class="text-sm text-black">
              people in the Apple supply chain covered by our health and safety standards in 2020
            </p>
          </div>
          <div>
            <p class="text-4xl font-bold text-black">
              170+
            </p>
            <p class="text-sm text-black">
              member companies of the Responsible Business Alliance given access to our COVID response tools
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>




<div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
  <div>
    <a title="Buy me a pizza" href="https://www.buymeacoffee.com/Dekartmc" target="_blank" class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
      <img class="object-cover object-center w-full h-full rounded-full" src="https://img.icons8.com/emoji/48/000000/pizza-emoji.png"/>
    </a>
  </div>
</div>
  
      

      <Typography className="mt-96 px-16 text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-center">
        Most frequently asked questions
      </Typography>
      <Typography
        className="mt-8 px-16 text-xl text-center"
        color="text.secondary"
      >
        Here are the most frequently asked questions you may check before
        getting started
      </Typography>

      <div className="flex flex-col w-full px-16 items-center my-48">
        <FaqList className="w-full max-w-4xl" list={faqsMost} />
      </div>
    </div>
  );
}

export default HelpCenterHome;
