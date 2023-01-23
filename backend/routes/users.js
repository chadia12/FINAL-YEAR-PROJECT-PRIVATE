import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    forgotpassword,
    getAllUsers
} from "../controllers/users.js";
 import { verifyToken } from "../middleware/auth.js";

 const router = express.Router();

 //READ
router.get("/search",verifyToken, getAllUsers)
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken , getUserFriends);


//UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

//FORGOT PASSWORD
router.patch("", forgotpassword);


export default router;