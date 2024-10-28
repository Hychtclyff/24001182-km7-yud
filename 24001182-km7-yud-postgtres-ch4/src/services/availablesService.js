const availableRepository = require("../repositories/availablesRepository"); // Ganti path sesuai dengan struktur proyek
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getAvailable = (available_status) => {
  return availableRepository.getAvailable(available_status);
};

exports.createAvailable = async (data) => {
  return availableRepository.createAvailable(data);
};

exports.updateAvailable = async (id, data) => {
  // Cek apakah available ada atau tidak (validasi data)
  const existingAvailable = await availableRepository.getAvailableById(id);
  if (!existingAvailable) {
    throw new NotFoundError("Available status is Not Found!");
  }

  // Menggabungkan data yang ada dengan data baru
  data = {
    ...existingAvailable, // Existing Available
    ...data,
  };

  // Jika ada, kita akan memperbarui data available
  const updatedAvailable = await availableRepository.updateAvailable(id, data);
  if (!updatedAvailable) {
    throw new InternalServerError(["Failed to update available status!"]);
  }

  return updatedAvailable;
};

exports.deleteAvailableById = async (id) => {
  // Cek apakah available ada atau tidak (validasi data)
  const existingAvailable = await availableRepository.getAvailableById(id);
  if (!existingAvailable) {
    throw new NotFoundError("Available status is Not Found!");
  }

  // Jika ada, kita akan menghapus data available
  const deletedAvailable = await availableRepository.deleteAvailableById(id);
  if (!deletedAvailable) {
    throw new InternalServerError(["Failed to delete available status!"]);
  }

  return deletedAvailable;
};
