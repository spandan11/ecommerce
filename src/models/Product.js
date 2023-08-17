import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    productname: {
        type: String,
        required: [true, "Please provide product name"],
    },
    category: {
        type: String,
        required: [true, "Please provide category"],
    },
    price: {
        type: Number,
        required: [true, "Please provide price"],
    },
    discount: {
        type: Number,
    },
    image: {
        type: String,
        required: [true, "Please provide image"],
    },
    colors: {
        type: Array,
        default: [],
        required: [true, "Please provide colors"],
    },
    sizes: {
        type: Array,
        required: [true, "Please provide sizes"],
    },
    quantity: {
        type: Number,
        required: [true, "Please provide quantity"],
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;