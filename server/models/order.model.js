import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    },

    orderID: {
        type: String,
        required: [true,'please provide order ID'],
        unique: true
    },

    productID: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
    },
    product_details: {
        name: String,
        image: Array,

    },

    paymentID : {
        type: String,
        default: ''
    },

    total_amount: {
        type: Number,
        required: true
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address',
    },
    payment_status: {
        type: String,
        default: ''
    },

    subtotalAmt: {
        type: Number,
        default: 0
    },

    totalAmt : {
        type: Number,
        default: 0
    },

    invoice_receipt: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
})

const Order = mongoose.model('order', orderSchema);
export default Order;