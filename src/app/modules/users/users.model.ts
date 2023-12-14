/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './users.interface';

import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required. Please provide the first name.'],
    maxlength: [20, 'Name can not be more than 20'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required. Please provide the last name.'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required.'],
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  country: {
    type: String,
    required: [true, 'Country is required.'],
  },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, `user id is required`],
  },
  username: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
    // validate: {
    //   validator: function (value: string) {
    //   },
    //   message: '{VALUE} is not unique',
    // },
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'fullname is required. Please provide the name.'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    type: addressSchema,
    required: [true, 'address is required'],
  },
  orders: [
    {
      productName: {
        type: String,
        required: [true, 'Product name is required.'],
      },
      price: { type: Number, required: [true, 'Price is required.'] },
      quantity: { type: Number, required: [true, 'Quantity is required.'] },
    },
  ],
});

userSchema.pre('save', async function (next) {
  const user = this;
  console.log('pre hook:', this);
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware/hook
userSchema.post('save', function (doc, next) {
  console.log(this, 'post hook : we saved our data');
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', userSchema);
