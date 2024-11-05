import express from "express";

import reviewController from "../app/controllers/reviewController.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import doctorMiddleware from "../app/middleware/DoctorMiddleware.js";
const router = express.Router();
router.get("/", reviewController.getAll);
router.get("/:id", reviewController.get);
router.put("/:id",reviewController.update);
router.delete("/:id",reviewController.delete);
router.get("/average/:serviceId", reviewController.getAverageRating);

export default router;
