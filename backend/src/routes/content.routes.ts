import express from "express";
import { create_content, delete_content, fetch_content, fetch_content_by_id, update_content } from "../controllers/content.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, create_content);

router.get("/fetch", authMiddleware, fetch_content);

router.get("/fetch/:id", authMiddleware, fetch_content_by_id);

router.put("/update/:id", authMiddleware, update_content);

router.delete("/delete/:id", authMiddleware, delete_content);

export default router;
