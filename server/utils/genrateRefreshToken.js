import User from "../models/user.model";
import jwt from "jsonwebtoken";

const genrateRefreshToken = async (userId) => {
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_REFRESH_TOKEN, {
        expiresIn: '30d'
    });

    const updateRefreshToken = await User.updateone ({ _id: userId }, 
        {
        refresh_token: token
        }
    );

    return token;
}

export default genrateRefreshToken;