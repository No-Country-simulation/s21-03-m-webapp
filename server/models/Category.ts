import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
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
    image: {
        type: String,
        default: '',
        trim: true,
    }
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
