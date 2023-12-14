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
      message: 'something went wrong.User creation Failed',
      error: {
        code: err.code,
        description: err.message,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).send({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong',
      error: {
        code: err.code,
        description: err.message,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const ReqID = req.params.userId;
    const result = await userServices.getSingleUserfromDB(ReqID);
    res.status(200).json({
      succeess: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went Wrong. User fetching Failed',
      error: {
        code: err.code,
        description: err.message,
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
