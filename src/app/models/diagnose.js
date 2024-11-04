import mongoose from "mongoose";
const Schema = mongoose.Schema;

const diagoseSchema = new Schema(
    {
        content: { type: String, required: true }, // Nội dung phải có
        appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment", required: true }, // appointmentId bắt buộc
        userId: { type: Schema.Types.ObjectId, ref: "User"}, // appointmentId bắt buộc
        productId: { type: Schema.Types.ObjectId, ref: "product", default: null }, // productId có thể để trống
    },
    { timestamps: true }
);

const diagnose = mongoose.model("diagnose", diagoseSchema);

export default diagnose;
