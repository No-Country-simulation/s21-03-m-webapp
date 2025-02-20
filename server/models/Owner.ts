import mongoose, { Schema, Types } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["Owner", "Member", "Cashier", "Waiter"],
        default: "Owner",
    },
    profile:{
        type:Types.ObjectId,
        ref:"Profile"
    }
});

const Owner = mongoose.model('Owner', UserSchema);
export default Owner;
