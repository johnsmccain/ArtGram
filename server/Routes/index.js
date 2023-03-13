import { sayHello } from "../Controllers";
import express from "express";
const router = express.Router();

router.get("/", sayHello);

export default router;