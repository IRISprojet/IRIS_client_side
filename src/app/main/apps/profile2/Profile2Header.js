import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import _ from '@lodash';


function Profile2Header(props) {
  const dispatch = useDispatch();
  // const methods = useFormContext();
  // const { formState, watch, getValues } = methods;
  // const { isValid, dirtyFields } = formState;
  // const featuredImageId = watch('featuredImageId');
  // const images = watch('images');
  // const name = watch('name');
  const theme = useTheme();
  const navigate = useNavigate();



  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
  

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
           
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
         
              />
         
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || 'My Profile'}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Profile Details
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
     
      </motion.div>
    </div>
  );
}

export default Profile2Header;
