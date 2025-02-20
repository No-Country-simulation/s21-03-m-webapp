import {Router} from "express"
import { authCheck } from "../middleware/auth"
import { SalonController } from "../controllers/salonController"
import { TableController } from "../controllers/tableControllers"
import { salonExists } from "../middleware/salon"
const router = Router()



//// Middleware para verificar si el salón existe ////
router.use(authCheck)
router.param("salonId",salonExists)

/////////  RUTAS DE SALONES ////////


router.post("/",SalonController.create)
router.get("/",SalonController.getAll)
router.get("/:salonId",SalonController.getOne)
router.put("/:salonId",SalonController.update)
router.delete("/:salonId",SalonController.delete)




/////////  RUTAS DE SALONES ////////

router.post("/:salonId/tables",TableController.create)






export default router