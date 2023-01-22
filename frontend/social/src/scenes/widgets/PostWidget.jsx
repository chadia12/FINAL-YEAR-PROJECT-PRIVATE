import {
   ChatBubbleOutlineOutlined,
   FavoriteBorderOutlined,
   FavoriteOutlined,
 } from "@mui/icons-material";
 import HighlightOffIcon from '@mui/icons-material/HighlightOff';
 import { Box, Divider, IconButton, Typography, useTheme,Button,InputBase } from "@mui/material";
 import FlexBetween from "components/FlexBetween";
 import Friend from "components/Friend";
 import WidgetWrapper from "components/WidgetWrapper";
 import { useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { setPost, setPosts } from "state";
 
 
 
 const PostWidget = ({
   postId,
   postUserId,
   name,
   description,
   location,
   picturePath,
   userPicturePath,
   likes,
   comments,
 }) => {
   const [isComments, setIsComments] = useState(false);
   const dispatch = useDispatch();
   const token = useSelector((state) => state.token);
   const loggedInUserId = useSelector((state) => state.user._id);

  //  const posts = useSelector((state) => state.posts);

   const isLiked = Boolean(likes[loggedInUserId]);
   const likeCount = Object.keys(likes).length;
    const [isAddcommtbtn, setisAddcommtbtn] = useState(false)
   const [commentinput, setCommentInput] = useState({message:" "});
   const { palette } = useTheme();
   const main = palette.neutral.main;
   const primary = palette.primary.main;
   
 
   const patchLike = async () => {
     const response = await fetch(`http://localhost:3002/posts/${postId}/like`, {
       method: "PATCH",
       headers: {
         Authorization: `Bearer ${token}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ userId: loggedInUserId }),
     });
     const updatedPost = await response.json();
     dispatch(setPost({ post: updatedPost }));
   };

   const patchCommt = async () => {
    const response = await fetch(`http://localhost:3002/posts/${postId}`, {
      method: "PATCH",
      body:JSON.stringify({message:commentinput.message}),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      
    });

    const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
  };


   const displayComment =()=>{
     setisAddcommtbtn(!isAddcommtbtn)
   }

  
   


const handleGetPosts = async()=>{
 const response = await fetch("http://localhost:3002/posts", {
  method: "GET",
  headers: { Authorization: `Bearer ${token}` }
 });
 const data = await response.json();
 dispatch(setPosts({posts: data}))

}

const handleComment = (event)=>{
  event.preventDefault();
  patchCommt();
  setisAddcommtbtn(!isAddcommtbtn);
  setCommentInput("")
  handleGetPosts();
}

const handleDelete = async ()=>{
  const response = await fetch(`http://localhost:3002/posts/${postUserId}/${postId}`,{
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"},
  });
  const deletedPost = await response.json();
  handleGetPosts();

}


   return (
     <WidgetWrapper m="2rem 0">
       <Friend
         friendId={postUserId}
         name={name}
         subtitle={location}
         userPicturePath={userPicturePath}
       />
       <Typography color={main} sx={{ mt: "1rem" }}>
         {description}
       </Typography>
       {picturePath && (
         <img
           width="100%"
           height="auto"
           alt="post"
           style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
           src={`http://localhost:3002/assets/${picturePath}`}
         />
       )}
       <FlexBetween mt="0.25rem">
         <FlexBetween gap="1rem">
           <FlexBetween gap="0.3rem">
             <IconButton onClick={patchLike}>
               {isLiked ? (
                 <FavoriteOutlined sx={{ color: primary }} />
               ) : (
                 <FavoriteBorderOutlined />
               )}
             </IconButton>
             <Typography>{likeCount}</Typography>
           </FlexBetween>
 
           <FlexBetween gap="0.3rem">
             <IconButton onClick={() => setIsComments(!isComments)}>
               <ChatBubbleOutlineOutlined />
             </IconButton>
             <Typography>{comments.length}</Typography>
           </FlexBetween>
         </FlexBetween>
         <IconButton onClick={handleDelete}>
           < HighlightOffIcon />
         </IconButton>
       </FlexBetween>
       {isComments && (
         <Box mt="0.5rem">
           {comments.map((comment, i) => (
             <Box key={`${name}-${i}`}>
               <Divider />
               <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                 {comment}
               </Typography>
             </Box>
           ))}
           <Divider />
         </Box>
       )}
<FlexBetween gap="0.75rem" >
       <Button
          onClick={displayComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            mt:"1.5rem"
          }}
        >
          ADD Comment
        </Button>
        </FlexBetween>
       {isAddcommtbtn &&
          <FlexBetween>
          <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="Type your comment..."
          onChange={(e)=>setCommentInput({ ...commentinput, [e.target.name]: e.target.value })}
          value={commentinput.message}
          name="message"
          sx={{
            width: "90%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
          <Button
         onClick={handleComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          ADD
        </Button>
      </FlexBetween>
      </FlexBetween>
       }
     </WidgetWrapper>
   );
 };
 

 export default PostWidget;