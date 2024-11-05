import mongoose from "mongoose";
const Schema = mongoose.Schema;
const emailSchema = new Schema({
    sendID: {
        type: Number,
    },
    managerID: {
        type: Schema.Types.ObjectId, ref: "manager",
        required: true
    },
    doctorID: {
        type: Schema.Types.ObjectId, ref: "Doctor",
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    datesent: {
        type: Date,
        default: Date.now,
    },
},
    { timestamps: true }
);
export const sendappointment = mongoose.model("sendapplications", emailSchema);

export default sendappointment;