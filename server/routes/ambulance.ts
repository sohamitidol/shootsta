import express from "express";
import * as ambulanceController from "../controllers/ambulance";
import { catchAsync } from "../utils/catchAsyncError";

const router = express.Router();

router.post("/", catchAsync(ambulanceController.addAmbulance));

router.get("/", catchAsync(ambulanceController.getAmbulances));

router.get("/:id", catchAsync(ambulanceController.getAmbulanceById));

router.patch("/:id", catchAsync(ambulanceController.updateAmbulance));

router.delete("/:id", catchAsync(ambulanceController.removeAmbulance));

export default router;
