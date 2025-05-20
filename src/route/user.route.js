import {
  login,
  register,
  updateProfile,
  getProfile,
} from "../controller/user.controller.js";
import upload from "../middleware/upload.js";
import { Router } from "express";
const router = Router();
router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.put("/updateProfile", upload.single("profileImage"), updateProfile);
router.post("/getProfile", getProfile);

export default router;
