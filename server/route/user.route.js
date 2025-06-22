import router from 'express';
import { registerUserController } from '../controllers/user.controller';

const userRouter = router();

userRouter.post('/login', registerUserController)

export default userRouter;