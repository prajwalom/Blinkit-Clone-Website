import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export async function registerUserController(req, res) {
    try {

        const { name, email, password } = req.body;

        if( !name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                error: true,
            });
        }

        const user = await User.findone({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
                error: true,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const payload = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new User(payload);
        const savedUser = await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}