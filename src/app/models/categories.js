import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
    {
        description: { type: String, required: true }, // Nội dung phải có
        name: { type: String, required: true }, // Nội dung phải có
    },
    { timestamps: true }
);

const categories = mongoose.model("categories", categorieSchema);

export default categories;
