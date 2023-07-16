/* eslint-disable jsx-a11y/media-has-caption */
import { MenuItem, Dialog } from "@material-ui/core";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { api } from "src/app/auth/services/api";
import Avatar from "@mui/material/Avatar";
import { selectUser } from "app/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Menu } from "@mui/material";
import { showMessage } from "app/store/fuse/messageSlice";
import UpdatePost from "./updatePost";
import UpdateComment from "./UpdateComment";

function Post() {

  const [selectedComment, setSelectedComment] = useState(null);

const handleEditComment = (comment) => {
  setSelectedComment(comment);
};

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  console.log(user)

  const [moreMenuEl, setMoreMenuEl] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState(null);
  const [POST, setPost] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/api/post").then((res) => {
      setData(res.data);
    });
  }, []);

  const [menuStates, setMenuStates] = useState({});

  const handleMoreMenuClick = (event, postId) => {
    setMenuStates(prevState => ({ ...prevState, [postId]: event.currentTarget }));
  };
  
  const handleMoreMenuClose = (postId) => {
    setMenuStates(prevState => ({ ...prevState, [postId]: null }));
  };

  const handleDeletePost = (id) => {
    api
      .delete(`/api/post/${id}`)
      .then((response) => {
        setData(data.filter((post) => post._id !== response.data._id));
        handleMoreMenuClose();
      })
      .catch((error) => {
        dispatch(showMessage({ message: "something went wrong" }));
      });
  };

  const handleMediaChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
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

  /** ADD POST */

  const onSubmit = () => {
    console.log(file);

    const formData = new FormData();
    formData.append("message", POST);
    formData.append("media", file);
    api
      .post("api/post", formData)
      .then((res) => {
        setData((prevData) => [res.data, ...prevData]);
        setPost("");
        setImage(null);
        setFile(null);
      })
      .catch((error) => {
        dispatch(showMessage({ message: "something went wrong" }));
      });
  };

  const onSubmitComment = (id) => {
    const postId = typeof id === "object" ? id.toString() : id;
    api
      .post(`api/comment/${postId}`, { message: commentInputs[postId] })
      .then((res) => {
        setCommentInputs(data.filter((post) => post._id !== postId));

        setData((prevData) => {
          const newData = prevData.map((element) => {
            if (element?._id === res.data?._id) {
              return res.data;
            }
            return element;
          });
          return newData;
        });
      })
      .catch((error) => {
        dispatch(showMessage({ message: "something went wrong" }));
      });
  };

  const handleInputChange = (e) => {
    setPost(e.target.value);
  };
  const handleInputComment = (event, postId) => {
    const newCommentInputs = { ...commentInputs };
    newCommentInputs[postId] = event.target.value;
    setCommentInputs(newCommentInputs);
  };

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const handleLikeClick = (id) => async () => {
    try {
      const res = await api.post(`/api/like/${id}`);
      setData((prevData) => {
        const newData = prevData.map((post) => {
          if (post?._id === res.data.updatedPost?._id) {
            return res.data.updatedPost;
          }
          return post;
        });
        return newData;
      });
    } catch (err) {
      dispatch(showMessage({ message: "something went wrong" }));
    }
  };

  // delete comment

  const handleDeleteComment = (id, postId) => {
    api
      .delete(`/api/comment/${id}`)
      .then((response) => {
        console.log("comment deleted successfully!");

        // Remove the comment from the data array
        const newData = data.map((post) => {
          if (post._id === postId) {
            post.comments = post.comments.filter((comment) => comment._id !== id);
          }
          return post;
        });

        // Update the state with the updated data array
        setData(newData);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("You are not authorized to delete this comment");
        } else {
          console.error("Error deleting post:", error);
        }
      });
  };

  const updatePost = (updatedPost) => {
    console.log(updatedPost);
    setData(
      data.map((post) => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        }
        return post;
      })
    );
  };
  const updateComment = (updatedComment) => {
    console.log(updatedComment.post);
    setData(
      data.map((post) => {
        if (post._id === updatedComment.post) {
          post.comments = post.comments.map((comment) => {
            if (comment._id === updatedComment._id) {
              return updatedComment;
            }
            return comment;
          });
        }
        return post;
      })
    );
  };
  

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-10/12">
      <div className="md:flex">
        <div className="flex flex-col flex-1">
          <Card component={motion.div} variants={item} className="w-full overflow-hidden mb-32">
            <Input
              value={POST}
              onChange={handleInputChange}
              className="p-24 w-full"
              classes={{ root: "text-14" }}
              placeholder={`Hello ${user.data.displayName}! What's on your mind today?`}
              multiline
              rows="6"
              margin="none"
              disableUnderline
            />
            <Box
              className="card-footer flex items-center flex-row border-t-1 px-24 py-12"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
            >
              <div className="flex flex-1 items-center">
                <>
                  <IconButton aria-label="Add photo" onClick={() => handleButtonClick("image")}>
                    <FuseSvgIcon size={20}>heroicons-solid:photograph</FuseSvgIcon>
                  </IconButton>
                  {image && <img src={image} alt="" />}
                </>
                <>
                  <IconButton aria-label="Add video" onClick={() => handleButtonClick("video")}>
                    <FuseSvgIcon size={20}>heroicons-solid:video-camera</FuseSvgIcon>
                  </IconButton>
                  {video && <video src={video} />}
                </>
              </div>

              <div className="">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  aria-label="post"
                  onClick={onSubmit}
                >
                  Post
                </Button>
              </div>
            </Box>
          </Card>

          {data.map((post) => (
                      <Card component={motion.div} variants={item} key={post._id} className="mb-32">
                        <CardHeader
                          className="px-32 pt-24"
                          avatar={<Avatar aria-label="Recipe" src={post.user.profilePicture} />}
                          action={
                            user.data.id===post.user._id && (<div>
                              <IconButton
                                aria-owns={menuStates[post._id] ? `main-more-menu-${post._id}` : null}
                                aria-haspopup="true"
                                onClick={(event) => handleMoreMenuClick(event, post._id)}
                                size="large"
                              >
                                <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
                              </IconButton>
                             <Menu
                                id={`main-more-menu-${post._id}`}
                                anchorEl={menuStates[post._id]}
                                open={Boolean(menuStates[post._id])}
                                onClose={() => handleMoreMenuClose(post._id)}
                              >
                                <MenuItem onClick={handleModalOpen}>Edit post</MenuItem>
                                <Dialog open={modalOpen} onClose={handleModalClose}>
                                  <UpdatePost
                                    post={post}
                                    handleClose={handleModalClose}
                                    onUpdatePost={updatePost}
                                  />
                                </Dialog>
                                <MenuItem onClick={() => handleDeletePost(post._id)}>Delete post</MenuItem>
                              </Menu>
                            </div>)
                          }
                          title={
                            <span className="flex items-center space-x-8">
                              <Typography className="font-normal" color="secondary.main" paragraph={false}>
                                {post.user.displayName}
                              </Typography>
                            </span>
                          }
                          subheader={moment(post.time).fromNow()}
                        />

              <CardContent className="px-32">
                {post.message && (
                  <Typography component="p" className="mb-16">
                    {post.message}
                  </Typography>
                )}

                {post.type === "video" && post.media && (
                  <div>
                    <video width="640" height="360" controls>
                      <source src={video} type="video/mp4" />
                    </video>
                  </div>
                )}

                {post.type === "image" && post.media && (
                  <div>
                    <img src={`${post.media.preview}`} alt="post" />
                  </div>
                )}
              </CardContent>

              {post.likes.some((like) => like.user.displayName === user.data.displayName) ? (
                <CardActions disableSpacing className="px-32">
                  <Button
                    onClick={handleLikeClick(post._id)}
                    size="small"
                    aria-label="Add to favorites"
                  >
                    <FuseSvgIcon size={16} color="error">
                      heroicons-solid:heart
                    </FuseSvgIcon>
                    <Typography className="mx-4">Liked</Typography>
                    <Typography>({post.likes.length})</Typography>
                  </Button>
                </CardActions>
              ) : (
                <CardActions disableSpacing className="px-32">
                  <Button
                    onClick={handleLikeClick(post._id)}
                    size="small"
                    aria-label="Add to favorites"
                  >
                    <FuseSvgIcon size={16} color="action">
                      heroicons-outline:heart
                    </FuseSvgIcon>
                    <Typography className="mx-4">Like</Typography>
                    <Typography>({post.likes.length})</Typography>
                  </Button>
                </CardActions>
              )}

              <Box
                className="card-footer flex flex-col px-32 py-24 border-t-1"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
              >
                <div key="comment-list">
                  <div className="flex items-center">
                    <Typography>{post.comments.length} comments</Typography>
                    <FuseSvgIcon size={16} className="mx-4" color="action">
                      heroicons-outline:chevron-down
                    </FuseSvgIcon>
                  </div>
                  {post?.comments?.map((element, index) => (
                        <div key={element._id}>
                          <ListItem className="px-0 -mx-8">
                            <Avatar
                              alt={element.user.displayName}
                              src={element.user.profilePicture}
                              className="mx-8"
                            />
                            <ListItemText
                              className="px-4"
                              primary={
                                <div className="flex items-center space-x-8">
                                  <Typography
                                    className="font-normal"
                                    color="secondary"
                                    paragraph={false}
                                  >
                                    {element.user.displayName}
                                  </Typography>
                                  <Typography variant="caption">
                                    {moment(element.time).fromNow()}
                                  </Typography>
                                </div>
                              }
                              secondary={element.message}
                            />
                            {user.data.id===element.user._id && (<Button
                              aria-label="Delete"
                              size="small"
                              variant="outlined"
                              color="secondary"
                              style={{ border: "none" }}
                              className="ml-4"
                              onClick={() => handleDeleteComment(element._id, post._id)}
                            >
                              <FuseSvgIcon size={16} color="action">
                                heroicons-outline:trash
                              </FuseSvgIcon>
                            </Button>)}
                            {/* updatecomment */}
                            {user.data.id===element.user._id && (<IconButton aria-label="Edit" size="small" onClick={() => handleEditComment(element)}>
                                    <FuseSvgIcon size={16} color="action">
                                        heroicons-outline:pencil
                                      </FuseSvgIcon>
                                </IconButton>)}

                                <Dialog open={selectedComment !== null} onClose={() => setSelectedComment(null)}>
                                  {selectedComment && (
                                    <UpdateComment
                                      comment={selectedComment}
                                      handleClose={() => setSelectedComment(null)}
                                      onUpdateComment={updateComment}
                                    />
                                  )}
                                </Dialog>
                          </ListItem>
                        </div>
                      ))}

                </div>
                <div className="flex flex-auto -mx-4">
                  <Avatar className="mx-4" src={user.data.profilePicture} />
                  <div className="flex flex-col flex-1 mx-4 items-end">
                    <Paper className="w-full mb-16 shadow-0 border-1  overflow-hidden">
                      <Input
                        className="p-12 w-full"
                        classes={{ root: "text-13" }}
                        placeholder="Add a comment.."
                        onChange={(event) => handleInputComment(event, post._id)}
                        value={commentInputs[post._id] || ""}
                        multiline
                        rows="6"
                        margin="none"
                        disableUnderline
                      />
                    </Paper>
                    <div>
                      <Button
                        onClick={() => {
                          onSubmitComment(post._id);
                        }}
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Post comment
                      </Button>
                    </div>
                  </div>
                </div>
              </Box>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Post;
