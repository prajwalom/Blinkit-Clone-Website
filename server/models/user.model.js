import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Provide your name']
    },
    email: {
        type: String,
        required: [true,'Provide your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'provide your password'],
    },
    avatar: {
        type: String,
        default: ''
    },
    mobile : {
        type: Number,
        default: null
    },

    refresh_token : {
        type: String,
        default: ''
    },

    verify_email: {
        type: Boolean,
        default: false
    },

    last_login_date :{
        type: Date,
        default: ''
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    address_details : [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'address'
        }
    ],

    shopping_cart : [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'cartproduct'

        }
    ],

    orderHistory : [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'order'
        }
    ],

    forgot_password_otp : {
        type: String,
        defaultL: null,
    },

    forgot_password_expiry : {
        type: Date,
        default: '',
    },

    role : {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    } ,{
        timestamps: true,
    });

    const User = mongoose.model('User', userSchema);

    export default User;