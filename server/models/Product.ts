import mongoose, { Schema } from "mongoose";

export enum Target{
    KITCHEN = "kitchen",
    BAR = "bar"
}

const ProductSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: '',
        trim: true,
    },
    target: {
        type: String,
        enum: [Target],
        default: Target.KITCHEN
    }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
