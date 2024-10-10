const carRepository = require("../repositories/cars");
const { NotFoundError, InternalServerError } = require("../utils/request");

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
  return carRepository.getCars(
    plate,
    manufacture,
    model,
    type,
    capacity,
    transmission,
    available,
    year
  );
};

exports.getCarById = (id) => {
  const car = carRepository.getCarById(id);

  if (!car) {
    throw new NotFoundError("car is Not Found!");
  }

  return car;
};

exports.createCar = (data) => {
  return carRepository.createCar(data);
};

exports.updateCar = (id, data) => {
  // find car is exist or not (validate the data)
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // if exist, we will delete the car data
  const updatedCar = carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update car!"]);
  }

  return updatedCar;
};

exports.deleteCarById = (id) => {
  // find car is exist or not (validate the data)
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // if exist, we will delete the car data
  const deletedCar = carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to delete car!"]);
  }

  return deletedCar;
};
