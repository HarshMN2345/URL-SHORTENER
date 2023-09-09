const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const connectmongo = async (url) => {
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectmongo;
