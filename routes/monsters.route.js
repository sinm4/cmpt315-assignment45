import express from "express";
import {
  createMonster,
  deleteMonster,
  getMonster,
  getMonsters,
  updateMonster,
} from "../controllers/monsters.controller.js";

const router = express.Router();

router.get("/", getMonsters);
router.get("/:id", getMonster);
router.post("/", createMonster);
router.patch("/:id", updateMonster);
router.delete("/:id", deleteMonster);

export default router;
