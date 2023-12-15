"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/', (req, res) => {
    res.send('userRouter it is');
});
exports.userRouter.post('/users', users_controller_1.userController.createUser);
exports.userRouter.get('/users', users_controller_1.userController.getAllUsers);
exports.userRouter.get('/users/:userId', users_controller_1.userController.getSingleUser);
exports.userRouter.patch('/users/:userId', users_controller_1.userController.updateAUser);
exports.userRouter.delete('/users/:userId', users_controller_1.userController.deleteAUser);
exports.userRouter.put('/users/:userId/orders', users_controller_1.userController.addNewOrder);
exports.userRouter.get('/users/:userId/orders', users_controller_1.userController.getAllOrders);
exports.userRouter.get('/users/:userId/orders/total-price', users_controller_1.userController.calculateTotalPrice);
