import React, { useEffect, useState } from "react";
import "./VerificationInput.css";

import { LoadingButton } from "@mui/lab";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import VerificationInput from "react-verification-input";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { login } from "app/store/userSlice";
import { api } from "src/app/auth/services/api";

const TfaEmail = ({ accessToken, user, remember }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const [tfa, setTFA] = useState("");
  const [resendCodeLoading, setResendCode] = useState(false);
  const COUNTER = 10;
  const [counter, setCounter] = React.useState(COUNTER);
  const [clicked, setClicked] = React.useState(false);

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
  useEffect(() => {
    tfa.length == 6 && verifyTFAEmail();
  }, [tfa]);

  const verifyTFAEmail = async () => {
    try {
      setLoading(true);
      // verify the tfa code
      const { data } = await api.post(
        "api/user/tfa_verify",
        { code: tfa, remember: remember },
        { headers: { "x-access-token": accessToken } }
      );
      dispatch(
        showMessage({
          message: data.message,
          variant: "success",
        })
      );
      setLoading(false);

      sessionStorage.setItem("_AT", data.accessToken);

      // settimeout to be able to see the dispatch message above
      setTimeout(() => {
        dispatch(login(data.user, data.accessToken));
      }, 1000);
    } catch (error) {
      setLoading(false);

      console.log(error);
      dispatch(
        showMessage({
          message: error.response.data.message || "Opps...somthing went wrong",
          variant: "error",
        })
      );
    }
  };
  const resendCode = async () => {
    try {
      setResendCode(true);

      const { data } = await api.get("tfa/cynoia/setup", {
        headers: { "x-tfaaccess-token": accessToken },
      });
      setResendCode(false);
      dispatch(
        showMessage({
          message: "code resent successfully",
          variant: "success",
        })
      );
      setClicked(true);
    } catch (error) {
      setClicked(true);

      setResendCode(false);
      dispatch(
        showMessage({
          //message: error.response.data.message,
          message: "Opps...somthing went wrong while sending the email again",
          variant: "error",
        })
      );
    }
  };

  return (
    <div className="justify-center items-center text-center">
      {/*  <div class="relative h-32 w-32">
        <div class="absolute left-0 top-0 h-16 w-16">
          <button onClick={test}>back</button>
        </div>
      </div> */}
      <img
        className="w-555 h-593 mt-32 inline"
        src="assets/images/logo/reset-pw-icon.svg"
        alt="logo"
      />
      <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
        Two Factor Authentification
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="text-[16px] mb-28 text-[#6E6B7B]">
          A verification code has already been sent to your email. This code
          will be valid for 1 hour
        </DialogContentText>
        {isLoading ? (
          <CircularProgress size={30} className={"CynoiaThemeColor"} />
        ) : (
          <VerificationInput
            removeDefaultStyles
            classNames={{
              container: "container",
              character: "character",
              characterInactive: "character--inactive",
              characterSelected: "character--selected",
            }}
            onChange={(e) => setTFA(e)}
            autoFocus
            validChars="!^[0-9]*$"
          />
        )}

        <LoadingButton
          size="small"
          onClick={resendCode}
          loading={resendCodeLoading}
          loadingIndicator={
            <CircularProgress size={25} className="text-white" />
          }
          variant="contained"
          className="w-full mx-auto mt-16 w-440 h-48 rounded-md"
          color="primary"
          disabled={clicked}
        >
          {clicked ? "Resend code in " + counter : "Resend code"}
        </LoadingButton>
      </DialogContent>
    </div>
  );
};

export default TfaEmail;
