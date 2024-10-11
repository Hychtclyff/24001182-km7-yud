const express = require("express");
const carRouter = require("./car");
const router = express.Router();
const { rootResponse } = require("../utils/response");

router.get("/", rootResponse);

router.use("/cars", carRouter);
module.exports = router;
