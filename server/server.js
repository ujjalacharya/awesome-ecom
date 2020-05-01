// Packages
const expressValidator = require("express-validator");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Import methods
const { dbConnection} = require('./middleware/helpers');

// Database Connection
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

// Routes
app.use("/api/admin-auth", require("./routes/admin_auth"));

// Error handling middleware
app.use(function (err, req, res, next) {
    return res.status(500).json({
        error: "Something went wrong!"
    });
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
