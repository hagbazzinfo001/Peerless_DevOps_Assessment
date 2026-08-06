const express = require("express");

const router = express.Router();

const infoController = require("../controllers/infoController");
const companyRoutes = require("./company");

router.get("/", infoController.home);
router.get("/health", infoController.health);
router.get("/version", infoController.version);
router.get("/info", infoController.info);

router.use("/company", companyRoutes);

module.exports = router;