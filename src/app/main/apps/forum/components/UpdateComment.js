import { useEffect, useState } from "react";
import { api } from "src/app/auth/services/api";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import moment from "moment";
import CardHeader from "@mui/material/CardHeader";



function UpdateComment({ comment, handleClose, onUpdateComment }) {
  const user = useSelector(selectUser);

  const [POST, setPost] = useState({ message: comment.message });

  useEffect(() => {
    setPost(comment);
  
  }, [comment]);

  const dispatch = useDispatch();



  const handleMessage = (value) => {
    setPost((prevPost) => ({ ...prevPost, message: value }));
  };


 


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!POST.message) {
      dispatch(showMessage({ message: "Message is required" }));
      return;
    }
  

   
    try {

      const res = await api.put(`/api/comment/${comment._id}`, {message:POST.message});
      console.log(res.data);
      const updatedComment = { ...comment, message: POST.message};
      onUpdateComment(updatedComment);
      handleClose();
    } catch (error) {
      dispatch(showMessage({ message: "Something went wrong" }));
    }
  };
  

  return (
    <>
     <form onSubmit={handleSubmit}>
  <Card>
  <CardHeader
                className="px-32 pt-24"
                avatar={<Avatar aria-label="Recipe" src={comment.user.profilePicture} />}
                title={
                  <span className="flex items-center space-x-8">
                    <Typography className="font-normal" color="secondary.main" paragraph={false}>
                      {comment.user.displayName}
                    </Typography>
                  </span>
                }
                subheader={moment(comment.time).fromNow()}
              />

    <CardContent>
      <div className="border rounded-lg p-4 mb-4">
        <textarea id="post" name="post" rows="4" value={POST.message} onChange={(e) => handleMessage(e.target.value)} className="w-full border-0 focus:outline-none resize-none" />
     
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
                  Save comment
                </Button>
    </CardActions>
  </Card>
</form>


    </>
  );
}

export default UpdateComment;
