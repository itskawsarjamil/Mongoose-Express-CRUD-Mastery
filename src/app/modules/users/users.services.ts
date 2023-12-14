import { TUser } from './users.interface';
import { UserModel } from './users.model';

const createUserintoDB = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  const selectedResult = await UserModel.findById(result._id).select({
    _id: 0,
    password: 0,
    orders: 0,
    __v: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  //   .select(
  //   '-_id -password -orders -__v',
  // )
  // console.log('result from service:', selectedResult);
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

const getSingleUserfromDB = async (ReqID: number | string) => {
  console.log(ReqID);
  const result = await UserModel.findOne({ userId: { $eq: ReqID } }).select({
    _id: 0,
    password: 0,
    orders: 0,
    __v: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  console.log(result);
  return result;
};

export const userServices = {
  createUserintoDB,
  getAllUsers,
  getSingleUserfromDB,
};
