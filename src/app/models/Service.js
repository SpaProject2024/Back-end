import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Service = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number }, 
    duration: { type: Number }, 
}, {
    timestamps: true,
});

const service = mongoose.model('Service', Service)

export default service;