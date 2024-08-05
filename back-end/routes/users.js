import express from "express";
import * as usersController from "../controllers/users.js";
import * as authMiddleware from "../middlewares/authentication.js";
const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.delete("/:id", usersController.deleteUser);
router.get("/:id/favoriteCars", usersController.getFavoriteCars);
router.get("/:id/uploadedCars", usersController.getUploadedCars);
router.post("/authenticate", authMiddleware.authenticate);
router.put("/:id", usersController.updateUser);

export { router };
