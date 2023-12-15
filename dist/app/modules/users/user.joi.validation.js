"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.orderValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const fullNameValidationSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().max(20).trim(),
    lastName: joi_1.default.string().required(),
});
const addressValidationSchema = joi_1.default.object({
    street: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
});
exports.orderValidationSchema = joi_1.default.object({
    productName: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
});
exports.userValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required().max(20),
    fullName: fullNameValidationSchema.required(),
    age: joi_1.default.number().required(),
    email: joi_1.default.string().required().email(),
    isActive: joi_1.default.boolean().default(true),
    hobbies: joi_1.default.array().items(joi_1.default.string()).default([]),
    address: addressValidationSchema.required(),
    orders: joi_1.default.array().items(exports.orderValidationSchema),
});
// export const ValidationSchema = {
//     orderValidationSchema,
// };
