import mongoose, {Document, Schema, Types} from "mongoose"

export enum UserRole{
    CASHIER="cashier",
    WAITER="waiter"
}

export interface IMember extends Document{
    name: string
    email: string
    password: string
    rol:UserRole
    ownerId:Types.ObjectId
}

const MemberSchema:Schema=new Schema({
    name:{
        type:String, 
        required:true    
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true,
        enum:UserRole
    },
    ownerId:{
        type:Types.ObjectId,
        required:true
    }
})

const Member= mongoose.model<IMember>("Member",MemberSchema)
export default Member