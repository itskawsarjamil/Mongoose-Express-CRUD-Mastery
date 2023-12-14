/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './users.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await userServices.createUserintoDB(data);
    // console.log('\nresult from controller:', result);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: {
        code: err.code,
        description: err.message,
      },
    });
  }
};

export const userController = {
  createUser,
};
