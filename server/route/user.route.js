import router from 'express';
import { loginUserController, registerUserController, verifyEmailController } from '../controllers/user.controller';

const userRouter = router();

userRouter.post('/login', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginUserController)
export default userRouter;