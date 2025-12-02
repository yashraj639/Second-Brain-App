import { model, Schema } from "mongoose";

const linkSchema = new Schema({
    hash: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
});

export const Link = model("Link", linkSchema);