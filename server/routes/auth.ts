import express from "express";

const { register } = require('../controllers/auth')

const router = express.Router();

router.post('/register', register);

export default router;