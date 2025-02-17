import express from "express";

const { edit } = require('../controllers/profile')
const { authCheck } = require('../middleware/auth');

const router = express.Router();

router.put('/edit', authCheck, edit);

export default router;