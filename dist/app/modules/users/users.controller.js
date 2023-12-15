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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_services_1 = require("./users.services");
const user_joi_validation_1 = require("./user.joi.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { error, value } = user_joi_validation_1.userValidationSchema.validate(data);
        // console.log('\nresult from controller:', result);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'something went wrong.User creation Failed',
                error: error,
            });
        }
        const result = yield users_services_1.userServices.createUserintoDB(value);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong.User creation Failed',
            error: {
                code: err.code,
                description: err.message,
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_services_1.userServices.getAllUsers();
        res.status(200).send({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went Wrong',
            error: {
                code: err.code,
                description: err.message,
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ReqID = parseInt(req.params.userId);
        const result = yield users_services_1.userServices.getSingleUserfromDB(ReqID);
        res.status(200).json({
            succeess: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
const updateAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // console.log('\n from update function of controller:', data);
        const ReqID = parseInt(req.params.userId);
        const result = yield users_services_1.userServices.UpdateAUser(ReqID, data);
        // console.log('\nresult from controller:', result);
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
const deleteAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ReqID = parseInt(req.params.userId);
        const result = yield users_services_1.userServices.deleteAUserFromDB(ReqID);
        // console.log('\nresult from controller:', result);
        if (result.acknowledged) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: null,
            });
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
const addNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // console.log('\n from addNewOrder function of controller:', data);
        const ReqID = parseInt(req.params.userId);
        const { error, value } = user_joi_validation_1.orderValidationSchema.validate(data);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'the provided data is not valid',
                error: error,
            });
        }
        const result = yield users_services_1.userServices.addNewOrder(ReqID, value);
        // console.log('\nresult from controller:', result);
        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            data: result && null,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Order not found',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ReqID = parseInt(req.params.userId);
        const result = yield users_services_1.userServices.getAllOrders(ReqID);
        // console.log('\nresult from controller:', result);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully',
            data: {
                orders: result,
            },
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Order not found',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
const calculateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ReqID = parseInt(req.params.userId);
        const result = yield users_services_1.userServices.calculateTotalPrice(ReqID);
        // console.log('\nresult from controller:', result);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: parseFloat(result.toFixed(3)),
            },
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'Order not found',
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateAUser,
    deleteAUser,
    addNewOrder,
    getAllOrders,
    calculateTotalPrice,
};
