import express from "express"
import { authCheck } from "../middleware/auth"
import { Auth } from "../controllers/auth"

const router = express.Router()

router.post('/register', Auth.register)
router.post('/login', Auth.login)
router.get('/current-user', authCheck, Auth.currentUser)

export default router