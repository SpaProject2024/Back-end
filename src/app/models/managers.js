import mongoose from "mongoose";

// Định nghĩa schema cho TestApi (Doctors)
const managersSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        managerID: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        numberPhone: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        birthday: {
            type: Date,
            required: true,
        },
        roleID: {
            type: String,
            required: true,
        },
        workingtime: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

// Pre-save validation for required fields
managersSchema.pre("save", function (next) {
    if (!this.fullName || !this.email || !this.password) {
        const err = new Error("Full Name, Email, and Password are required");
        return next(err);
    }
    next();
});

// Post-save hook for logging
managersSchema.post("save", function (doc) {
    console.log("Manager saved successfully:", doc);
});

const managers = mongoose.model("managers", managersSchema);

export default managers;
