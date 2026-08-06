const express = require("express");
const router = express.Router();

const companyController = require("../controllers/companyController");

router.get("/", companyController.getCompany);

module.exports = router;