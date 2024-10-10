import mongoose from "mongoose";
// const AutoIncrement = require('mongoose-squence')(mongoose);
import AutoIncrement from 'mongoose-sequence'; 
const emailSchema = new mongoose.Schema({
    sendID: {
        type: Number,
    },
    managerID: {
        type: String,
        required: true,
    },
    doctorID: {
        type: String,
        reqrequireduire: true,
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
});
emailSchema.plugin(AutoIncrement(mongoose), { inc_field: 'sendID' });
// module.exports = mongoose.model('Email', emailSchema);
export const sendappointment = mongoose.model("Email", emailSchema);

export default sendappointment;