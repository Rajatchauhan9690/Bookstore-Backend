import { handleContact } from "../controller/contact.controller.js";
import { Router } from "express";
const router = Router();
router.route("/contact").post(handleContact);
export default router;
