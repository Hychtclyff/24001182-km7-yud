const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getAvailable = async (available_status) => {
  // Define query here
  let query = {};

  // It will generate the query
  if (available_status) {
    query.where = {
      available_status: { contains: available_status, mode: "insensitive" },
    };
  }

  // Find by query
  const searchedAvailable = await prisma.available.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedAvailable = JSONBigInt.stringify(searchedAvailable);
  return JSONBigInt.parse(serializedAvailable);
};

exports.createAvailable = async (data) => {
  try {
    const newAvailable = await prisma.available.create({
      data,
      // Tidak ada include, data hanya akan mencakup available yang baru dibuat
    });

    // Convert BigInt fields to string for safe serialization
    const serializedAvailable = JSONBigInt.stringify(newAvailable);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating available status");
  }
};

exports.getAvailableById = async (id) => {
  try {
    // Mencari available berdasarkan id
    const available = await prisma.available.findUnique({
      where: {
        id: parseInt(id, 10), // Pastikan id dikonversi ke integer
      },
      include: {},
    });

    // Cek jika available tidak ditemukan
    if (!available) {
      throw new Error(`Available status with id ${id} not found`);
    }

    // Mengonversi field BigInt menjadi string untuk serialisasi yang aman
    const serializedAvailable = JSONBigInt.stringify(available);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving available data");
  }
};

exports.updateAvailable = async (id, data) => {
  try {
    const updatedAvailable = await prisma.available.update({
      where: { id: parseInt(id, 10) }, // Pastikan id dikonversi ke integer
      data: {
        ...data, // Pastikan data yang diberikan tidak menyertakan field id
      },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedAvailable = JSONBigInt.stringify(updatedAvailable);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error updating available data");
  }
};

exports.deleteAvailableById = async (id) => {
  try {
    const deletedAvailable = await prisma.available.delete({
      where: { id: parseInt(id, 10) }, // Pastikan id dikonversi ke integer
    });

    // Convert BigInt fields to string for safe serialization
    const serializedAvailable = JSONBigInt.stringify(deletedAvailable);
    return JSONBigInt.parse(serializedAvailable);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting available data"); // Menangani error jika terjadi
  }
};
