const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

exports.getTransmissions = async (transmission_name) => {
  // Define query here
  let query = {};

  // It will generate the query
  let orQuery = [];

  if (transmission_name) {
    orQuery.push({
      transmission_name: { contains: transmission_name, mode: "insensitive" },
    });
  }

  if (orQuery.length > 0) {
    query.where = {
      OR: orQuery,
    };
  }

  // Find by query
  const searchedTransmissions = await prisma.transmission.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedTransmissions = JSONBigInt.stringify(searchedTransmissions);
  return JSONBigInt.parse(serializedTransmissions);
};

exports.createTransmission = async (data) => {
  try {
    const newTransmission = await prisma.transmission.create({
      data,
      // Tidak ada include, data hanya akan mencakup transmission yang baru dibuat
    });

    // Convert BigInt fields to string for safe serialization
    const serializedTransmission = JSONBigInt.stringify(newTransmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating transmission");
  }
};

exports.getTransmissionById = async (id) => {
  try {
    // Mencari transmission berdasarkan id
    const transmission = await prisma.transmission.findUnique({
      where: {
        id: parseInt(id, 10), // Pastikan id dikonversi ke integer
      },
      include: {},
    });

    // Cek jika transmission tidak ditemukan
    if (!transmission) {
      throw new Error(`Transmission with id ${id} not found`);
    }

    // Mengonversi field BigInt menjadi string untuk serialisasi yang aman
    const serializedTransmission = JSONBigInt.stringify(transmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving transmission data");
  }
};
exports.updateTransmission = async (id, data) => {
  try {
    const updatedTransmission = await prisma.transmission.update({
      where: {
        id: parseInt(id, 10), // Pastikan id dikonversi ke integer
      },
      data: {
        ...data,
      },
    });

    // Convert BigInt fields to string for safe serialization (jika diperlukan)
    const serializedTransmission = JSONBigInt.stringify(updatedTransmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error updating transmission data");
  }
};

exports.deleteTransmissionById = async (id) => {
  try {
    const deletedTransmission = await prisma.transmission.delete({
      where: { id: parseInt(id, 10) }, // Pastikan id dikonversi ke integer
    });

    // Convert BigInt fields to string for safe serialization
    const serializedTransmission = JSONBigInt.stringify(deletedTransmission);
    return JSONBigInt.parse(serializedTransmission);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting transmission data"); // Menangani error jika terjadi
  }
};
