import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { api } from "src/app/auth/services/api";
import ReactLoading from "react-loading";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Password is too short"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const defaultValues = {
  password: "",
  passwordConfirm: "",
};

function ResetPasswordPage() {
  const [showPW1, setShowPW1] = useState(false);
  const [showPW2, setShowPW2] = useState(false);

  const dispatch = useDispatch();

  // fetching token from url
  let { RPWtoken } = useParams();

  // 0= pending  1=valid token  2 = invalid token
  const [isVerified, setVerified] = useState(0);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    api
      .get(`api/user/checkPasswordResetTokenValid`, {
        headers: {
          "x-access-token": RPWtoken,
        },
      })
      //all good
      .then((res) => {
        setVerified(1);
      })
      //token not valid
      .catch((error) => {
        setVerified(2);
      });
  }, []);

  async function onSubmit(model) {
    try {
      const response = await api.put("api/user/resetPassword", model, {
        headers: {
          "x-access-token": RPWtoken,
        },
      });
      dispatch(
        showMessage({ message: response.data.message, variant: "success" })
      );
      setTimeout(function () {
        window.location = "/sign-in";
      }, 2500);
    } catch (error) {
      console.log(error.response.data);
      dispatch(
        showMessage({
          message: error.response.data.message,
          variant: "error",
        })
      );
    }
  }

  return (
    <>
      {isVerified == 1 ? (
        <>
          <img
            className="absolute"
            src="assets/images/logo/logo.svg"
            alt=""
            style={{ height: "5vh", left: "5vh", top: "3vh" }}
          ></img>
          <div className="flex flex-col flex-auto items-center justify-center p-16 w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <motion.div
                className="w-[30%]"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-32">
                    <img
                      className="w-[97px] h-[115px] "
                      src="assets/images/logo/reset-pw-logo.svg"
                      alt="logo"
                    />

                    <Typography
                      variant="h6"
                      className=" font-metropolis mt-16 mb-24 font-bold text-[#6E4998]  text-[30px] sm:text-24"
                    >
                      Reset your password
                    </Typography>

                    <form
                      name="resetForm"
                      noValidate
                      className="flex flex-col justify-center w-full"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="mb-16"
                            label="Password"
                            type={showPW1 ? "text" : "password"}
                            name="password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            required
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setShowPW1(!showPW1)}
                                  >
                                    {showPW1 ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />

                      <Controller
                        name="passwordConfirm"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Password (Confirm)"
                            type={showPW2 ? "text" : "password"}
                            error={!!errors.passwordConfirm}
                            helperText={errors?.passwordConfirm?.message}
                            variant="outlined"
                            required
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => setShowPW2(!showPW2)}
                                  >
                                    {showPW2 ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 w-440 h-48 rounded-sm"
                        aria-label="Register"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        type="submit"
                      >
                        Confirm new password
                      </Button>
                    </form>

                    <div className="flex flex-col items-center justify-center pt-32 pb-24">
                      <Link className="font-normal" to="/sign-in">
                        Back to login
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </>
      ) : isVerified == 0 ? (
        <div className="flex items-center justify-center h-screen">
          <h1>Verifying ... Please wait &nbsp;</h1>
         { <ReactLoading type={"spokes"} color={"rgb(110 73 152)"} />}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1> Invalid URL &#10060;</h1>
        </div>
      )}
    </>
  );
}

export default ResetPasswordPage;
