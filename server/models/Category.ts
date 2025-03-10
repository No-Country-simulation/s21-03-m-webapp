import mongoose, { Schema } from "mongoose";
import Product from "./Product";

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

CategorySchema.pre("deleteOne",{ document: true, query: false },async function(next){
      await Product.updateMany({categoryId:this._id},{categoryId:null})
    next()
})

const Category = mongoose.model('Category', CategorySchema);
export default Category;
