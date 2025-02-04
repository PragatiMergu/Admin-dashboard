import express from "express";
import {
  deleteProfile,
  editprofile,
  home,
  login,
  profile,
  register,
  verifyToken,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.get("/home", verifyToken, home);
router.patch("/editprofile", verifyToken, editprofile);
router.delete("/profile", verifyToken, deleteProfile);

export default router;
