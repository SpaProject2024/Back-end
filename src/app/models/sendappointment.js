const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-squence')(mongoose);

const emailSchema = new mongoose.Schema({
    sendID: {
        type: Number,
    },
    managerID: {
        type: String,
        require: true,
    },
    doctorID: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    datesent: {
        type: Date,
        require: Date.now,
    },
});
emailSchema.plugin(AutoIncrement, {inc_filed:'sendID'});
module.export = mongoose.model('Email', emailSchema);