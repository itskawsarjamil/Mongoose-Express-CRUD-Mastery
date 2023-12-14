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
    const ReqID = parseInt(req.params.userId);
    const result = await userServices.getSingleUserfromDB(ReqID);
    res.status(200).json({
      succeess: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const updateAUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // console.log('\n from update function of controller:', data);
    const ReqID = parseInt(req.params.userId);
    const result = await userServices.UpdateAUser(ReqID, data);
    // console.log('\nresult from controller:', result);
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const deleteAUser = async (req: Request, res: Response) => {
  try {
    const ReqID = parseInt(req.params.userId);
    const result = await userServices.deleteAUserFromDB(ReqID);
    // console.log('\nresult from controller:', result);
    if (result.acknowledged) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: null,
      });
    }
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // console.log('\n from addNewOrder function of controller:', data);
    const ReqID = parseInt(req.params.userId);
    const result = await userServices.addNewOrder(ReqID, data);
    // console.log('\nresult from controller:', result);
    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: result && null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Order not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const ReqID = parseInt(req.params.userId);
    const result = await userServices.getAllOrders(ReqID);
    // console.log('\nresult from controller:', result);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: {
        orders: result,
      },
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Order not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const ReqID = parseInt(req.params.userId);
    const result = await userServices.calculateTotalPrice(ReqID);
    // console.log('\nresult from controller:', result);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: parseFloat(result.toFixed(3)),
      },
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Order not found',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateAUser,
  deleteAUser,
  addNewOrder,
  getAllOrders,
  calculateTotalPrice,
};
