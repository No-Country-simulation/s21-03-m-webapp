import mongoose, { Document, Schema } from "mongoose"

export enum UserRole {
    CASHIER = "cashier",
    WAITER = "waiter"
}

export interface IMember extends Document {
    ownerId: string
    name: string
    email: string
    password: string
    rol: UserRole
}

const MemberSchema: Schema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        enum: UserRole
    }
})

const Member = mongoose.model<IMember>("Member", MemberSchema)
export default Member