import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { login } from "app/store/userSlice";
import { useDispatch } from "react-redux";
import { api } from "src/app/auth/services/api";


const SelectTfa = ({ setOpenGglAuth, setOpenEmailTfa, setOpenFaceIdAuth,setOpenchoseTfa,accessToken }) => {
 const dispatch=useDispatch(); 


  return (
    <div className="w-full">
      <div className="justify-center items-center text-center my-0">
        <img
          className="w-555 h-593 mt-32 inline"
          src="assets/images/logo/reset-pw-icon.svg"
          alt="logo"
        />
        <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
          Multi-Factor Authentification
        </DialogTitle>
        <DialogContent>
          <DialogContentText className=" text-left	text-[16px] mb-28 text-[#6E6B7B]">
            <b>Protect your account with Multi-Factor Authentification</b>
            <br />
            <br />

            <p className="text-center">
              Multi-Factor Authentification (MFA) is an extra layer of security
              for your account. It requires you to enter a code in addition to
              your password to access your account. This code is generated by an
              app on your phone or sent to your email address. you can also use
              your face id to access your account.
            </p>

            <br />

            <p className=" text-left">
              <b>
                <span className="text-[#6E4998]">1.</span> Choose your MFA
                method
              </b>
            </p>
          </DialogContentText>
        </DialogContent>
      </div>
      <div className="flex items-stretch">
        <Card
          onClick={() => {
            setOpenGglAuth(true);
          }}
          sx={{ width: 300 }}
        >
          <CardActionArea>
            <div style={{ width: "100px", height: "100px", marginLeft: "35%" }}>
              <CardMedia
                component="img"
                height="140"
                image="assets/images/logo/google-authenticator-2.svg"
                alt="Google Authenticator TFA"
              />
            </div>

            <CardContent>
              <Typography
                className="font-metropolis font-bold"
                gutterBottom
                variant="h5"
                component="div"
              >
                Google Authenticator
              </Typography>
              <Typography
                className="font-metropolis font-bold"
                style={{ paddingBottom: "50px" }}
                variant="body2"
                color="text.secondary"
              >
                Use the Google Authenticator app to generate one time security
                code.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            // setOpenchoseTfa(false);

            setOpenEmailTfa(true);
          }}
          sx={{ width: 300 }}
        >
          <CardActionArea>
            <div style={{ width: "100px", height: "100px", marginLeft: "35%" }}>
              <CardMedia
                component="img"
                height="180px"
                image="assets/images/logo/email.png"
                alt="email TFA"
              />
            </div>
            <CardContent>
              <Typography
                className="font-metropolis font-bold"
                gutterBottom
                variant="h5"
                component="div"
              >
                code by Email
              </Typography>
              <Typography
                className="font-metropolis font-bold"
                style={{ paddingBottom: "50px" }}
                variant="body2"
                color="text.secondary"
              >
                A verification code has been already sent to your email, please
                verify your identity.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            

            setOpenFaceIdAuth(true);
          }}
          sx={{ width: 300 }}
        >
          <CardActionArea>
            <div style={{ width: "100px", height: "100px", marginLeft: "35%" }}>
              <CardMedia
                component="img"
                height="140"
                image="assets/images/logo/faceId.png"
                alt="faceId TFA"
              />
            </div>

            <CardContent>
              <Typography
                className="font-metropolis font-bold"
                gutterBottom
                variant="h5"
                component="div"
              >
                Login by face ID
              </Typography>
              <Typography
                className="font-metropolis font-bold"
                style={{ paddingBottom: "50px" }}
                variant="body2"
                color="text.secondary"
              >
                Open your camera and scan your face to login.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default SelectTfa;