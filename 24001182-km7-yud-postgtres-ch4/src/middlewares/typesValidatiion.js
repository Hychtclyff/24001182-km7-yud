const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateType = (req, res, next) => {
  // Validasi body schema sesuai dengan skema tabel Type
  const validateBody = z.object({
    type_name: z.string().min(1, "Nama tipe tidak boleh kosong"), // Nama tipe harus ada
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

exports.validateUpdateType = (req, res, next) => {
  // Validasi body schema sesuai dengan skema tabel Type
  const validateBody = z.object({
    type_name: z.string().min(1, "Nama tipe tidak boleh kosong"), // Nama tipe harus ada
  });

  // Validasi terhadap body
  try {
    validateBody.parse(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next(); // Melanjutkan ke middleware berikutnya jika semua validasi berhasil
};

exports.validateDeleteTypeById = (req, res, next) => {
  // Buat skema validasi untuk ID
  const validateParams = z.object({
    id: z.string(), // Validasi ID tipe sebagai string
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // Jika validasi gagal, kembalikan pesan kesalahan
    throw new BadRequestError(result.error.errors);
  }

  next();
};
