const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());
app.use(logger);
// Routes
const routes = require("./routes");
app.use("/", routes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);
module.exports = app;