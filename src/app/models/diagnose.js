import mongoose from "mongoose";
const Schema = mongoose.Schema;

const diagoseSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        appointmentId: {
            type: Schema.Types.ObjectId,
            ref: "Appointment",
            required: true
        }, 
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
            default: null
        },
    },
    { timestamps: true }
);

const diagnose = mongoose.model("diagnose", diagoseSchema);

export default diagnose;
