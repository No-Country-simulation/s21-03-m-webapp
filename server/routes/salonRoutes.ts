import {Router} from "express"
import { authCheck } from "../middleware/auth"
import { SalonController } from "../controllers/salonController"

const router = Router()

router.post("/",authCheck,SalonController.create)
router.get("/",authCheck,SalonController.getAll)
router.get("/:salonId",authCheck,SalonController.getOne)

export default router