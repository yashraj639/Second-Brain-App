import express from "express";
import { public_link, share } from "../controllers/link.controller.js";
import middleware from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { shareSchema } from "../models/share.model.js";
import { hashSchema } from "../models/hash.model.js";

const router = express.Router();

router.post("/share", middleware, validate(shareSchema), share);

router.get("/:hash", validate(hashSchema), public_link)

export default router;