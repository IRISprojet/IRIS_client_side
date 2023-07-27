import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Post from "./components/post";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function ForumApp() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Root
      header={
        <div className="flex flex-1 items-center justify-between p-24">
          <div className="flex items-center">
            <img className="w-48 sm:w-64 rounded" src="assets/images/forum.png" alt="" />
            <Typography component="h1" variant="h5" color="inherit" className="font-medium ml-4">
              event
            </Typography>
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          <Post />
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default ForumApp;
