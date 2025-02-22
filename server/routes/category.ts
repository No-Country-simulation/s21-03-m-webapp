import express from "express";

const { create, getAll, edit, remove } = require('../controllers/category')
const { authCheck } = require('../middleware/auth');

const router = express.Router();
router.use(authCheck)
router.post('/',  create);
router.get('/',  getAll);
router.put("/:id",  edit)
router.delete("/:id",  remove)

export default router;