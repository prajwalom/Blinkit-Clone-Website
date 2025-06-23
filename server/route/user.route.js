import router from 'express';
import { loginUserController, logoutUserController, registerUserController, uploadAvatar, verifyEmailController } from '../controllers/user.controller';
import auth from '../middleware/auth.middleware';
import upload from '../middleware.js/multer';

const userRouter = router();

userRouter.post('/login', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginUserController)
userRouter.post('/logout', auth, logoutUserController)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)
export default userRouter;