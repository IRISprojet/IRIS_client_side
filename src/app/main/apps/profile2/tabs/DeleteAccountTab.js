import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'app/store/userSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("You must enter a password")
    .min(8, "Password must be at least 8 characters long")
});

const defaultValues = {
  password: "",
};

function DeleteAccountTab(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = ({ password }) => {
    dispatch(deleteUser(password))
      .then(response => {
        if (response.data.success) {
          console.log('User deleted successfully');
          handleClose();
        } else {
          console.log(response.data.error);
        }
      })
      .catch(error => {
        console.log('Something went wrong!');
      });
  };
  
  const { control, formState: { isValid, dirtyFields, errors }, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <br/>
      <div style={{ color: "black"}} className='"font-bold text-[15px] text-[#6E4998]'>
      <p style={{ fontWeight: "bold" }} className='"font-bold text-[18px] text-[#6E4998]' >Attention:</p>
  
      <p>You are about to delete your profile. This will permanently remove all of your data and cannot be reversed.</p>
    </div>
    <br/>
    <br/>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Delete my account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <div className="justify-center items-center text-center">
        <img
            className="w-555 h-593 mt-32 inline"
            src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png"
            width={"60px"} height={"40px"}
            alt="logo"
          />
        <DialogTitle className="font-bold text-[24px] text-[#6E4998]">Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-[16px] mb-28 text-[#6E6B7B]">
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
          <br/>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                label="Password"
                autoFocus
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(handleDelete)} disabled={!isValid} color="secondary">
            Delete
          </Button>
        </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteAccountTab;
