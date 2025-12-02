import { model, Schema, Types } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio', 'note', 'document', 'tweet', 'youtube', 'link']; // Extend as needed

const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: { type: [String], default: [], ref: 'Tag' },
    userId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    metadata: {
        title: String,
        description: String,
        image: String
    }
});


export const Content = model("Content", contentSchema);
