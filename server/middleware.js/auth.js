const auth = (req, res, next) => {
    try {

        const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
        
    }
}