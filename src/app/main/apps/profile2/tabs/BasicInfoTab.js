import { useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserData } from 'app/store/userSlice';
import Button from '@mui/material/Button';
import "react-image-crop/dist/ReactCrop.css";
import defaultImage from './user.jpg';


function BasicInfoTab() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState(user.data.displayName);
  const [email, setEmail] = useState(user.data.email);
  const [country, setCountry] = useState(user.data.from);
  const [photoURL, setPhotoURL] = useState(user.data.photoURL);
  const [phone, setPhone] = useState(user.data.phone);
  const [profilePicture, setProfilePicture] = useState(user.data.profilePicture || null);
  const fileInputRef = useRef();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('displayName', displayName);
    data.append('email', email);
    data.append('from', country);
    data.append('photoURL', photoURL);
    data.append('phone', phone);
    data.append('profilePicture', profilePicture);
    dispatch(updateUserData(data)).then(() => {
      // Show success message or redirect to another page
    });
  };
  
  console.log(profilePicture);

  return (
    <form onSubmit={handleSubmit}>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {profilePicture ? (
          <img src={profilePicture} style={{ maxWidth: "140px", maxHeight: "120px" }} alt="Profile Picture" />
        ) : (
          <img src={defaultImage} style={{ maxWidth: "140px", maxHeight: "120px" }} alt="Default Profile Picture" />
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => fileInputRef.current.click()}
          style={{ width: '120px', height: '40px', marginLeft: '20px' }}
        >
           Picture
        </Button>

        
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      </div>

      <br/>
      <br/>

  
      <br/>
      <TextField
        className="mt-8 mb-16"
        label="Display Name"
        id="displayName"
        variant="outlined"
        fullWidth
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
      />

      <TextField
        className="mt-8 mb-16"
        label="Email"
        id="email"
        type="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        className="mt-8 mb-16"
        label="Country"
        id="country"
        type="text"
        variant="outlined"
        fullWidth
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      />

      {/* <TextField
        className="mt-8 mb-16"
        label="Photo URL"
        id="photoURL"
        variant="outlined"
        fullWidth
        value={photoURL}
        onChange={(event) => setPhotoURL(event.target.value)}
      /> */}

      <TextField
        className="mt-8 mb-16"
        label="Phone"
        id="phone"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

   <Button
  className="whitespace-nowrap mx-auto my-8"
  style={{ width: "200px", height: "50px" }}
  variant="contained"
  color="secondary"
  type="submit"
>
  Save
</Button>
    </form>
  );
}

export default BasicInfoTab;