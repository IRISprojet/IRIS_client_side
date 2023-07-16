import { Paper, IconButton, Typography } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Moment from "react-moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function CardInfo(props) {
  return (
    <Paper
      className="rounded-4 h-[125px] w-full flex items-center mr-16 "
      elevation={3}
      sx={{ backgroundColor: "rgba(161, 134, 226, 0.05)" }}
    >
      <div className=" flex flex-row w-fit items-center mr-4">
        {props.session.device === "phone" ? (
          <PhoneIphoneIcon sx={{ fontSize: 50, color: "#6e4998" }} />
        ) : (
          <LaptopMacIcon sx={{ fontSize: 50, color: "#6e4998" }} />
        )}
        <Typography variant="subtitle2" sx={{ fontSize: 15 }}>
          {props.session.os}
        </Typography>
      </div>
      <div className="flex flex-col w-fit">
        {props.session.isVerified && (
          <div className="flex flex-row">
            <Typography>Session verified </Typography>
            <CheckCircleIcon fontSize="small" sx={{ color: "#6495ED" }} />
          </div>
        )}
        <Typography>{props.session.countryName}</Typography>
        <Typography>{props.session.browserName}</Typography>
        <Typography variant="body1" sx={{ fontSize: 15, color: "#6e6b7b" }}>
          <Moment fromNow>{props.session.lastSeenAtGlobal}</Moment>
        </Typography>
        {props.isActive && <Typography color={"green"}>Active now</Typography>}
      </div>
      <div>
        <IconButton color="primary" aria-label="next" onClick={props.buttonClick}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </Paper>
  );
}

export default CardInfo;
