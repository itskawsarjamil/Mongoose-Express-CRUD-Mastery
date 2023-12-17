import express, { Request, Response } from 'express';
import { userController } from './users.controller';

export const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.send('userRouter it is');
});

userRouter.post('/users', userController.createUser);

userRouter.get('/users', userController.getAllUsers);

userRouter.get('/users/:userId', userController.getSingleUser);

userRouter.put('/users/:userId', userController.updateAUser);

userRouter.delete('/users/:userId', userController.deleteAUser);

userRouter.put('/users/:userId/orders', userController.addNewOrder);

userRouter.get('/users/:userId/orders', userController.getAllOrders);

userRouter.get(
  '/users/:userId/orders/total-price',
  userController.calculateTotalPrice,
);
