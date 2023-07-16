import { useState } from "react";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { CircularProgress, Button, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import VerificationInput from "react-verification-input";
import "./VerificationInput.css";
import {api} from "src/app/auth/services/api";

const TfaFaceId = ({ accessToken, user, remember }) => {
  const dispatch = useDispatch();

  const [tfafid, setTFAfid] = useState("");
  const [isLoadingtfafid, setLoadingtfafid] = useState(false);

  const verifyTFAfid = async () => {
    try {
      setLoadingtfafid(true);
      const { data } = await api.post(
        "api/user/loginwithface",
        { code: tfafid, remember: remember },
        { headers: { "x-access-token": accessToken } }
      );
      dispatch(
        showMessage({
          message: data.message,
          variant: "success",
        })
      );
      sessionStorage.setItem("_AT", data.accessToken);
      setTimeout(() => {
        dispatch(login(data.user, data.accessToken));
        setLoadingtfafid(false);
        window.location.reload(); // <-- Refresh the page upon success
      }, 1000);
    } catch (error) {
      setLoadingtfafid(false);
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
        <br/>
    <img src="https://i.pinimg.com/564x/42/0c/07/420c07b0479f5b87b559b1bf84411e36.jpg" width="100" className="mx-auto" />
    <DialogTitle className="font-bold text-[24px] text-[#6E4998]">
      Face Recognition
    </DialogTitle>
    <DialogContent>
      <DialogContentText
        style={{ whiteSpace: "pre-line" }}
        className="text-[16px] mb-28 text-[#6E6B7B]"
      >
        Please wait for a moment while we process the recognition of your face. This may take a few seconds as we analyze and verify your identity for security purposes. 
        Your patience is greatly appreciated.
      </DialogContentText>
      {isLoadingtfafid ? (
        <CircularProgress size={30} className={"CynoiaThemeColor"} />
      ) : (
        <div className="flex justify-center">
          <Button variant="contained" onClick={verifyTFAfid}>
            Verify
          </Button>
        </div>
      )}
    </DialogContent>
  </div>
  );
};

export default TfaFaceId;
