import express from "express";
import appointController from "../app/controllers/AppointController.js";
import appointMiddleware from "../app/middleware/AppointMiddleware.js";
const router = express.Router();

router.get("/", appointController.getAll);
router.get("/NotCancel", appointController.getExceptCancel);
router.get("/:id", appointMiddleware.notFoundAppoint, appointController.get);
router.get(
  "/GetStatus/:status",
  appointMiddleware.notFoundStatus,
  appointController.getByStatus
);
router.post("/", appointMiddleware.badRequestAppoint, appointController.create);
router.put(
  "/:id",
  appointMiddleware.notFoundAppoint,
  appointMiddleware.badRequestAppoint,
  appointController.update
);
router.put(
  "/UpdateStatus/:id",
  appointMiddleware.notFoundAppoint,
  appointMiddleware.badRequestStatus,
  appointController.updateStatus
);
router.delete(
  "/:id",
  appointMiddleware.notFoundAppoint,
  appointController.delete
);

export default router;
