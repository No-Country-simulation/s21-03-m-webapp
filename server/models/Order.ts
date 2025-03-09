import mongoose, { Schema, Types } from "mongoose";

const OrderSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
    },
    tableNumber: {
        type: Types.ObjectId,
        ref:"Table",
        require: true
    },
    people: {
        type: Number,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            comentaries:{
                types:String
            }
        }
    ],
    serviceBy:{
        type:Types.ObjectId,
        ref:"Member",
        default:""
    },
    subtotal: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0,
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "canceled", "paid"],
        default: "pending"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    closedAt:{
        type:Date
    }
},{ timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
