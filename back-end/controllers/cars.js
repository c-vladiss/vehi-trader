import Car from "../models/cars.js";
import mongoose from "mongoose";
import multer from "multer";
const getCars = async (req, res) => {
  const {
    makes,
    models,
    minPrice,
    maxPrice,
    minKilometers,
    maxKilometers,
    minYear,
    maxYear,
    fuelTypes,
  } = req.query;

  const query = {};

  if (makes && Array.isArray(makes)) {
    query.make = { $in: makes };
  } else if (typeof makes === "string") {
    query.make = { $in: makes.split(",") };
  }

  if (models && Array.isArray(models)) {
    query.$and = [{ make: { $in: makes } }, { model: { $in: models } }];
  } else if (typeof models === "string") {
    query.model = { $in: models.split(",") };
  }

  if (minPrice) {
    query.price = { $gte: Number(minPrice) };
  }
  if (maxPrice) {
    query.price = { ...query.price, $lte: Number(maxPrice) };
  }
  if (minKilometers) {
    query.kilometers = { $gte: Number(minKilometers) };
  }
  if (maxKilometers) {
    query.kilometers = { ...query.kilometers, $lte: Number(maxKilometers) };
  }
  if (minYear) {
    query.year = { $gte: Number(minYear) };
  }
  if (maxYear) {
    query.year = { ...query.year, $lte: Number(maxYear) };
  }
  if (fuelTypes && typeof fuelTypes === "string") {
    query.fuelType = { $in: fuelTypes.split(",") };
  }

  try {
    const cars = await Car.find(query);
    res.status(200).send({ cars });
  } catch (err) {
    res.status(500).send({ error: "Internal server error", details: err });
  }
};

export default getCars;

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    res.status(200).send(car);
  } catch {
    res.status(404).send("Car not found");
  }
};

const createCar = async (req, res) => {
  const car = new Car(req.body);
  car
    .save()
    .then(() => {
      res.status(201).send({ message: "Car created" });
    })
    .catch((err) => {
      //send the error message
      res.status(400).send({ erorr: err });
    });
};

const deleteCar = async (req, res) => {
  Car.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ message: "Car deleted" });
    })
    .catch((err) => {
      res.status(404).send({ message: "Car not found" });
    });
};
// fuction to upload multiple photos
const uploadPhotos = async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  });

  const upload = multer({ storage: storage }).array("photos", 10);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).send(req.file);
  });
};

const updateCar = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  const options = { new: true };
  Car.findByIdAndUpdate(id, updates, options)
    .then((car) => {
      if (car) {
        res.status(200).send(car);
      } else {
        res.status(404).send({ message: "Car not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "internal server error", err: err });
    });
};

export { getCars, getCarById, createCar, deleteCar, updateCar, uploadPhotos };
