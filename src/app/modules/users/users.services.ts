/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { TOrder, TUser } from './users.interface';
import { UserModel } from './users.model';

const createUserintoDB = async (userData: TUser) => {
  if (await UserModel.isUserExist(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await UserModel.create(userData);
  const selectedResult = await UserModel.findOne(result._id).select({
    _id: 0,
    password: 0,
    orders: 0,
    __v: 0,
    'fullName._id': 0,
    'address._id': 0,
  });

  return selectedResult;
};

const getAllUsers = async () => {
  const result = await UserModel.find().select({
    _id: 0,
    userId: 0,
    password: 0,
    isActive: 0,
    hobbies: 0,
    orders: 0,
    __v: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  return result;
};

const getSingleUserfromDB = async (ReqID: number) => {
  if (!(await UserModel.isUserExist(ReqID))) {
    throw new Error('User not exist!');
  }
  const result = await UserModel.findOne({ userId: { $eq: ReqID } }).select({
    _id: 0,
    password: 0,
    orders: 0,
    __v: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  return result;
};

const UpdateAUser = async (ReqID: number, updatedData: TUser) => {
  if (!(await UserModel.isUserExist(ReqID))) {
    throw new Error('User not exist!');
  }
  // console.log('\n from update function of services.ts:', updatedData);
  const result = await UserModel.findOneAndUpdate(
    { userId: { $eq: ReqID } },
    { $set: updatedData },
    { new: true },
  ).select({
    _id: 0,
    password: 0,
    orders: 0,
    __v: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  // console.log('\n from update function of service.ts after update:', result);
  return result;
};
const deleteAUserFromDB = async (ReqID: number) => {
  if (!(await UserModel.isUserExist(ReqID))) {
    throw new Error('User not exist!');
  }
  const result = await UserModel.deleteOne({ userId: { $eq: ReqID } });
  return result;
};

const addNewOrder = async (ReqID: number, orderData: TOrder) => {
  if (!(await UserModel.isUserExist(ReqID))) {
    throw new Error('User not exist!');
  }
  // console.log(orderData);
  const resultedUser = await UserModel.findOne({
    userId: { $eq: ReqID },
  }).select('orders');
  const orderstemp = resultedUser?.orders;
  // console.log('from 91', orderstemp);
  orderstemp?.push(orderData);
  const result = await UserModel.findOneAndUpdate(
    { userId: { $eq: ReqID } },
    { $set: { orders: orderstemp } },
    { new: true },
  );
  // console.log('from 98', result);
  return result;
};

const getAllOrders = async (ReqID: number) => {
  if (!(await UserModel.isUserExist(ReqID))) {
    throw new Error('User not exist!');
  }
  const resultedUser = await UserModel.findOne({
    userId: { $eq: ReqID },
  }).select('orders');
  const userObject = resultedUser?.toObject();
  if (userObject) {
    userObject.orders = userObject.orders.map((order) => {
      const { _id, ...rest } = order;
      return rest;
    });
  }
  return userObject?.orders;
};

const calculateTotalPrice = async (ReqID: number) => {
  if (!(await UserModel.isUserExist(ReqID))) {
    throw new Error('User not exist!');
  }
  const resultedUser = await UserModel.findOne({
    userId: { $eq: ReqID },
  }).select('orders ');
  const userObject = resultedUser?.toObject();
  let sum = 0;
  if (userObject) {
    userObject.orders = userObject.orders.map((order) => {
      const { _id, ...rest } = order;
      sum = sum + rest.price * rest.quantity;
      return rest;
    });
  }
  // console.log(userObject?.orders);
  return sum;
};

export const userServices = {
  createUserintoDB,
  getAllUsers,
  getSingleUserfromDB,
  UpdateAUser,
  deleteAUserFromDB,
  addNewOrder,
  getAllOrders,
  calculateTotalPrice,
};
