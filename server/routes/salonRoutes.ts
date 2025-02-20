import {Router} from "express"
import { authCheck } from "../middleware/auth"
import { SalonController } from "../controllers/salonController"

const router = Router()

router.post("/",authCheck,SalonController.create)
router.get("/",authCheck,SalonController.getAll)
router.get("/:salonId",authCheck,SalonController.getOne)
router.put("/:salonId",authCheck,SalonController.update)
router.delete("/:salonId",authCheck,SalonController.delete)
export default router