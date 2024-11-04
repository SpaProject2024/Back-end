import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        description: { type: String, required: true }, // Nội dung phải có
        name: { type: String, required: true }, // Nội dung phải có
        price: { type: String, required: true }, // Nội dung phải có    
        categorieID: { type: Schema.Types.ObjectId, ref: "categories", required: true }, // appointmentId bắt buộc
        supplyID: { type: Schema.Types.ObjectId, ref: "suppliers", default: null }, // productId có thể để trống

    },
    { timestamps: true }
);

const product = mongoose.model("product", productSchema);

export default product;
