require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors');
const connectDB = require("./databse/dbconnect");
const port = process.env.PORT || 8000;

// Database connection
    connectDB();

    // Cors Setup
const corsOption = {
    origin: process.env.ALLOWED_DOMAINS
}

app.use(cors(corsOption));

// parse application/json
app.use(express.json());


// Template Engine
app.set('view engine', 'ejs');

// Serving Files Statics
app.use("/public", express.static("./public/"));

// Routes
app.use("/api/single", require("./routes/SaveFile"));
app.use("/files/share", require("./routes/DownloadPage"));
app.use("/files", require("./routes/DownloadFile"));
app.use("/api/send", require("./routes/SendEmail"));

app.listen(port, ()=>{
    console.log("listening to port");
})