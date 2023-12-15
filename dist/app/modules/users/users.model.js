"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
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
const addressSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, `user id is required`],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'User Name is required'],
        unique: true,
        // validate: {
        //   validator: async function (value: string) {
        //     const result = await UserModel.findOne({
        //       username: { $eq: value },
        //     });
        //     return result;
        //     message: '{VALUE} is not unique',
        //   },
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // console.log('pre hook:', this);
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.pre('findOneAndUpdate', function (next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const updatedData = this.getUpdate(); //This is an object type in TypeScript. It indicates that the object may have a $set property, and if it does, the value of that property should be of type TUser.
        const password = (_a = updatedData.$set) === null || _a === void 0 ? void 0 : _a.password;
        // console.log(
        //   '\npre hook of updateone operation:',
        //   updatedData,
        //   'akdjksd:',
        //   password,
        // );
        if (password) {
            updatedData.$set.password = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
});
// //post save middleware/hook
// userSchema.post('save', function (doc, next) {
//   // console.log(this, 'post hook : we saved our data');
//   doc.password = '';
//   next();
// });
// //post save middleware/hook
// userSchema.post('findOneAndUpdate', function (doc, next) {
//   console.log('\npost hook : we updated our data', doc);
//   doc.password = '';
//   next();
// });
userSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.UserModel.findOne({ userId: { $eq: id } });
        return result;
    });
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
