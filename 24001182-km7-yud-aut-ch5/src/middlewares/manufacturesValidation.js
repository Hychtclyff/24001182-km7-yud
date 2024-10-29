const { z, optional } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateManufacture = (req, res, next) => {
  req.body.year_establish = parseInt(req.body.year_establish);

  const validateBody = z.object({
    manufacture_name: z.string(),
    manufacture_region: z.string(),
    year_establish: z.number().int().positive(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

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

exports.validateUpdateManufacture = (req, res, next) => {
  req.body.year_establish = parseInt(req.body.year_establish);

  const validateBody = z.object({
    manufacture_name: z.string(),
    manufacture_region: z.string(),
    year_establish: z.number().int().positive(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};

exports.validateDeleteManufactureById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
