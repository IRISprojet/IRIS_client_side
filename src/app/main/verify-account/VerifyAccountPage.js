import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { api } from "src/app/auth/services/api";
import History from "@history";
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";

function VerifyAccountPage() {
  const [message, setMessage] = useState("Welcome to Esprit Community!");
  const [isWaiting, setIsWaiting] = useState(true);
  const { token } = useParams();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    window.location.href = "/sign-in";
  };

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.post(
          `api/user/verify`,
          {},
          {
            headers: { "x-access-token": token },
          }
        );
        setMessage(await response.data.message);
        setIsWaiting(false);
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
        setIsWaiting(false);
        dispatch(
          showMessage({
            message:
              error.response.data.message ||
              "We couldn't verify your account. Please try again later.",
            variant: "info",
          })
        );
        History.push("/sign-in");
      }
    };
    verify();
  }, []);

  return (
    <>
      <img
        className="absolute"
        src="assets/images/logo/logo.svg"
        alt=""
        style={{ height: "5vh", left: "5vh", top: "3vh" }}
      ></img>
      <div className="w-full flex flex-col flex-auto items-center justify-center p-16 sm:p-32">
        <div className="flex flex-col items-center justify-center w-full">
          <Card className="w-[45%] h-[400px]">
            {isWaiting ? (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress size={80} />
              </div>
            ) : (
              <CardContent className="flex flex-col text-center items-center justify-center p-16 sm:p-24 md:p-32">
                <img
                  className="w-[142px] h-[142px] "
                  src="assets/images/logo/check-anim.gif"
                  alt=""
                />

                <Typography
                  variant="h6"
                  className="mb-24 font-bold text-[24px]  text-[#6E4998]"
                >
                  {message}
                </Typography>

                <Typography
                  variant="h6"
                  className="mb-24 font-normal text-[16px]  text-[#6E6B7B]"
                  whiteSpace="break-spaces"
                >
                  {
                    "You’re all set ! We hope you will enjoy your experience \nwith ESPRIT Community."
                  }
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  className="mx-auto mt-16 rounded w-1/3 py-24"
                  aria-label="Get Started"
                  type="submit"
                  onClick={handleLogin}
                >
                  Get Started
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default VerifyAccountPage;
