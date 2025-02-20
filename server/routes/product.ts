import express from "express";

const { create, getAll, getByCategory, edit, remove } = require('../controllers/product')
const { authCheck } = require('../middleware/auth');

const router = express.Router();

router.post('/', authCheck, create);
router.get('/', authCheck, getAll);
router.get('/:categoryId', authCheck, getByCategory);
router.put("/:id", authCheck, edit)
router.delete("/:id", authCheck, remove)

export default router;