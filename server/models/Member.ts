import mongoose, {Document, Schema, Types} from "mongoose"



export enum UserRole {
    CASHIER = "Cashier",
    WAITER = "Waiter"
}

export interface IMember extends Document {

    name: string
    email: string
    password: string
    rol:UserRole
    ownerId:Types.ObjectId

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
    rol:{
        type:String,
        required:true,
        enum:UserRole
    },
    password: {
        type: String,
        required: true
    }
    
})

const Member = mongoose.model<IMember>("Member", MemberSchema)
export default Member