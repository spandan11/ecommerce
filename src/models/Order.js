import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: [],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;