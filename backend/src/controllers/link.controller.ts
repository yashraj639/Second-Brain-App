import express from "express";
import { Link } from "../models/link.model.js";
import { random } from "../utils.js";
import { Content } from "../models/content.model.js";
import { User } from "../models/user.model.js";

export const share = async (req: express.Request, res: express.Response) => {
    try {
        const share = req.body.share;
        const userId = req.user!.id;

        if (share === undefined) {
            return res.status(400).json({ message: "share field is required" });
        }

        if (share === true) {
            const existing = await Link.findOne({ userId });

            if (existing) {
                return res.status(200).json({ hash: existing.hash });
            }

            const hash = random(6);
            await Link.create({ hash, userId });

            return res.status(201).json({ hash });
        }


        if (share === false) {
            await Link.deleteOne({ userId });

            return res.status(200).json({ message: "Share disabled" });
        }
    }
    catch (error) {
        console.error("Error sharing link:", error);

        return res.status(500).json({ error: "Internal server error" });
    }
};

export const public_link = async (req: express.Request, res: express.Response) => {
    try {
        const hash = req.params.hash;

        if (!hash) {
            return res.status(400).json({ message: "Hash is required" });
        }

        const link = await Link.findOne({ hash }).lean();

        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        const [content, user] = await Promise.all([
            Content.find({ userId: link.userId }).lean(), User.findOne(link.userId).lean()
        ]);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            name: user.name,
            content: content ?? []
        });
    } catch (error) {
        console.error("Error fetching public link:", error);

        return res.status(500).json({ error: "Internal server error" });
    }
};