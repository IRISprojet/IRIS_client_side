import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ConfirmationDialog(props) {
  return (
    <div>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", height: 300 } }}
        maxWidth="xs"
        open={props.openState}
        onClose={props.handleClose}
      >
        <DialogTitle className="flex flex-col justify-center items-center">
          <ErrorOutlineIcon sx={{ fontSize: 100, color: "#f8bb86", borderWidth: "2" }} />
          Are you sure ?
        </DialogTitle>

        <DialogContent>
          <DialogContentText align="center">
            Do you really want to close this session ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: "auto", marginBottom: "5%" }}>
          <Button
            size="large"
            className="rounded-8"
            variant="contained"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            size="large"
            className="rounded-8"
            variant="contained"
            onClick={props.handleSecure}
          >
            Yes !
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;
