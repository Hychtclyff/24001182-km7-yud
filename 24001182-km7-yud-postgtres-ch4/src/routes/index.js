const express = require("express");
const carRouter = require("./car");
const manufactureRouter = require("./manufacture");
const transmissionsRouter = require("./transmissions");
const typesRouter = require("./types");
const availablesRouter = require("./availables");

const router = express.Router();
const { rootResponse } = require("../utils/response");

router.get("/", rootResponse);

router.use("/cars", carRouter);
router.use("/manufactures", manufactureRouter);
router.use("/transmissions", transmissionsRouter);
router.use("/types", typesRouter);
router.use("/availables", availablesRouter);

module.exports = router;
