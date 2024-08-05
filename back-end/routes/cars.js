import express from "express";
import * as carsController from "../controllers/cars.js";
const router = express.Router();

router.post("/", carsController.createCar);
router.get("/", carsController.getCars);
router.get("/:id", carsController.getCarById);
router.put("/:id", carsController.updateCar);
router.delete("/:id", carsController.deleteCar);

export { router };
