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
  console.log('result from service:', selectedResult);
  return selectedResult;
};

export const userServices = {
  createUserintoDB,
};
