import React, { useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function NoteFormUploadImage(props) {
  function handleChange(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
   // console.log(file)
    props.onChange(file);
  }

  return (
    <>
      <label htmlFor="button-file">
        <input
          accept="image/*"
          className="hidden"
          id="button-file"
          type="file"
          onChange={handleChange}
        />
        <IconButton className="w-32 h-32 mx-4 p-0" component="span" size="large">
          <FuseSvgIcon size={20}>heroicons-outline:photograph</FuseSvgIcon>
        </IconButton>
      </label>
    </>
  );
}


export default NoteFormUploadImage;
