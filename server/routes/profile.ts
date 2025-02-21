import express from "express";
import { upload } from "../middleware/upload";

const { edit } = require('../controllers/profile')
const { authCheck } = require('../middleware/auth');

const router = express.Router();

router.put('/edit', authCheck,upload, edit);

export default router;