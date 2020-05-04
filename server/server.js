// Packages
const expressValidator = require("express-validator");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
require('express-async-errors')
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// Import methods
const { dbConnection, errorHandler} = require('./middleware/helpers');

// Database Connection
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(expressValidator());

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Ecom API",
            description: "ecommerce API information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:3001/api"]
        }
    },
    apis: ['./controllers/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
app.use("/api/admin-auth", require("./routes/admin_auth"));
app.use("/api/user-auth", require("./routes/user_auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/user", require("./routes/user"));

// Error handling middleware
app.use(function (err, req, res, next) {
    console.log('****SERVER_ERROR****');
    console.log(err);
    return res.status(500).json({
        error: errorHandler(err) || err.message || "Something went wrong!"
    });
})  


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
