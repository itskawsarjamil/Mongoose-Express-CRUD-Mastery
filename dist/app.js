"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = require("./app/modules/users/users.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', users_routes_1.userRouter);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hello From Void World',
    });
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
