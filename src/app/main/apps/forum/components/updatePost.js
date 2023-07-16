import { useEffect, useState } from "react";
import { api } from "src/app/auth/services/api";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import CardHeader from "@mui/material/CardHeader";








function UpdatePost({ post, handleClose, onUpdatePost }) {
  const user = useSelector(selectUser);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [POST, setPost] = useState({ message: post.message });

  useEffect(() => {
    setPost(post);
    if (post.media) {
        console.log(post.media.preview)

      if (post.media.type === "image") {
        setImage(post.media.preview);
      } else if (post.media.type === "video") {
        setVideo(post.media.preview);
      }
    }
  }, [post]);
  console.log(post);

  const dispatch = useDispatch();

  const handleMediaChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      console.log(fileUrl)
      if (selectedFile.type === "video/mp4") {
        setVideo(fileUrl);
      } else {
        setImage(fileUrl);
      }
      setFile(selectedFile);
    }
  };

  const handleButtonClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = handleMediaChange;
    input.click();
  };

  const handleMessage = (value) => {
    setPost((prevPost) => ({ ...prevPost, message: value }));
  };


 


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!POST.message) {
      dispatch(showMessage({ message: "Message is required" }));
      return;
    }
  
    let media = null; 
    console.log(file)
    if (file) { 
      const mediaType = file.type === "video/mp4" ? "video" : "image"; 
      media = { type: mediaType, preview:URL.createObjectURL(file) }; 
    }else{ media=post.media
    }
    try {
      const formData = new FormData();
      formData.append("message", POST.message);
  
      if (file) {
        formData.append("media", file);
        formData.append("type", media.type);
  
        const res = await api.put(`/api/post/${post._id}`, formData);
        console.log(res.data);
        const updatedPost = { ...post, message: POST.message, type: media.type, media };
        onUpdatePost(updatedPost);

      } else {
        const res = await api.put(`/api/post/${post._id}`, { message: POST.message });
        console.log(res.data);
        const updatedPost = { ...post, message: POST.message, media };
        onUpdatePost(updatedPost);

      }
  
      handleClose();
    } catch (error) {
      console.error(error);
      dispatch(showMessage({ message: "Something went wrong" }));
    }
  };
  

  return (
    <>
     <form onSubmit={handleSubmit}>
  <Card>
  <CardHeader
                className="px-32 pt-24"
                avatar={<Avatar aria-label="Recipe" src={post.user.profilePicture} />}
                title={
                  <span className="flex items-center space-x-8">
                    <Typography className="font-normal" color="secondary.main" paragraph={false}>
                      {post.user.displayName}
                    </Typography>
                  </span>
                }
                subheader={moment(post.time).fromNow()}
              />
    <CardContent>
      <div className="border rounded-lg p-4 mb-4">
        <textarea id="post" name="post" rows="4" value={POST.message} onChange={(e) => handleMessage(e.target.value)} className="w-full border-0 focus:outline-none resize-none" />
        {image && <img src={image} alt="" className="mt-2" />}
        {video && <video src={video} className="mt-2" />}
      </div>
      <div className="flex items-center mb-4">
       
        <>
          <IconButton aria-label="Add photo" onClick={() => handleButtonClick("image")}>
            <FuseSvgIcon size={20}>heroicons-solid:photograph</FuseSvgIcon>
          </IconButton>
        </>
        <>
          <IconButton aria-label="Add video" onClick={() => handleButtonClick("video")}>
            <FuseSvgIcon size={20}>heroicons-solid:video-camera</FuseSvgIcon>
          </IconButton>
        </>
      </div>
    </CardContent>
    <CardActions>
      <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  aria-label="post"
                  onClick={handleSubmit}
                >
                  Save Post
                </Button>
    </CardActions>
  </Card>
</form>


    </>
  );
}

export default UpdatePost;
