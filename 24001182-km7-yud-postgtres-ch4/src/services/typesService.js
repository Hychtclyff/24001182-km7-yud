const typeRepository = require("../repositories/typesRepository"); // Mengubah repository menjadi type
const { imageUpload } = require("../utils/image-kit");

const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTypes = (type_name) => {
  // Mengubah nama fungsi menjadi getTypes
  return typeRepository.getTypes(type_name); // Mengubah parameter menjadi type_name
};

exports.createType = async (data) => {
  return typeRepository.createType(data); // Mengubah ke repository type
};

exports.updateType = async (id, data) => {
  // Cek apakah type ada atau tidak (validasi data)
  const existingType = await typeRepository.getTypeById(id); // Mengubah ke getTypeById
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!"); // Mengubah pesan kesalahan
  }

  // Menggabungkan data yang ada dengan data baru
  data = {
    ...existingType, // Type yang ada
    ...data,
  };

  // Jika ada, kita akan memperbarui data type
  const updatedType = await typeRepository.updateType(id, data); // Mengubah ke updateType
  if (!updatedType) {
    throw new InternalServerError(["Failed to update type!"]); // Mengubah pesan kesalahan
  }

  return updatedType;
};

exports.deleteTypeById = async (id) => {
  // Mengubah fungsi menjadi deleteTypeById
  // Cek apakah type ada atau tidak (validasi data)
  const existingType = await typeRepository.getTypeById(id); // Mengubah ke getTypeById
  if (!existingType) {
    throw new NotFoundError("Type is Not Found!"); // Mengubah pesan kesalahan
  }

  // Jika ada, kita akan menghapus data type
  const deletedType = await typeRepository.deleteTypeById(id); // Mengubah ke deleteTypeById
  if (!deletedType) {
    throw new InternalServerError(["Failed to delete type!"]); // Mengubah pesan kesalahan
  }

  return deletedType;
};
