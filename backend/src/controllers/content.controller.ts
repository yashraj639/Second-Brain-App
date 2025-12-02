import express from "express";
import { Content } from "../models/content.model.js";
import * as z from "zod";
import { Tag } from "../models/tag.model.js";
import { getLinkPreview } from "../utils.js";

export const create_content = async (req: express.Request, res: express.Response) => {

    const contentSchema = z.object({
        link: z.string().url(),
        type: z.enum(['image', 'video', 'article', 'audio', 'note', 'document', 'tweet', 'youtube', 'link']),
        title: z.string(),
        tags: z.array(z.string()).optional()
    });

    const parsed = contentSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error });
    }

    const { link, type, title, tags } = parsed.data;
    const userId = req.user!.id;

    let metadata = {};
    if (type === 'link') {
        metadata = await getLinkPreview(link);
    }

    const content = await Content.create({
        link,
        type,
        title,
        tags: tags || [],
        metadata,
        userId
    });

    return res.status(201).json({
        message: "Content created",
        content
    });
};

export const fetch_content = async (req: express.Request, res: express.Response) => {
    const userId = req.user!.id;

    const contents = await Content.find({ userId }).populate("userId", "name").sort({ createdAt: -1 });

    return res.status(201).json({
        message: "Content fetched",
        contents
    });
};

export const fetch_content_by_id = async (req: express.Request, res: express.Response) => {
    const userId = req.user!.id;
    const contentId = req.params.id;

    const content = await Content.findOne({ _id: contentId, userId });

    if (!content) {
        return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
        message: "Content fetched",
        content
    });
};

export const update_content = async (req: express.Request, res: express.Response) => {
    const userId = req.user!.id;
    const contentId = req.params.id;

    const content = await Content.findOneAndUpdate(
        { _id: contentId, userId },
        req.body,
        { new: true }
    );

    if (!content) {
        return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
        message: "Content updated",
        content
    });
};

export const delete_content = async (req: express.Request, res: express.Response) => {
    const userId = req.user!.id;
    const contentId = req.params.id;

    const content = await Content.findOneAndDelete({ _id: contentId, userId });

    if (!content) {
        return res.status(404).json({ message: "Content not found" });
    }

    return res.status(200).json({
        message: "Content deleted",
        content
    });
};