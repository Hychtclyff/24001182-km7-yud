const { z, optional } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    // id: z.string(),
    plate: z.string().optional(),
    manufacture: z.string().optional(),
    model: z.string().optional(),
    type: z.string().optional(),
    capacity: z.number().optional(),
    transmission: z.enum(["Manual", "Automatic"]).optional(),
    available: z.boolean().optional(),
    year: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetCarById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

function toBoolean(str) {
  return str === "true"; // Kembalikan true jika str "true", dan false jika "false"
}

exports.validateCreateCar = (req, res, next) => {
  req.body.capacity = parseInt(req.body.capacity);
  req.body.rentPerDay = parseInt(req.body.rentPerDay);
  req.body.available = toBoolean(req.body.available);
  req.body.availableAt = req.body.availableAt = new Date(
    req.body.availableAt
  ).toISOString();

  // Validation body schema
  const validateBody = z.object({
    // id: z.string().uuid(),
    plate: z.string(), // Minimal harus ada satu karakter pada plat nomor
    manufacture: z.string(), // Nama manufaktur harus ada
    model: z.string(), // Nama model harus ada
    image: z.string().optional(), // Validasi bahwa image adalah URL
    rentPerDay: z.number().int().positive(), // Harga sewa per hari harus angka positif
    capacity: z.number().int().positive(), // Kapasitas harus angka bulat positif
    description: z.string().optional(), // Deskripsi bersifat opsional
    availableAt: z.string().datetime(), // Format datetime ISO
    transmission: z.enum(["Automatic", "Manual"]), // Jenis transmisi hanya bisa "Automatic" atau "Manual"
    available: z.boolean(), // Ketersediaan berupa boolean
    type: z.string().min(1), // Tipe kendaraan tidak boleh kosong
    year: z.string(), // Tahun berupa angka bulat
    options: z.array(z.string()).nullable().optional(), // Array dari opsi dengan minimal 1 item
    specs: z.array(z.string()).nullable().optional(), // Array dari spesifikasi dengan minimal 1 item
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  req.body.capacity = parseInt(req.body.capacity);
  req.body.rentPerDay = parseInt(req.body.rentPerDay);
  req.body.available = toBoolean(req.body.available);
  req.body.availableAt = req.body.availableAt = new Date(
    req.body.availableAt
  ).toISOString();
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  // Validation body schema
  const validateBody = z.object({
    // id: z.string().uuid(),
    plate: z.string(), // Minimal harus ada satu karakter pada plat nomor
    manufacture: z.string(), // Nama manufaktur harus ada
    model: z.string(), // Nama model harus ada
    image: z.string().optional(), // Validasi bahwa image adalah URL
    rentPerDay: z.number().int().positive(), // Harga sewa per hari harus angka positif
    capacity: z.number().int().positive(), // Kapasitas harus angka bulat positif
    description: z.string().optional(), // Deskripsi bersifat opsional
    availableAt: z.string().datetime(), // Format datetime ISO
    transmission: z.enum(["Automatic", "Manual"]), // Jenis transmisi hanya bisa "Automatic" atau "Manual"
    available: z.boolean(), // Ketersediaan berupa boolean
    type: z.string().min(1), // Tipe kendaraan tidak boleh kosong
    year: z.string(), // Tahun berupa angka bulat
    options: z.array(z.string()).nullable().optional(), // Array dari opsi dengan minimal 1 item
    specs: z.array(z.string()).nullable().optional(), // Array dari spesifikasi dengan minimal 1 item
  });

  // The file is not required
  const validateFileBody = z
    .object({
      profilePicture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  // Make a validation schema
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};
