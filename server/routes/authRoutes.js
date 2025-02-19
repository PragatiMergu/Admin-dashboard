import express from "express";
import {
 
  checkRegistration,
  deleteProfile,
  editprofile,
  email,
  home,
  login,
  profile,
 
  
  signup,
  verifyToken,
} from "../controller/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.get("/home", verifyToken, home);
router.patch("/editprofile", verifyToken, editprofile);
router.delete("/profile", verifyToken, deleteProfile);
router.post("/register",verifyToken,email);
router.get("/home", verifyToken, checkRegistration);
export default router;
