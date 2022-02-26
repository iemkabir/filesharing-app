require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose
        .connect(process.env.MANGO_URL)
        .then(() => console.log('Connected Successfully'))
        .catch((err) => console.error('Not Connected', err));
}

module.exports = connectDB;