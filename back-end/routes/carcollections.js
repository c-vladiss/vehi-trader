import express from "express";
import * as carCollectionsController from "../controllers/carcollections.js";
const router = express.Router();

router.get("/", carCollectionsController.getCarcollections);
router.put("/", carCollectionsController.putCarcollection);
router.post("/:id", carCollectionsController.addCarcollection);
router.delete("/:id", carCollectionsController.deleteCarcollection);
export { router };
