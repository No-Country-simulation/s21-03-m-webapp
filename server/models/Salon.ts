import mongoose, { Document, Schema, Types } from "mongoose"
import Table from "./Table"

export interface ISalon extends Document{
    name:string
    ownerId:Types.ObjectId
    tables:[Types.ObjectId]
}


const SalonSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    ownerId:{
        type:Types.ObjectId,
        ref:"Owner"
    },
    tables:{
        type:[Types.ObjectId],
        ref:"Table"
    }

})


SalonSchema.pre("deleteOne",{ document: true, query: false },async function(next){
    await Table.deleteMany({salonId:this._id})
    next()
})

const Salon=mongoose.model<ISalon>("Salon",SalonSchema)
export default Salon