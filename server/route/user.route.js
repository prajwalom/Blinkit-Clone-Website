import router from 'express';
import { registerUserController, verifyEmailController } from '../controllers/user.controller';

const userRouter = router();

userRouter.post('/login', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
export default userRouter;