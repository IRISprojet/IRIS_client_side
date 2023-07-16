import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { useSnackbar } from "notistack";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import NotificationTemplate from "app/theme-layouts/shared-components/notificationPanel/NotificationTemplate";
import NotificationModel from "./model/NotificationModel";
import NotificationCard from "./NotificationCard";
import {
  addNotification,
  dismissAll,
  dismissItem,
  getNotifications,
  selectNotifications,
} from "./store/dataSlice";
import reducer from "./store";
import {
  closeNotificationPanel,
  selectNotificationPanelState,
  toggleNotificationPanel,
} from "./store/stateSlice";
import { socket } from "src/socket";

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.default,
    width: 320,
  },
}));

function NotificationPanel(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector(selectNotificationPanelState);
  const notifications = useSelector(selectNotifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    /*
		Get Notifications from db
		 */
    dispatch(getNotifications());
    socket.on("notificationReceived", (data) => {
      dispatch(addNotification(data));
    });
    return () => {
      // clean up the socket event listener when the component unmounts
      socket.off("notificationReceived");
    };
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      dispatch(closeNotificationPanel());
    }
    // eslint-disable-next-line
  }, [location, dispatch]);

  function handleClose() {
    dispatch(closeNotificationPanel());
  }

  function handleDismiss(id) {
    dispatch(dismissItem(id));
  }
  function handleDismissAll() {
    dispatch(dismissAll());
  }

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleNotificationPanel())}
      disableSwipeToOpen
    >
      <IconButton className="m-4 absolute top-0 right-0 z-999" onClick={handleClose} size="large">
        <FuseSvgIcon color="action">heroicons-outline:x</FuseSvgIcon>
      </IconButton>
      {notifications.length > 0 ? (
        <FuseScrollbars className="p-16">
          <div className="flex flex-col">
            <div className="flex justify-between items-end pt-136 mb-36">
              <Typography className="text-28 font-semibold leading-none">Notifications</Typography>
              <Typography
                className="text-12 underline cursor-pointer"
                color="secondary"
                onClick={handleDismissAll}
              >
                dismiss all
              </Typography>
            </div>
            {notifications.map((item, idx) => (
              <NotificationCard key={idx} className="mb-16" item={item} onClose={handleDismiss} />
            ))}
          </div>
        </FuseScrollbars>
      ) : (
        <div className="flex flex-1 items-center justify-center p-16">
          <Typography className="text-24 text-center" color="text.secondary">
            There are no notifications for now.
          </Typography>
        </div>
      )}
    </StyledSwipeableDrawer>
  );
}

export default withReducer("notificationPanel", reducer)(memo(NotificationPanel));
