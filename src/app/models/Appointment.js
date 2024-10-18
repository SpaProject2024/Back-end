import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Appointment = new Schema(
  {
    appointmentDate: { type: Date },
    status: { type: String },
    services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    doctor: { type: Schema.Types.ObjectId, ref: "doctors" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const appointment = mongoose.model("Appointment", Appointment);

export default appointment;
