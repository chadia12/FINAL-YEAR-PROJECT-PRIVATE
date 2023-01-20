import express, { Router } from "express";
import { getFeedPosts, getUserPosts, likePost, addComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


//READ
router.get("/", verifyToken, getFeedPosts);
//elevent posts
router.get("/:userId/posts" ,verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:postId", verifyToken, addComment);
 export default router;