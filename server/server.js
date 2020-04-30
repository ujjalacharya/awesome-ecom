// Packages
const expressValidator = require("express-validator");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Import methods
const { dbConnection, errorHandler } = require('./middleware/helpers');

// Database Connection
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin-auth", require("./routes/admin_auth"));

// Error handling middleware
app.use(function (err, req, res, next) {
    return res.status(500).json({
        error: errorHandler(err) || "Something went wrong!"
    });
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
