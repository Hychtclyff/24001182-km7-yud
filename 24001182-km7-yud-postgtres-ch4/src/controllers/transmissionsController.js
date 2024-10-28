const { successResponse } = require("../utils/response");
const transmissionService = require("../services/transmissionsService");

exports.getTransmissions = async (req, res, next) => {
  try {
    const data = await transmissionService.getTransmissions(
      req.query?.transmission_name // Ambil nama transmisi dari query
    );
    successResponse(res, data);
  } catch (error) {
    next(error); // Tangani error jika terjadi
  }
};

exports.createTransmission = async (req, res, next) => {
  try {
    const data = await transmissionService.createTransmission(req.body);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.updateTransmission = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const data = await transmissionService.updateTransmission(id, req.body);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.deleteTransmissionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await transmissionService.deleteTransmissionById(id);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};
