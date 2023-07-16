/* eslint-disable no-nested-ternary */
import { Box, Button, Paper, IconButton, Typography } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api } from "src/app/auth/services/api";
import Moment from "react-moment";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

function SessionDetailsPage({ details, setShowDetails, fetchData, visitorId }) {
  const [open, setOpen] = useState(false);
  const { _id } = details;
  console.log(details);
  console.log(visitorId);
  const handleVerify = async () => {
    try {
      await api.put(`/api/devices?id=${_id}`);
      fetchData();
      setShowDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSecure = async () => {
    try {
      await api.delete(`api/devices?id=${_id}`);
      fetchData();
      setShowDetails(false);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="flex relative flex-col h-full w-full items-center justify-center">
      <IconButton
        className="absolute left-0 top-0"
        color="primary"
        aria-label="back"
        onClick={() => {
          setShowDetails(false);
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Paper
        className="rounded-4 w-[100%] h-[100%] flex flex-col p-20"
        elevation={3}
        sx={{
          backgroundColor: "rgba(161, 134, 226, 0.05)",
          justifyContent: details.visitorId === visitorId ? "space-evenly" : "space-around",
        }}
      >
        <div className="h-[30%] justify-between flex flex-col">
          <Typography variant="body1" sx={{ fontSize: 15, color: "#6e6b7b" }}>
            <Moment format="YYYY/MM/DD hh:mm:ss">{details.firstSeenAtGlobal}</Moment>
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 20, color: "#5e5873" }}>
            New Connection on {details.browserName}
          </Typography>
          <Typography variant="body1" sx={{ color: "#6e6b7b" }}>
            If you did not initiate this change, the security of your account may have been
            compromised.
          </Typography>
        </div>
        <div className="flex flex-row justify-evenly h-[30%]">
          {details.device !== "Other" ? (
            <PhoneIphoneIcon className="mt-[30px]" sx={{ fontSize: 70, color: "#6e4998" }} />
          ) : (
            <LaptopMacIcon className="mt-[30px]" sx={{ fontSize: 70, color: "#6e4998" }} />
          )}
          <div className="flex flex-col ml-[40px]">
            <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
              {details.os} {details.osVersion}
            </Typography>
            <Typography>{details.ip}</Typography>
            <Typography>
              First seen at :
              <Moment format="YYYY/MM/DD hh:mm:ss">{details.firstSeenAtGlobal}</Moment>
            </Typography>

            <Typography>
              Last seen at :{" "}
              <Moment format="YYYY/MM/DD hh:mm:ss">{details.lastSeenAtGlobal}</Moment>
            </Typography>

            <Typography>
              {details.browserName} {details.browserFullVersion}
            </Typography>
            <Typography>
              {details.countryName}, {details.cityName}
            </Typography>
          </div>
        </div>
        {details.visitorId === visitorId ? null : !details.isVerified ? (
          <Box
            className="h[20%] flex flex-col"
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "#5e5873", fontSize: 15, marginTop: 3 }}>
              Do you recognize this activity?
            </Typography>
            <div className="flex gap-10">
              <Button
                className="w-[50%]"
                color="secondary"
                variant="outlined"
                onClick={handleClickOpen}
                sx={{ borderRadius: 1 }}
              >
                No, secure my account
              </Button>
              <Button
                className="w-[50%]"
                color="primary"
                variant="contained"
                onClick={handleVerify}
                disabled={details.isVerified}
                sx={{ borderRadius: 1 }}
              >
                Yes, it was me
              </Button>
            </div>
            <ConfirmationDialog
              handleSecure={handleSecure}
              handleClose={handleClose}
              openChange={setOpen}
              openState={open}
            />
          </Box>
        ) : (
          <Box
            className="h-[20%] flex flex-col"
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "#5e5873", fontSize: 15 }}>
              This device is secured
            </Typography>
            <Button
              className="w-[100%] "
              color="secondary"
              variant="outlined"
              onClick={handleClickOpen}
              sx={{ borderRadius: 1 }}
            >
              Close session
            </Button>
            <ConfirmationDialog
              handleSecure={handleSecure}
              handleClose={handleClose}
              openChange={setOpen}
              openState={open}
            />
          </Box>
        )}
      </Paper>
    </div>
  );
}

export default SessionDetailsPage;
