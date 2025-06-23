import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {

        const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied, no token provided'
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        req.userId = decode.id;
        next();

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
        
    }
}