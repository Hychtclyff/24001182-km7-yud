const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateTransmission = (req, res, next) => {
  // Validasi body schema sesuai dengan skema tabel Transmission
  const validateBody = z.object({
    transmission_name: z.string().min(1, "Nama transmisi tidak boleh kosong"), // Nama transmisi harus ada
  });

  // Validasi terhadap body
  try {
    validateBody.parse(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next(); // Melanjutkan ke middleware berikutnya
};

exports.validateUpdateTransmission = (req, res, next) => {
  const validateBody = z.object({
    transmission_name: z.string().optional(), // Field opsional untuk nama transmisi
  });

  // Validasi body (Data yang dikirim di dalam body request)
  try {
    validateBody.parse(req.body); // Memastikan body request valid sesuai schema
  } catch (error) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: error.errors,
    });
  }

  next(); // Melanjutkan ke middleware berikutnya jika validasi berhasil
};

exports.validateDeleteTransmissionById = (req, res, next) => {
  // Buat skema validasi
  const validateParams = z.object({
    id: z.string(), // Validasi ID tidak boleh kosong
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // Jika validasi gagal, kembalikan pesan kesalahan
    throw new BadRequestError(result.error.errors);
  }

  next();
};
