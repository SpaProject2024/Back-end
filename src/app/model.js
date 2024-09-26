const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Service = new Schema({
  name: String,
  time: Number,
  price: Number,
  description: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', Service);