import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        comment: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rate: {
            type: String,
            required: true
        },
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            default: null
        },

    },
    { timestamps: true }
);

const product = mongoose.model("reviews", reviewSchema);

export default product;
