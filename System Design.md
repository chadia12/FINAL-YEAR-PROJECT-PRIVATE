# Project: Build an application for social medial App(responsive)

## System Design Report

## Database collections

- User (firstName, lastName, email, password, profilePicture, friends, location, occupation)
- Post (userId, firstName, lastName,picture, likes, comments)

## Backend

- get("/:id", verifyToken, getUser);
- get("/:id/friends", verifyToken , getUserFriends);
- patch("/:id/:friendId", verifyToken, addRemoveFriend);
- get("/", verifyToken, getFeedPosts);
- get("/:userId/posts" ,verifyToken, getUserPosts);
- patch("/:id/like", verifyToken, likePost);
- post("/login", login);
- post("/auth/register", upload.single("picture"), register)
- post("/posts", verifyToken, upload.single("picture"), createPost )

## front end

### Page and component

- HomePage
- LoginPage
- Navbar
- profilePage
- Widgets (Advert, friendList, MyPOST, Posts, User)
