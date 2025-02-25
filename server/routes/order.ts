import express from "express";

const { create, getAll, edit, remove, updateStatus, getOrderByTable } = require('../controllers/order')
const { authCheck } = require('../middleware/auth');

const router = express.Router();

router.post('/', authCheck, create);
router.get('/', authCheck, getAll);
router.put('/update-status', authCheck, updateStatus);
router.get('/get-order/:tableNumber', authCheck, getOrderByTable);
router.put("/:id", authCheck, edit)
router.delete("/:id", authCheck, remove)

export default router;