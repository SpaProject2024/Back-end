import express from "express";

import customerController from "../app/controllers/customerController.js";
import { authorizeRole } from "../app/middleware/authorize.js";
import { verifyToken } from "../app/middleware/verifyToken.js";
const router = express.Router();
router.get("/", customerController.getAll);
router.get("/:id", customerController.get);
router.post("/", verifyToken, authorizeRole(["manager", "customer"]), customerController.create);
router.put("/:id", verifyToken, authorizeRole(["manager", "customer"]), customerController.update);
router.delete("/:id", verifyToken, authorizeRole(["manager", "customer"]), customerController.delete);
export default router;