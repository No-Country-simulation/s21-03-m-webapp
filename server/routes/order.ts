import express from "express";

const { create, getAll, edit, remove } = require('../controllers/order')
const { authCheck } = require('../middleware/auth');

const router = express.Router();

router.post('/', authCheck, create);
router.get('/', authCheck, getAll);
router.put("/:id", authCheck, edit)
router.delete("/:id", authCheck, remove)

export default router;