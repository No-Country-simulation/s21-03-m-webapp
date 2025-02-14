import express from "express";

const { register, login, currentUser } = require('../controllers/auth')
const { authCheck } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', authCheck, currentUser);

export default router;