import mongoose, { Document, Schema, Types } from "mongoose"


export enum TableStatus {
    FREE = "Free",
    OCCUPIED = "Occupied",
    BILLING = "Billing"
}

export interface ITable extends Document {
    salonId: Types.ObjectId
    number: string
    xRatio: number
    yRatio: number
    status: TableStatus
}


const TableSchema=new Schema({
    salonId:{
        type:Types.ObjectId,
        ref:"Salon"
    },
    number:{
        type:String,
        required:true
    },
    x:{
        type:Number,
        required:true
    },
    y:{
        type:Number,
        required:true
    },
    xRatio:{
        type:Number,
        required:true
    },
    yRatio:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:TableStatus,
        default:TableStatus.FREE
    }
})

const Table=mongoose.model<ITable>("Table",TableSchema)
export default Table

