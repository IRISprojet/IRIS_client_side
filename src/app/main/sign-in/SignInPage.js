import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CircularProgress, Dialog } from "@mui/material";
import ForgetPassword from "./ForgetPassword";
import TfaEmail from "./TfaEmail";
import TfaGoogleAuth from "./TfaGoogleAuth";
import SelectTfa from "./Mfa";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { login } from "app/store/userSlice";
import { api } from "src/app/auth/services/api";
import TfaFaceId from "./TfaFaceId";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  remember: false,
};

function SignInPage() {
  const dispatch = useDispatch();
  // open forgot password interface
  const [openForgotPassword, setForgotPassword] = useState(false);
  // open tfa interface
  const [openEmailTfa, setOpenEmailTfa] = useState(false);
  // open tfa google interface
  const [OpenGglAuth, setOpenGglAuth] = useState(false);
 // open tfa face id  interface
 const [OpenFaceIdAuth, setOpenFaceIdAuth] = useState(false);
  //save acess token
  const [accessToken, setAcessToken] = useState("");

  // loading login button
  const [isLoading, setLoading] = useState(false);

  const [choseTfa, setOpenchoseTfa] = useState(false);

  const [visitorId, setvisitorId] = useState(null);

  // switch between tfa email , tfa ggl functions and forget password
  const OpenForgotPassword = () => setForgotPassword(true);
  const CloseForgotPassword = () => setForgotPassword(false);

  const OpenTfaEmail = () => setOpenEmailTfa(true);
  const CloseTfaEmail = () => setOpenEmailTfa(false);

  const OpenTfaGglAuth = () => setOpenGglAuth(true);
  const CloseTfaGglAuth = () => setOpenGglAuth(false);

  const OpenTfaFaceIdAuth = () => setOpenFaceIdAuth(true);
  const CloseTfaFaceIdAuth = () => setOpenFaceIdAuth(false);

  const OpenChoseTfa = () => setOpenchoseTfa(true);
  const CloseChoseTfa = () => setOpenchoseTfa(false);

  //
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [forgetPopover, SetForgetPopover] = useState(false);
  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue("email", "omar.saidi@esprit.tn", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("password", "timtowtdi", {
      shouldDirty: true,
      shouldValidate: true,
    });
    setvisitorId(sessionStorage.getItem("_VI"));
  }, [setValue]);

  async function onSubmit({ email, password }) {
    try {
      setLoading(true);
      const { data } = await api.post("api/user/login", {
        data: { email, password },
      });
      console.log(data);
      //login if the user has no tfa enabled, basic login
      if (data.type == "valid") {
        setLoading(false);
        sessionStorage.setItem("_AT", data.accessToken);
        dispatch(login(data.user, data.accessToken));
      }
      //login if tfa activated
      else {
        setAcessToken(data.accessToken);
        // whcih interface to show depending on the tfa type
        switch (data.type) {
          case "email":
            await api.get("api/user/tfa", {
              headers: { "x-access-token": data.accessToken },
            });
            setLoading(false);
            OpenTfaEmail();

            break;
          case "authenticator":
            setLoading(false);
            OpenTfaGglAuth();
            break;
            case "face_id":
            setLoading(false);
            OpenTfaFaceIdAuth();
            break;
          case "mfa":
            await api.get("api/user/tfa", {
              headers: { "x-access-token": data.accessToken },
            });
            setLoading(false);
            OpenChoseTfa();
            break;
          default:
            setLoading(false);
            dispatch(
              showMessage({
                message: "something went wrong, please try again",
                variant: "info",
              })
            );
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      //login if user is not verirfied
      if (error?.response?.data?.message === "Please verify your account") {
        setLoading(false);
        dispatch(
          showMessage({ message: error.response.data.message, variant: "info" })
        );
      }
      // login if wrong credianitials
      else {
        setLoading(false);
        dispatch(
          showMessage({
            message:
              error?.response?.data?.message || "Opps...Something went wrong",
            variant: "error",
          })
        );
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-70" src="https://res.cloudinary.com/dhufakahz/image/upload/v1690137235/logo-dark_tt7qyc.png" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Don't have an account?</Typography>
            <Link className="ml-4" to="/sign-up">
              Sign up
            </Link>
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />
              <a
                className="font-metropolis font-semibold cursor-pointer"
                onClick={OpenForgotPassword}
              >
                Forgot Password?
              </a>
            </div>

            <LoadingButton
              loading={isLoading}
              loadingIndicator={
                <CircularProgress size={24} className="text-white" />
              }
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Sign in
            </LoadingButton>

            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              <Button
                variant="outlined"
                className="flex-auto"
                href="http://localhost:8000/api/user/google"
              >
                <GoogleIcon />
              </Button>
              <Button
                variant="outlined"
                className="flex-auto"
                href="http://localhost:8000/api/user/github"
              >
                <GitHubIcon />
              </Button>
            </div>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: "primary.main" }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "primary.light" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: "primary.light" }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width="220"
            height="192"
            fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
          />
        </Box>

        <div className="z-10 relative w-full max-w-2xl ">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>Iris team </div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
          Iris team helps students to build organized carrier with intenrships. Join us.
          </div>
          <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                "& .MuiAvatar-root": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              More than 17k people joined us, it's your turn
            </div>
          </div>
        </div>
      </Box>
      {/*******************************forgot password interface***************************************/}
      <Dialog open={openForgotPassword} onClose={CloseForgotPassword}>
        <ForgetPassword />
      </Dialog>
      {/** *****************************tfa interface via mail ************************************** */}
      <Dialog open={openEmailTfa} onClose={CloseTfaEmail}>
        <TfaEmail
          accessToken={accessToken}
          //remember={getValues("remember")}
        />
      </Dialog>
      {/** *****************************tfa interface via ggl authentificator************************************** */}
      <Dialog open={OpenGglAuth} onClose={CloseTfaGglAuth}>
        <TfaGoogleAuth
          accessToken={accessToken}
          // remember={getValues("remember")}
        />
      </Dialog>
      {/** *****************************tfa interface via face id  ************************************** */}
      <Dialog open={OpenFaceIdAuth} onClose={CloseTfaFaceIdAuth}>
        <TfaFaceId
          accessToken={accessToken}
          // remember={getValues("remember")}
        />
      </Dialog>
      {/*******************************chose interface ***************************************/}

      <Dialog open={choseTfa} onClose={CloseChoseTfa}>
        <SelectTfa
          // to open ggl auth interface
          setOpenGglAuth={setOpenGglAuth}
          //to open email interface
          setOpenEmailTfa={setOpenEmailTfa}
          //to close chose interface when needed
          setOpenchoseTfa={setOpenchoseTfa}

          accessToken={accessToken}
        />
      </Dialog>
    </div>
  );
}

export default SignInPage;
