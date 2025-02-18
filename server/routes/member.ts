import { Router } from "express";
import { MemberController } from "../controllers/memberController";
const router=Router()


router.post("/",MemberController.create)
router.get("/",MemberController.getAll)
router.get("/:memberId",MemberController.getById)
router.put("/:memberId",MemberController.updateById)
router.delete("/:memberId",MemberController.deleteById)

export default router