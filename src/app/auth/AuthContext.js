/* eslint-disable no-shadow */
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
import { setAccessToken, setUser } from "app/store/userSlice";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { api, setupIntercepteur } from "./services/api";
import store from "../store";
import SplashScreen from "./SplashScreen";
import { socket } from "../../socket";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();
  const visitorId = sessionStorage.getItem("_VI");
  const { data } = useVisitorData();

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("_VI", data.visitorId);
    }
  }, [data]);

  function success(user, message) {
    if (message) {
      dispatch(showMessage({ message }));
    }

    Promise.all([
      dispatch(setUser(user)),
      // You can receive data in here before app initialization
    ]).then((values) => {
      setIsAuthenticated(true);
      setWaitAuthCheck(false);
    });
  }

  function pass(message) {
    if (message) {
      dispatch(showMessage({ message }));
    }
    setIsAuthenticated(false);
    setWaitAuthCheck(false);
  }

  useEffect(() => {
    // handshake with the socket server with socket io client side

    const handleAuthentication = async () => {
      try {
        let token;

        // remember me NOT activated
        if (sessionStorage.getItem("_AT")) {
          token = sessionStorage.getItem("_AT");
        }

        await Promise.all([dispatch(setAccessToken(token))]);

        // Find the user with the access token

        const userResponse = await api.get(`api/user/user?visitorId=${visitorId}`, {
          withCredentials: true,
        });

        // Set the user in the store
        if (userResponse.data.user) {
          success(userResponse.data.user);
          // emit the socket id to the server
          socket.emit("saveSocketId", { userId: userResponse.data.user._id });
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.log(error);
        pass();
      }
    };
    // Check if it's possible to auto login or not depending of refresh token
    handleAuthentication();
    // Adds the access token to the headers of the private api requests
    setupIntercepteur(store);
  }, [dispatch]);

  return waitAuthCheck ? (
    <SplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
