import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import _ from "@lodash";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { api } from "src/app/auth/services/api";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});

const defaultValues = {
  email: "",
};

const ForgetPassword = () => {
  const dispatch = useDispatch();

  // switch between the 2 interfaces
  const [submitted, setSubmitted] = React.useState(false);
  // loading effect interface 1
  const [Loading, setLoading] = React.useState(false);

  // resend link usestates
  const COUNTER = 10;
  const [counter, setCounter] = React.useState(COUNTER);
  const [clicked, setClicked] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);

  // save email
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    if (clicked) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        setClicked(false);
        setCounter(COUNTER);
      }
    }
  }, [clicked, counter]);

  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  async function Submited() {
    try {
      let email = getValues("email");
      setEmail(email);
      setLoading(true);
      await api.get(`api/user/forget-password?email=${email}`);

      dispatch(
        showMessage({
          message: "Email sent successfully!",
          variant: "success",
        })
      );
      setLoading(false);
      setSubmitted(true);
      reset(defaultValues);
    } catch (error) {
      console.log(error);
    }
  }

  async function resendLink() {
    try {
      setIsWaiting(true);
      const response = await api.get(`api/user/forget-password?email=${email}`);

      dispatch(
        showMessage({
          message: "Email resent successfully!",
          variant: "success",
        })
      );

      setIsWaiting(false);
      setClicked(true);
    } catch (error) {
      setIsWaiting(false);
      setClicked(true);
    }

    // setResendLink(true);
  }

  return (
    <div className="relative">
      {!submitted ? (
        <div className="justify-center items-center text-center">
          <img
            className="w-555 h-593 mt-32 inline"
            src="assets/images/logo/reset-pw-icon.svg"
            alt="logo"
          />
          <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
            Forget password
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="text-[16px] mb-28 text-[#6E6B7B]">
              Enter your email and we’ll send you instructions <br /> to reset
              your password
            </DialogContentText>
            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
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
              <Button
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16  h-[48px] rounded-md"
                aria-label="LOG IN"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={Submited}
              >
                {Loading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Send reset link"
                )}{" "}
              </Button>
            </form>
          </DialogContent>
        </div>
      ) : (
        <div className="justify-center items-center text-center">
          <img
            className="w-555 h-593 mt-32 inline"
            src="assets/images/logo/check-anim.gif"
            alt="logo"
          />
          <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
            Check your e-mail please !
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="text-[16px] mb-16 text-[#6E6B7B]">
              We have sent a password recover
              <br /> instructions to your email
            </DialogContentText>

            <Button
              onClick={() => (window.location = `mailto:${getValues("email")}`)}
              variant="contained"
              color="primary"
              className="w-full mx-auto mt-16  h-[48px] rounded-md"
              aria-label="Open email"
              type="button"
            >
              Open email
            </Button>
            <LoadingButton
              onClick={resendLink}
              variant="contained"
              color="primary"
              className="w-full mx-auto mt-16  h-[48px] rounded-md"
              aria-label="Open email"
              type="button"
              disabled={clicked}
              loading={isWaiting}
            >
              {clicked
                ? `Resend the validation in ${counter}`
                : "Resend the validation"}
            </LoadingButton>
          </DialogContent>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
