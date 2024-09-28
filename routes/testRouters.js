import express from "express";
import {
  createTest,
  getTests,
  getTestById,
  updateTest,
  deleteTest,
} from "../controllers/testController.js";

const router = express.Router();
router.get("/", getTests);
router.post("/", createTest);
router.get("/:id", getTestById);
router.put("/:id", updateTest);
router.delete("/:id", deleteTest);

export default router;
