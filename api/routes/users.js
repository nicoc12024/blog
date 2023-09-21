import express from "express";
import { deleteUser } from "../controllers/user.js";

const router = express.Router();

router.delete("/delete-user/:id", deleteUser);

export default router;
