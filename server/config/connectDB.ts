import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
function connectDb() {
    mongoose.connect(MONGO_URI)
    .then(() => console.log('Mongodb connected'))
    .catch((err: any) => console.log('Error ', err))
}

export default connectDb;