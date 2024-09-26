// Using Node.js `require()`
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/SpaProject");
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect fail!!!");
  }
}

module.exports = { connect };
