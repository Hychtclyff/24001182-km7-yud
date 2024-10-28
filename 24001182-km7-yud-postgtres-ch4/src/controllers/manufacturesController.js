const { successResponse } = require("../utils/response");
const manufactureService = require("../services/manufacturesService");

exports.getManufactures = async (req, res, next) => {
  // Panggil service atau usecase untuk Manufacture
  const data = await manufactureService.getManufactures(
    req.query?.manufacture_name,
    req.query?.manufacture_region,
    req.query?.year_establish
  );

  successResponse(res, data);
};
exports.createManufacture = async (req, res, next) => {
  const data = await manufactureService.createManufacture(req.body, req.files);
  successResponse(res, data);
};


exports.getManufactureById = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const data = await manufactureService.getManufactureById(id);
    successResponse(res, data);
  } catch (error) {
    next(error); 
  }
};

exports.updateManufacture = async (req, res, next) => {
  try {
    // Dapatkan id dari params dan konversi ke integer
    const id = parseInt(req.params.id, 10);

    // Pastikan id adalah angka
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }

    // Panggil service untuk memperbarui manufacture
    const data = await manufactureService.updateManufacture(id, req.body);
    successResponse(res, data);
  } catch (error) {
    next(error); // Lanjutkan ke middleware penanganan kesalahan
  }
};

exports.deleteManufactureById = (req, res, next) => {
  // Dapatkan id dari params
  const { id } = req.params;
  const data = manufactureService.deleteManufactureById(id);
  successResponse(res, data);
};
