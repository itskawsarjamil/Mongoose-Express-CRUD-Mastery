import express, { Request, Response } from 'express';
import { userController } from './users.controller';
// import userRouter from
export const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.send('userRouter it is');
});

userRouter.post('/users', userController.createUser);
