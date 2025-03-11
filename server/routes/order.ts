import express from "express";

const { create, getAll, edit, remove, updateStatus, getOrderByTable,getById } = require('../controllers/order')
const { authCheck } = require('../middleware/auth');

const router = express.Router();
router.use(authCheck)


router.post('/', create);
router.get('/', getAll);
router.get("/:id",getById)
router.put('/update-status', updateStatus);
router.get('/get-order/:tableId', getOrderByTable);
router.put("/:id", edit)
router.delete("/:id", remove)

export default router;