import React from "react";
import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { api, pubApi } from "src/app/auth/services/api";
import LoadingButton from "@mui/lab/LoadingButton";

function SignUpCompletePage() {
  const COUNTER = 60;
  const [counter, setCounter] = React.useState(COUNTER);
  const [clicked, setClicked] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);
  const { token } = useParams();

  React.useEffect(() => {
    if (clicked) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        setClicked(false);
        setCounter(COUNTER);
      }
    }
  }, [clicked, counter]);

  const resendValidation = async () => {
    try {
      setIsWaiting(true);
      await api.get("api/user/resend_verification_email", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        withCredentials: true,
      });
      setIsWaiting(false);
      setClicked(true);
    } catch (error) {
      setIsWaiting(false);
      setClicked(true);
    }
  };

  return (
    <>
      <img
        className="absolute"
        src="assets/images/logo/logo.svg"
        alt=""
        style={{ height: "5vh", left: "5vh", top: "3vh" }}
      ></img>
      <div className="flex flex-col flex-auto items-center justify-center p-16 sm:p-32">
        <div className="flex flex-col items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="w-full max-w-384">
              <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
                <div className="m-32">
                  <img
                    className="w-[126px] h-[123px] mb-0"
                    src="assets/images/logo/verify-email-anim.gif"
                    alt=""
                  />
                </div>

                <Typography
                  variant="h5"
                  className="text-center mb-8 font-bold text-[24px] text-[#6E4998]                  "
                >
                  Verify your email address
                </Typography>

                <Typography
                  className="text-center mb-16 w-full font-normal font-[16px] text-[#6E6B7B]                  "
                  color="textSecondary"
                >
                  Your account has been successfully registered, to complete the
                  process please check your email for a validation request.
                </Typography>

                <LoadingButton
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16 w-440 h-48 rounded-sm"
                  aria-label="Resend the validation"
                  type="button"
                  onClick={resendValidation}
                  loading={isWaiting}
                  disabled={clicked}
                >
                  {clicked
                    ? "Resend the validation in " + counter
                    : "Resend the validation"}
                </LoadingButton>

                <div className="flex flex-col items-center justify-center pt-32 pb-24">
                  <Link className="font-normal" to="/sign-in">
                    Go back to login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SignUpCompletePage;
