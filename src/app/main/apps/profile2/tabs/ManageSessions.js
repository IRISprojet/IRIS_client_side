/* eslint-disable no-nested-ternary */
import { Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "src/app/auth/services/api";
import SessionDetailsPage from "./utils/SessionDetails";
import CardInfo from "./utils/CardInfo";

function ManageSession() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const visitorId = sessionStorage.getItem("_VI");

  async function fetchData() {
    try {
      const { data } = await api.get("/api/devices");
      if (data.sessions) setSessions(data.sessions);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const buttonClick = (index) => {
    setSelectedSession(sessions[index]);
    setShowDetails(true);
  };
  const handleCloseAll = async () => {
    await api.delete(`api/devices/all/${visitorId}`);
    fetchData();
  };
  return (
    <div className="flex flex-col w-[100%] bg-transparent mr-0 h-384 rounded-0 items-center p-[25px] ">
      {sessions?.length === 0 ? (
        <Typography variant="h6" className=" w-full " textAlign="center" sx={{ color: "#5e5873" }}>
          No sessions found.
        </Typography>
      ) : !showDetails ? (
        <>
          <Typography
            variant="h6"
            className=" w-full font-nexa"
            textAlign="left"
            sx={{ color: "#5e5873" }}
          >
            MANAGE SESSIONS
          </Typography>
          <Typography
            variant="body1"
            className=" w-full"
            textAlign="left"
            sx={{ color: "#6e6b7b", fontSize: 13 }}
          >
            You are logged in on these devices
          </Typography>
          <Divider className="w-full mt-20" orientation="horizontal" />
          <div className="flex overflow-auto pt-20 w-fit h-full">
            {sessions.map((session, index) => {
              return (
                <CardInfo
                  isActive={visitorId == session.visitorId}
                  key={index}
                  session={session}
                  buttonClick={() => {
                    buttonClick(index);
                  }}
                />
              );
            })}
          </div>
          <Button
            size="large"
            className="rounded-4 m-0 self-end"
            color="primary"
            variant="outlined"
            onClick={handleCloseAll}
          >
            Close all sessions
          </Button>
        </>
      ) : (
        <SessionDetailsPage
          visitorId={visitorId}
          details={selectedSession}
          setShowDetails={setShowDetails}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default ManageSession;
