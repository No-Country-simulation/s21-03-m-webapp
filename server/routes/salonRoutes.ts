import {Router} from "express"
import { authCheck } from "../middleware/auth"
import { SalonController } from "../controllers/salonController"
import { TableController } from "../controllers/tableControllers"
import { salonExists, tableExists } from "../middleware/salon"
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

//// Middleware para verificar si la mesa existe ////


router.param("tableId",tableExists)


/////////  RUTAS DE MESAS ////////

router.post("/:salonId/tables",TableController.create)
router.get("/:salonId/tables",TableController.getAll)
router.get("/:salonId/tables/:tableId",TableController.get)
router.put("/:salonId/tables/:tableId",TableController.update)
router.delete("/:salonId/tables/:tableId",TableController.delete)



export default router