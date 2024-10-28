const { successResponse } = require("../utils/response");
const availableService = require("../services/availablesService");

exports.getAvailable = async (req, res, next) => {
  // Panggil service untuk mendapatkan daftar ketersediaan
  const data = await availableService.getAvailable();
  successResponse(res, data);
};

exports.createAvailable = async (req, res, next) => {
  const data = await availableService.createAvailable(req.body);
  successResponse(res, data);
};

exports.updateAvailable = async (req, res, next) => {
  try {
    // Dapatkan id dari params dan konversi ke integer
    const id = parseInt(req.params.id, 10);

    // Pastikan id adalah angka
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }

    // Panggil service untuk memperbarui ketersediaan
    const data = await availableService.updateAvailable(id, req.body);
    successResponse(res, data);
  } catch (error) {
    next(error); // Lanjutkan ke middleware penanganan kesalahan
  }
};

exports.deleteAvailableById = async (req, res, next) => {
  try {
    // Dapatkan id dari params
    const id = parseInt(req.params.id, 10);

    // Pastikan id adalah angka
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }

    // Panggil service untuk menghapus ketersediaan
    const data = await availableService.deleteAvailableById(id);
    successResponse(res, data);
  } catch (error) {
    next(error); // Lanjutkan ke middleware penanganan kesalahan
  }
};
