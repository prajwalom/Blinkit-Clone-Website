import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyTemplate.js';

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
        
        const verifyEmsilUrl = `${process.env.FRONTEND_URL}/verify-email/${savedUser._id}`;

        const verificationEmail = await sendEmail({
            sendTo : email,
            subject: 'Verify your email from BlinkIR',
            html: verifyEmailTemplate({
                name,
                url: verifyEmsilUrl
            })
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                userId: savedUser._id,
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

export async function verifyEmailController(req, res) {
    try {
        const { code } = res.body;
        const user = await User.findone({ _id: code})

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Code',
                error: true,
            });
        }

        const updateuser = await user.updateOne({ _id : code }, {
            verify_email: true
        });

        return res.json ({
            message: 'Verification Done',
            success: true,
            error: false
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}


// login

export async function loginUserController(req, res) {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password are required',
                error: true,
            });
        }
            
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: true,
            });
        }

        if (user.status !== 'active' ) {
            return res.status(403).json({
                success: false,
                message: 'User is not active, Please Contact Admin',
                error: true,
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password, please try again',
                error: true,
            });
        }

        if (!user.verify_email) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email before logging in',
                error: true,
            });
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);


        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        };


        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.cookie('accessToken', accessToken, cookieOptions);

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                userId: user._id,
                email: user.email,
                accessToken,
                refreshToken
            }
        });



    } catch (error){
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}


// logout controller

export async function logoutUserController(req, res) {
    try {

        const userId = req.userId;

        
        
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        };

        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');

        const removeRefreshToken = await User.updateOne(
            { _id: userId },
            { $unset: { refreshToken: "" } }
        );



        return res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
        
    }
}