const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCars = async (
  model_name,
  manufacture_name,
  manufacture_region,
  year,
  plate,
  rentPerDay,
  capacity,
  transmission_name,
  type_name,
  available_status,
  available_At,
  spec_name,
  option_name
) => {
  let query = {
    include: {
      model: {
        include: {
          transmission: true,
          manufacture: true,
          type: true,
          specs: {include:{spec:true}},
          options: {include:{option:true}},
        },
      },
      availability: true,
    },
  };

  let andQuery = [];

  if (model_name) {
    andQuery.push({
      model: {
        model_name: { contains: model_name, mode: "insensitive" },
      },
    });
  }

  if (manufacture_name) {
    andQuery.push({
      model: {
        manufacture: {
          manufacture_name: { contains: manufacture_name, mode: "insensitive" },
        },
      },
    });
  }
  if (manufacture_region) {
    andQuery.push({
      model: {
        manufacture: {
          manufacture_region: {
            contains: manufacture_region,
            mode: "insensitive",
          },
        },
      },
    });
  }

  if (year) {
    andQuery.push({ year: Number(year) });
  }

  if (plate) {
    andQuery.push({ plate: { contains: plate, mode: "insensitive" } });
  }

  if (rentPerDay) {
    andQuery.push({ rentPerDay: Number(rentPerDay) });
  }

  if (capacity) {
    andQuery.push({ model: { capacity: Number(capacity) } });
  }

  if (transmission_name) {
    andQuery.push({
      model: {
        transmission: {
          transmission_name: {
            contains: transmission_name,
            mode: "insensitive",
          },
        },
      },
    });
  }

  if (type_name) {
    andQuery.push({
      model: {
        type: {
          type_name: { contains: type_name, mode: "insensitive" },
        },
      },
    });
  }

  if (available_status) {
    andQuery.push({
      availability: {
        available_status: { contains: available_status, mode: "insensitive" },
      },
    });
  }
  if (available_At) {
    andQuery.push({
      available_At: { contains: available_At, mode: "insensitive" },
    });
  }
  if (option_name) {
    andQuery.push({
      model: {
        Options: {
          option_name: { contains: option_name, mode: "insensitive" },
        },
      },
    });
  }
  if (spec_name) {
    andQuery.push({
      model: {
        Specs: {
          spec_name: { contains: spec_name, mode: "insensitive" },
        },
      },
    });
  }

  if (andQuery.length > 0) {
    query.where = {
      AND: andQuery,
    };
  }

  const searchedCars = await prisma.cars.findMany(query);

  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarById = async (id) => {
  const searchedCarsById = await prisma.cars.findUnique({
    where: { id },
    include: {
      model: {
        include: {
          transmission: true,
          manufacture: true,
          type: true,
          specs: {include:{spec:true}},
          options: {include:{option:true}},
        },
      },
      availability: true,
    },
  });

  const serializedCars = JSONBigInt.stringify(searchedCarsById);
  return JSONBigInt.parse(serializedCars);
};

exports.createCar = async (data) => {
  const newCar = await prisma.cars.create({
    include: {
      model: {
        include: {
          transmission: true,
          manufacture: true,
          type: true,
          specs: {include:{spec:true}},
          options: {include:{option:true}},
        },
      },
      availability: true,
    },
    data,
  });

  const serializedCars = JSONBigInt.stringify(newCar);
  return JSONBigInt.parse(serializedCars);
};

exports.updateCarById = async (id, data) => {
  delete data.id;
  const updatedCar = await prisma.cars.update({
    where: { id },
    include: {
      model: {
        include: {
          transmission: true,
          manufacture: true,
          type: true,
          specs: {include:{spec:true}},
          options: {include:{option:true}},
        },
      },
      availability: true,
    },
    data: {
      plate: data.plate,
      rentPerDay: data.rentPerDay,
      description: data.description,
      availableAt: new Date(data.availableAt),
      year: data.year,
      image: data.image,

      model: {
        connect: { id: data.model_id },
      },
      availability: {
        connect: { id: data.availability_id },
      },
    },
  });

  const serializedOptions = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedOptions);
};

exports.deleteCarById = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: {
      id: id,
    },
    include: {
      model: {
        include: {
          transmission: true,
          manufacture: true,
          type: true,
          specs: {include:{spec:true}},
          options: {include:{option:true}},
        },
      },
      availability: true,
    },
  });
  const serializedOptions = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedOptions);
};
