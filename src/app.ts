import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/users/users.routes';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello From Void World',
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
