const { z, optional } = require("zod");
const { BadRequestError } = require("../utils/request");

function toBoolean(str) {
  return str === "true"; // Kembalikan true jika str "true", dan false jika "false"
}


exports.validateGetManufactureById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};


exports.validateCreateManufacture = (req, res, next) => {
  // Parsing dan konversi tipe data jika diperlukan
  req.body.year_establish = parseInt(req.body.year_establish);

  // Validasi body schema sesuai dengan skema tabel Manufacture
  const validateBody = z.object({
    manufacture_name: z.string().min(1, "Nama manufaktur tidak boleh kosong"), // Nama manufaktur harus ada
    manufacture_region: z
      .string()
      .min(1, "Wilayah manufaktur tidak boleh kosong"), // Wilayah manufaktur harus ada
    year_establish: z
      .number()
      .int()
      .positive()
      .max(
        new Date().getFullYear(),
        "Tahun harus tidak lebih dari tahun sekarang"
      ), // Tahun harus angka bulat positif dan tidak lebih dari tahun sekarang
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

exports.validateUpdateManufacture = (req, res, next) => {
  req.body.year_establish = parseInt(req.body.year_establish);

  // Validasi body schema sesuai dengan skema tabel Manufacture
  const validateBody = z.object({
    manufacture_name: z.string(), // Nama manufaktur harus ada
    manufacture_region: z.string(), // Wilayah manufaktur harus ada
    year_establish: z
      .number()
      .int()
      .positive()
      .max(
        new Date().getFullYear(),
        "Tahun harus tidak lebih dari tahun sekarang"
      ), // Tahun harus angka bulat positif dan tidak lebih dari tahun sekarang
  });

  // Validasi terhadap body
  try {
    validateBody.parse(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: error.errors });
  }

  next(); // Melanjutkan ke middleware beddleware berikutnya jika semua validasi berhasil
};

exports.validateDeleteManufactureById = (req, res, next) => {
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
