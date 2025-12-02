import express from "express";
import { login, register, me } from "../controllers/auth.controller.js";
import middleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/users/register", register);

router.post("/users/login", login);

router.get("/users/me", middleware, me);

export default router;
