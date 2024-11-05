import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
    {
        description: { 
            type: String, 
            required: true 
        },
        name: { 
            type: String, 
            required: true 
        },
    },
    { timestamps: true }
);

const categories = mongoose.model("categories", categorieSchema);

export default categories;
