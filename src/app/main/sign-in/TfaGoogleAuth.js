import "./VerificationInput.css";

import {
  CircularProgress,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { login } from "app/store/userSlice";
import { api } from "src/app/auth/services/api";

const TfaGoogleAuth = ({ accessToken, user, remember }) => {
  const dispatch = useDispatch();

  const [tfaggl, setTFAggl] = useState("");
  const [isLoadingtfaggl, setLoadingtfaggl] = useState(false);

  useEffect(() => {
    tfaggl.length == 6 && verifyTFAggl();
  }, [tfaggl]);

  // tfa ggl
  const verifyTFAggl = async () => {
    try {
      setLoadingtfaggl(true);
      const { data } = await api.post(
        "api/user/google_tfa_verify",
        { code: tfaggl, remember: remember },
        { headers: { "x-access-token": accessToken } }
      );
      dispatch(
        showMessage({
          message: data.message,
          variant: "success",
        })
      );
      // set accestoken in session storage
      sessionStorage.setItem("_AT", data.accessToken);

      // settimeout to be able to see the dispatch message above
      setTimeout(() => {
        dispatch(login(data.user, data.accessToken));
        setLoadingtfaggl(false);
      }, 1000);
    } catch (error) {
      setLoadingtfaggl(false);
      console.log(error);
      dispatch(
        showMessage({
          message: error.response.data.message || "Opps...something went wrong",

          variant: "error",
        })
      );
    }
  };

  return (
    <div className="justify-center items-center text-center">
      <img
        className="w-200 h-200 mt-32 inline"
        src="assets/images/logo/google-authenticator-2.svg"
        alt="logo"
      />
      <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
        Two factor authentification
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{ whiteSpace: "pre-line" }}
          className="text-[16px] mb-28 text-[#6E6B7B]"
        >
          Open the two-factor authentification app {"\n"} on your device to view
          your authentication {"\n"} code and verify your identity.
        </DialogContentText>

        {isLoadingtfaggl ? (
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
            onChange={(e) => setTFAggl(e)}
            autoFocus
            validChars="!^[0-9]*$"
          />
        )}
      </DialogContent>
    </div>
  );
};

export default TfaGoogleAuth;
