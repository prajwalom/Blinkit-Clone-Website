import router from 'express';
import { loginUserController, logoutUserController, registerUserController, verifyEmailController } from '../controllers/user.controller';
import auth from '../middleware/auth.middleware';

const userRouter = router();

userRouter.post('/login', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginUserController)
userRouter.post('/logout', auth,logoutUserController)
export default userRouter;