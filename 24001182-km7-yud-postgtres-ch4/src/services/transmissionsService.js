const transmissionRepository = require("../repositories/transmissionsRepository"); // Pastikan path ini sesuai dengan lokasi repository
const { imageUpload } = require("../utils/image-kit");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTransmissions = (transmission_name) => {
  return transmissionRepository.getTransmissions(transmission_name);
};

exports.createTransmission = async (data) => {
  return transmissionRepository.createTransmission(data);
};

exports.updateTransmission = async (id, data) => {
  // Cek apakah transmisi ada atau tidak (validasi data)
  const existingTransmission = await transmissionRepository.getTransmissionById(
    id
  );
  if (!existingTransmission) {
    throw new NotFoundError("Transmission is Not Found!");
  }

  // Menyatukan data yang ada dengan data baru
  data = {
    ...existingTransmission, // Data transmisi yang ada
    ...data,
  };

  // Jika ada, kita akan memperbarui data transmisi
  const updatedTransmission = await transmissionRepository.updateTransmission(
    id,
    data
  );
  if (!updatedTransmission) {
    throw new InternalServerError(["Failed to update transmission!"]);
  }

  return updatedTransmission;
};

exports.deleteTransmissionById = async (id) => {
  // Cek apakah transmisi ada atau tidak (validasi data)
  const existingTransmission = await transmissionRepository.getTransmissionById(
    id
  );
  if (!existingTransmission) {
    throw new NotFoundError("Transmission is Not Found!");
  }

  // Jika ada, kita akan menghapus data transmisi
  const deletedTransmission =
    await transmissionRepository.deleteTransmissionById(id);
  if (!deletedTransmission) {
    throw new InternalServerError(["Failed to delete transmission!"]);
  }

  return deletedTransmission;
};
