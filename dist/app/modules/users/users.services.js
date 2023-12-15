"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const users_model_1 = require("./users.model");
const createUserintoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield users_model_1.UserModel.isUserExist(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield users_model_1.UserModel.create(userData);
    const selectedResult = yield users_model_1.UserModel.findOne(result._id).select({
        _id: 0,
        password: 0,
        orders: 0,
        __v: 0,
        'fullName._id': 0,
        'address._id': 0,
    });
    return selectedResult;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.UserModel.find().select({
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
});
const getSingleUserfromDB = (ReqID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield users_model_1.UserModel.isUserExist(ReqID))) {
        throw new Error('User not exist!');
    }
    const result = yield users_model_1.UserModel.findOne({ userId: { $eq: ReqID } }).select({
        _id: 0,
        password: 0,
        orders: 0,
        __v: 0,
        'fullName._id': 0,
        'address._id': 0,
    });
    return result;
});
const UpdateAUser = (ReqID, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield users_model_1.UserModel.isUserExist(ReqID))) {
        throw new Error('User not exist!');
    }
    // console.log('\n from update function of services.ts:', updatedData);
    const result = yield users_model_1.UserModel.findOneAndUpdate({ userId: { $eq: ReqID } }, { $set: updatedData }, { new: true }).select({
        _id: 0,
        password: 0,
        orders: 0,
        __v: 0,
        'fullName._id': 0,
        'address._id': 0,
    });
    // console.log('\n from update function of service.ts after update:', result);
    return result;
});
const deleteAUserFromDB = (ReqID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield users_model_1.UserModel.isUserExist(ReqID))) {
        throw new Error('User not exist!');
    }
    const result = yield users_model_1.UserModel.deleteOne({ userId: { $eq: ReqID } });
    return result;
});
const addNewOrder = (ReqID, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield users_model_1.UserModel.isUserExist(ReqID))) {
        throw new Error('User not exist!');
    }
    // console.log(orderData);
    const resultedUser = yield users_model_1.UserModel.findOne({
        userId: { $eq: ReqID },
    }).select('orders');
    const orderstemp = resultedUser === null || resultedUser === void 0 ? void 0 : resultedUser.orders;
    // console.log('from 91', orderstemp);
    orderstemp === null || orderstemp === void 0 ? void 0 : orderstemp.push(orderData);
    const result = yield users_model_1.UserModel.findOneAndUpdate({ userId: { $eq: ReqID } }, { $set: { orders: orderstemp } }, { new: true });
    // console.log('from 98', result);
    return result;
});
const getAllOrders = (ReqID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield users_model_1.UserModel.isUserExist(ReqID))) {
        throw new Error('User not exist!');
    }
    const resultedUser = yield users_model_1.UserModel.findOne({
        userId: { $eq: ReqID },
    }).select('orders');
    const userObject = resultedUser === null || resultedUser === void 0 ? void 0 : resultedUser.toObject();
    if (userObject) {
        userObject.orders = userObject.orders.map((order) => {
            const { _id } = order, rest = __rest(order, ["_id"]);
            return rest;
        });
    }
    return userObject === null || userObject === void 0 ? void 0 : userObject.orders;
});
const calculateTotalPrice = (ReqID) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield users_model_1.UserModel.isUserExist(ReqID))) {
        throw new Error('User not exist!');
    }
    const resultedUser = yield users_model_1.UserModel.findOne({
        userId: { $eq: ReqID },
    }).select('orders ');
    const userObject = resultedUser === null || resultedUser === void 0 ? void 0 : resultedUser.toObject();
    let sum = 0;
    if (userObject) {
        userObject.orders = userObject.orders.map((order) => {
            const { _id } = order, rest = __rest(order, ["_id"]);
            sum = sum + rest.price * rest.quantity;
            return rest;
        });
    }
    // console.log(userObject?.orders);
    return sum;
});
exports.userServices = {
    createUserintoDB,
    getAllUsers,
    getSingleUserfromDB,
    UpdateAUser,
    deleteAUserFromDB,
    addNewOrder,
    getAllOrders,
    calculateTotalPrice,
};
