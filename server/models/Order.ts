import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
    },
    tableNumber: {
        type: Number,
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
        }
    ],
    subtotal: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
    },
},{ timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
