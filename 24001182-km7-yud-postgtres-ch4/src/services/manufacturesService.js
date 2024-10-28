const manufactureRepository = require("../repositories/manufacturesRepository");
const { imageUpload } = require("../utils/image-kit");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getManufactures = (
  manufacture_name,
  manufacture_region,
  year_establish
) => {
  return manufactureRepository.getManufactures(
    manufacture_name,
    manufacture_region,
    year_establish
  );
};

exports.getManufactureById = (id) => {
  const manufacture = manufactureRepository.getManufactureById(id);

  if (!manufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  return manufacture;
};

exports.createManufacture = async (data) => {
  return manufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data) => {
  // find manufacture is exist or not (validate the data)
  const existingManufacture = await manufactureRepository.getManufactureById(
    id
  );
  if (!existingManufacture) {
    throw new NotFoundError("Manufacture is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingManufacture, // existing Manufacture
    ...data,
  };

  // if exist, we will update the manufacture data
  const updatedManufacture = await manufactureRepository.updateManufacture(
    id,
    data
  );
  if (!updatedManufacture) {
    throw new InternalServerError(["Failed to update manufacture!"]);
  }

  return updatedManufacture;
};

exports.deleteManufactureById = (id) => {
    // Cek apakah manufaktur ada atau tidak (validasi data)
    const existingManufacture = manufactureRepository.getManufactureById(id);
    if (!existingManufacture) {
      throw new NotFoundError("Manufacture is Not Found!");
    }
  
    // Jika ada, kita akan menghapus data manufaktur
    const deletedManufacture = manufactureRepository.deleteManufactureById(id);
    if (!deletedManufacture) {
      throw new InternalServerError(["Failed to delete manufacture!"]);
    }
  
    return deletedManufacture;
  };
  