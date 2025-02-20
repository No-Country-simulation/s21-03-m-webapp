import { Types } from "mongoose"


enum TableStatus{
   
}

interface ITable{
    salonId:Types.ObjectId
    number: string
    x:number
    y:number
    status:TableStatus
}