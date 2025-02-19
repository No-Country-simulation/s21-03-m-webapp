import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import memberRoutes from "./routes/member"
import salonRoutes from "./routes/salon"


import connectDb from "./config/connectDB"
import morgan from "morgan";
connectDb()

dotenv.config();
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use("/api/members",memberRoutes)
app.use("/api/salones",salonRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});