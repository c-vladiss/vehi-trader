import express from "express";
import * as adsController from "../controllers/ads.js";
const router = express.Router();

router.get("/", adsController.getAds);
router.get("/:id", adsController.getAdsById);
router.post("/", adsController.createAd);
router.delete("/:id", adsController.deleteAds);

export { router };
