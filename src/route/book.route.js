import { getBook } from "../controller/book.controller.js";
import { Router } from "express";
const router = Router();
router.route("/book").get(getBook);
export default router;
