import { Document, Types } from "mongoose"


export enum TableStatus {
    FREE = "Free",
    OCCUPIED = "Occupied",
    BILLING = "Billing"
}

interface ITable extends Document {
    salonId: Types.ObjectId
    number: string
    x: number
    y: number
    status: TableStatus
}