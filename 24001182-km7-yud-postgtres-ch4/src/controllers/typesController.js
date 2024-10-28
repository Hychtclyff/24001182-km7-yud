const { successResponse } = require("../utils/response");
const typeService = require("../services/typesService");

exports.getTypes = async (req, res, next) => {
  try {
    const data = await typeService.getTypes(
      req.query?.type_name // Ambil nama tipe dari query
    );
    successResponse(res, data);
  } catch (error) {
    next(error); // Tangani error jika terjadi
  }
};

exports.createType = async (req, res, next) => {
  try {
    const data = await typeService.createType(req.body);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.updateType = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  try {
    const data = await typeService.updateType(id, req.body);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};

exports.deleteTypeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await typeService.deleteTypeById(id);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};
