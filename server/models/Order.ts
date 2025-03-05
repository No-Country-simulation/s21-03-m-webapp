import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
    },
    tableNumber: {
        type: String,
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
    }
},{ timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order;
