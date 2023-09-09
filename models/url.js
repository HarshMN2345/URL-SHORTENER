const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: Number
    }]
}, {
    timestamps: true
});


URL= mongoose.model('Url', urlSchema);
module.exports = URL;
