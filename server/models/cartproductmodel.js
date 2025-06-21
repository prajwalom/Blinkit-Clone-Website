import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    preoduct_id : {
        type : mongoose.Schema.ObjectId,
        ref: 'product',
    },

    quantity: {
        type: Number,
        default: 1
    },

    userId : {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    }

}, {
    timestamps: true
})

const CartProduct = mongoose.model('cartproduct', cartProductSchema);
export default CartProduct;