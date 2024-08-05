import express from "express";
import { router as carsRouter } from "./cars.js";
import { router as usersRouter } from "./users.js";
import { router as adsRouter } from "./ads.js";
import { router as carCollectionsRouter } from "./carcollections.js";

export const router = express.Router();

router.use("/cars", carsRouter);
router.use("/users", usersRouter);
router.use("/ads", adsRouter);
router.use("/carcollections", carCollectionsRouter);
