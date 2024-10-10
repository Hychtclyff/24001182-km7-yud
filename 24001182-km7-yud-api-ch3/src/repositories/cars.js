const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require("uuid");
const { log } = require("console");

exports.getCars = (
  plate,
  manufacture,
  model,
  type,
  capacity,
  transmission,
  available,
  year
) => {
  const searchedCar = cars.filter((car) => {
    let result = true;

    if (plate) {
      const isFoundName = car.plate.toLowerCase().includes(plate.toLowerCase());
      result = result && isFoundName;
    }
    if (manufacture) {
      const isFoundName = car.manufacture
        .toLowerCase()
        .includes(manufacture.toLowerCase());
      result = result && isFoundName;
    }

    if (model) {
      const isFoundModel = car.model
        .toLowerCase()
        .includes(model.toLowerCase());
      result = result && isFoundModel;
    }

    if (type) {
      const isFoundType = car.type.toLowerCase().includes(type.toLowerCase());
      result = result && isFoundType;
    }

    if (capacity) {
      const isFoundCapacity = car.capacity === capacity;
      result = result && isFoundCapacity;
    }

    if (transmission) {
      const isFoundTransmission = car.transmission
        .toLowerCase()
        .includes(transmission.toLowerCase());
      result = result && isFoundTransmission;
    }

    if (available !== undefined) {
      result = result && car.available === available;
    }

    if (year) {
      result = result && car.year === Number(year);
    }

    return result;
  });

  return searchedCar;
};

exports.getCarById = (id) => {
  // find student by id

  const car = cars.find((car) => car.id == id);
  return car;
};

exports.createCar = (data) => {
  const isDuplicate = cars.some((car) => {
    // Membandingkan semua field kecuali `id`
    return car.plate === data.plate;
  });

  if (!isDuplicate) {
    // Find the max index to defnine the new data id

    const newCar = {
      id: uuidv4(),
      ...data,
    };

    /* Add data to current array students */
    cars.push(newCar);

    // Save the latest data to json
    fs.writeFileSync(
      "./data/cars.json",
      JSON.stringify(cars, null, 4),
      "utf-8"
    );

    return newCar;
  }
  return { error: "Data mobil sudah ada." };
};

exports.updateCar = (id, data) => {
  // Find the existing car data
  const car = cars.find((car) => car.id === id);
  if (!car) {
    // Make a error class
    throw new NotFoundError("car is Not Found!");
  }

  // Update the data
  Object.assign(car, data);

  // Update the json data
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return car;
};

exports.deleteCarById = (id) => {
  // Find index
  const carIndex = cars.findIndex((car) => car.id == id);
  console.log(carIndex);

  if (carIndex < 0) {
    // If no index found
    return null;
  }

  const deletedCars = cars.splice(carIndex, 1);

  // Update the json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");
  return deletedCars;
};
