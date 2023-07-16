import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./mySecurity.css";
import jwtService from '../../../auth/services/jwtService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showMessage } from "app/store/fuse/messageSlice";
import { useDispatch } from "react-redux";


function MySecurityApp() {

  const dispatch=useDispatch();
  const [tfaMethod, setTfaMethod] = useState("");
  const [showTfaCard, setShowTfaCard] = useState(false);
  const [showAddNewMethodCard, setShowAddNewMethodCard] = useState(false);
  //face id 
  const [showFaceIdModal, setShowFaceIdModal] = useState(false);
  const [image, setImage] = useState(null);


 const handleTfaMethodChange = (event) => {
  const value = event.target.value;
  setTfaMethod(value);
  if (value === "FaceId") {
    try{
      jwtService.setTfaTypeToFaceId();
      console.log("tfa type is face id")
      // alert("tf type is face id")
      dispatch(showMessage({message:"helloooooo",variant:'success'}))


    }catch(error){
      console.log(error)
    }
  }
};



 
const handleTfaEnable = async () => {
 
  try {
    const user = await jwtService.setTfaTrue();
    console.log("TFA enabled true");
    alert("tfa enabled to true")
  } catch (error) {
    console.error(error);
    // handle the error
  }
}

  
  const handleAddNewMethod = () => {
    setShowAddNewMethodCard(true);
    
  };
 //dispaly the image in the card inside the modal 
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    const track = mediaStream.getVideoTracks()[0];

    const imageCapture = new ImageCapture(track);

    const blob = await imageCapture.takePhoto();

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(blob);

    track.stop();
  };

  const handleSaveFaceId = () => {
    // Convert image to blob
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        // Create a file object with the correct filename
        const fileExtension = '.jpg'; // change to the correct file extension
        const fileName = `userImage${fileExtension}`;
        const imageFile = new File([blob], fileName, { type: 'image/jpeg' });
        
        // Call the uploadPic function and pass the image file as an argument
        jwtService.uploadPic(imageFile)
          .then(() => {
            // Close the modal
            alert('image saved')
            setShowFaceIdModal(false);
          })
          .catch((error) => {
            // Handle error if upload failed
            console.error(error);
          });
      }, 'image/jpeg');
    };
    img.src = image;
  };
  
  
  
  

  const renderTfaCard = () => {
    return (
      <>
      <Card className="my-security-card tfa-card">
     
        <Card.Header className="my-security-card-header">
          <h3>Two-factor Authentication</h3>
        </Card.Header>
        <Card.Body className="my-security-card-body">
      <p>
            Enable two-factor authentication for an extra layer of security when
            signing in. 
          </p>
       
          <Button
            variant="primary"
            onClick={handleTfaEnable}
            className="my-security-card-btn"
          >
            Enable
          </Button>
        </Card.Body>
        <Card.Footer className="my-security-card-footer">
          <Button
            variant="outline-secondary"
            onClick={handleAddNewMethod}
            className="my-security-card-btn"
          >
            Add new method
          </Button>
        </Card.Footer>
      </Card>
    
      </>
    );
  };
  

  const renderAddNewMethodCard = () => {
    if (showAddNewMethodCard==false) {
      return null; // si showAddNewMethodCard est faux, ne rend rien
    }
    return (
      <Card className="my-security-card">
        <Card.Header className="my-security-card-header">
          <h3>Select TFA Method</h3>
        </Card.Header>
        <Card.Body className="my-security-card-body">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tfaMethod"
              id="tfaEmail"
              value="Email"
              onChange={handleTfaMethodChange}
            />
            <label className="form-check-label" htmlFor="tfaEmail">
             Email
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tfaMethod"
              id="tfaAuthentication"
              value="Authenticator"
              onChange={handleTfaMethodChange}
            />
            <label className="form-check-label" htmlFor="tfaAuthenticator">
              Authenticator
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="tfaMethod"
              id="tfaFaceId"
              value="FaceId"
              onChange={handleTfaMethodChange}
              onClick={() => setShowFaceIdModal(true)}
            />
            <label className="form-check-label" htmlFor="tfaFaceId">
              Face id
            </label>
          </div>
          {showFaceIdModal && (
        <div className="face-id-modal">
          <div className="face-id-modal-content">
            <div className="face-id-modal-header">
              <h3>Face ID</h3>
              <button onClick={() => setShowFaceIdModal(false)}>Close</button>
            </div>
            <div className="face-id-modal-body">
              <div className="face-id-image-container">
                {image ? (
                  <img src={image} alt="User's face" />
                ) : (
                
                  <img  style={{height:"70%",width:"40%"}} src="http://www.interchimie.tn/web/image/product.template/935/image" alt="Loading..." />
                
                )}
              </div>
              <div className="face-id-upload-container">
                <h4>Upload your picture</h4>
                <input type="file" onChange={handleUpload} accept="image/*" />
                <h4>Take a picture</h4>
                <button onClick={handleCapture}>Capture</button>
              </div>
            </div>
            <div className="face-id-modal-footer">
              <button className="save" onClick={handleSaveFaceId} >save</button>
              <button className="cancel" onClick={() => setShowFaceIdModal(false)}>cancel</button>
            </div>
          </div>
        </div>
      )}

        </Card.Body>
        <Card.Footer className="my-security-card-footer">
          <Button
            variant="outline-secondary"
            onClick={() => setShowAddNewMethodCard(false)}
            className="my-security-card-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!tfaMethod}
            onClick={() => {
              // Add new TFA method for selected method
              setShowAddNewMethodCard(false);
              setTfaMethod("");
            }}
            className="my-security-card-btn"
          >
            Add
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <div className="my-security-container">
      {showTfaCard ? renderTfaCard() : (
        <Card className="my-security-card">
          <Card.Header className="my-security-card-header">
            <h3>Two-factor Authentication</h3>
</Card.Header>
<Card.Body className="my-security-card-body">
<p>
Enable two-factor authentication for an extra layer of security
when signing in.
</p>
<Button
           variant="primary"
           onClick={handleTfaEnable}
           className="my-security-card-btn"
         >
Enable
</Button>
{showAddNewMethodCard && renderAddNewMethodCard()}
</Card.Body>
<Card.Footer className="my-security-card-footer">
<Button
           variant="outline-secondary"
           onClick={handleAddNewMethod}
           className="my-security-card-btn"
         >
Add new method
</Button>
</Card.Footer>
</Card>
)}

</div>
);
      }

  
  export default MySecurityApp;
  