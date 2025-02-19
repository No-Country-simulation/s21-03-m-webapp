import { Router } from "express";
/* import { MemberController } from "../controllers/memberController";
import { authCheck  } from "../middleware/auth"; */
const { MemberController } = require('../controllers/memberController')
const { authCheck } = require('../middleware/auth');

const router=Router()


router.post("/",authCheck,MemberController.create)
router.get("/",authCheck,MemberController.getAll)
router.get("/:memberId",MemberController.getById)
router.put("/:memberId",MemberController.updateById)
router.delete("/:memberId",MemberController.deleteById)

export default router