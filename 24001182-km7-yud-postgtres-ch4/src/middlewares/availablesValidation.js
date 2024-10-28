const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateAvailable = (req, res, next) => {
  // Validasi body schema sesuai dengan skema tabel Available
  const validateBody = z.object({
    available_status: z
      .string()
      .min(1, "Status ketersediaan tidak boleh kosong"), // Status ketersediaan harus ada
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

exports.validateUpdateAvailable = (req, res, next) => {
  // Validasi body schema sesuai dengan skema tabel Available
  const validateBody = z.object({
    available_status: z
      .string()
      .min(1, "Status ketersediaan tidak boleh kosong"), // Status ketersediaan harus ada
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

exports.validateDeleteAvailableById = (req, res, next) => {
  // Buat skema validasi
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // Jika validasi gagal, kembalikan pesan kesalahan
    throw new BadRequestError(result.error.errors);
  }

  next();
};
