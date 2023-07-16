import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  activateMfa,
  setTfaTypeToFaceId,
  setTfaTypeToAuthenticator,
  setTfaTypeToEmail,
} from "app/store/userSlice";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
} from "@mui/material";

import Switch from "@mui/material/Switch";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("You must enter a password")
    .min(8, "Password must be at least 8 characters long"),
});

const defaultValues = {
  password: "",
};

function AccountSecurityTab(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // tfa
  const [openTfa, setOpenTfa] = useState(false);

  const {
    control,
    formState: { isValid, dirtyFields, errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [authenticatorEnabled, setAuthenticatorEnabled] = useState(false);
  const [EmailEnabled, setEmailEnabled] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //tfa
  const handleOpenTfa = () => {
    setOpenTfa(true);
  };

  const handleCloseTfa = () => {
    setOpenTfa(false);
  };

  const handleActivate = ({ password }) => {
    dispatch(activateMfa(password))
      .then((response) => {
        if (response.data.success) {
          console.log("Multi-Factor Authentication activated successfully");
          handleClose(); // Close the modal here
        } else {
          console.log(response.data.error);
        }
      })
      .catch((error) => {
        console.log("Something went wrong!");
      });
  };

  const handleFaceIdChange = (event) => {
    setFaceIdEnabled(event.target.checked);
    dispatch(setTfaTypeToFaceId());
  };

  const handleAuthenticatorChange = (event) => {
    setAuthenticatorEnabled(event.target.checked);
    dispatch(setTfaTypeToAuthenticator());
  };

  const handleEmailChange = (event) => {
    setEmailEnabled(event.target.checked);
    dispatch(setTfaTypeToEmail());
  };

  return (
    <div>
      <br />
      <div style={{ color: "black" }} className='"font-bold text-[15px] text-[#6E4998]'>
        <p style={{ fontWeight: "bold" }} className='"font-bold text-[18px] text-[#6E4998]'>
          {" "}
          Multi-Factor Authentification :
        </p>

        <p>
          By enabling Multi-Factor Authentication (MFA), all three options - email, authenticator,
          and face_id - will be activated to enhance the security of your account.{" "}
        </p>
      </div>
      <br />
      <div>
        <Button
          style={{
            backgroundColor: "#6E4998",
            color: "white",
            fontWeight: "bold",
            marginRight: "10px",
          }}
          variant="contained"
          onClick={handleOpen}
        >
          Activate MFA
        </Button>

        <br />
        <br />
        <br />
        <div style={{ color: "black" }} className='"font-bold text-[15px] text-[#6E4998]'>
          <p style={{ fontWeight: "bold" }} className='"font-bold text-[18px] text-[#6E4998]'>
            {" "}
            Two-Factor Authentification :
          </p>

          <p>
            By enabling Two-Factor Authentication (TFA), you can enhance the security of your
            account and choose to use either email, authenticator, or face_id as your second
            authentication method.{" "}
          </p>
        </div>
        <br />

        <Button
          style={{
            backgroundColor: "#6E4998",
            color: "white",
            fontWeight: "bold",
            marginRight: "10px",
          }}
          variant="contained"
          onClick={handleOpenTfa}
        >
          Activate TFA
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <div className="justify-center items-center text-center">
          <img
            className="w-555 h-593 mt-32 inline"
            src="assets/images/logo/reset-pw-icon.svg"
            width="60px"
            height="40px"
            alt="logo"
          />
          <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
            Multi-Factor Authentification
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="text-[16px] mb-28 text-[#6E6B7B]">
              Please provide your password to enable MFA.
            </DialogContentText>

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  label="Password"
                  autoFocus
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit(handleActivate)} disabled={!isValid} color="secondary">
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog open={openTfa} onClose={handleCloseTfa}>
        <br />

        <div className="justify-center items-center text-center">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://www.pngfind.com/pngs/m/208-2089294_two-factor-authentication-2fa-icon-hd-png-download.png"
              width={"120px"}
              height={"30px"}
              alt="logo"
            />
          </div>

          <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
            Two-Factor Authentification
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="text-[16px] mb-28 text-[#6E6B7B]">
              Please select one of these options to enable two-factor authentication for added
              security.
            </DialogContentText>

            <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
              <FormControlLabel
                label="Activate Face Id"
                control={
                  <Switch
                    checked={faceIdEnabled}
                    onChange={handleFaceIdChange}
                    height={20}
                    width={50}
                  />
                }
              />

              <FormControlLabel
                label="Activate Authenticator"
                control={
                  <Switch
                    checked={authenticatorEnabled}
                    onChange={handleAuthenticatorChange}
                    height={20}
                    width={50}
                  />
                }
              />

              <FormControlLabel
                label="Activate Email"
                control={
                  <Switch
                    checked={EmailEnabled}
                    onChange={handleEmailChange}
                    height={20}
                    width={50}
                  />
                }
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTfa} color="primary">
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
export default AccountSecurityTab;
