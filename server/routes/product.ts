import express from "express";

const { create, getAll, getByCategory, edit, remove } = require('../controllers/product')
const { authCheck } = require('../middleware/auth');

const router = express.Router();
router.use(authCheck)

router.post('/', create);
router.get('/', getAll);
router.get('/:categoryId', getByCategory);
router.put("/:id", edit)
router.delete("/:id", remove)

export default router;