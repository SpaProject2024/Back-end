import mongoose from "mongoose";
// import autoIncrement from "mongoose-sequence";
const supplierSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        numberphone: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

supplierSchema.pre("save", function (next) {
    if (!this.address || !this.name || !this.numberphone) {
        const err = new Error("Address, Name, Supplier are required");
        return next(err);
    }
    next();
});
supplierSchema.post("save", function (doc) {
    console.log("Supplier saved successfully", doc);
});

const suppliers = mongoose.model("suppliers", supplierSchema);
export default suppliers;









