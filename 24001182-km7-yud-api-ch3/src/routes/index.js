const express = require("express");
const carRouter = require("./car");
const { rootResponse } = require("../utils/response");
const router = express.Router();

router.use("/cars", carRouter);
// router.use("/", rootResponse);
module.exports = router;
