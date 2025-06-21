import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    price: {
        type: Number,
        default: 0,
    },

    discount: {
        type: Number,
        default: 0,
    },

    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category',
        }
    ],

    subcategory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'subcategory',
    }],

    unit: {
        type: String,
        default: ''
    },

    image_url: {
        type: Array,
        default: []
    },

    stock: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
        default: ''
    },

    more_details: {
        type: Object,
        default: {}
    },

    publish : {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

const Product = mongoose.model('product', productSchema);

export default Product;