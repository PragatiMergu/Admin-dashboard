import express from "express";
import {
 

  deleteProfile,
  editprofile,
  email,
  expireOtp,
  home,
  login,
  loginemail,
  profile,
 
  
  removeotps,
 
  
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
router.post("/email",email);
router.delete("/expire-otp", expireOtp);
router.delete("/remove-otps",removeotps );

router.post("/loginemail",loginemail);

export default router;
