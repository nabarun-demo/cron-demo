"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController_1 = require("../controllers/userController");
class Routes {
    constructor() {
        this.apiRouter = express.Router();
        this.userRouter = express.Router();
        this.configRoutes();
    }
    configRoutes() {
        this.apiRouter.get("/", (req, res) => {
            res.json({
                message: "Welcome to cytel demo API!"
            });
        });
        this.apiRouter.get("/cron/:id", (req, res) => {
            const id = req.params.id;
            console.log(`CRON job called for #${id}`);
            setTimeout(() => {
                console.log(`CRON job call ended for #${id}`);
            }, 15000);
            res.json({
                message: "Welcome to CRON job"
            });
        });
        this.userRouter.get("/", userController_1.default.getAllUsers).post("/", userController_1.default.addUser);
    }
}
exports.default = new Routes();
//# sourceMappingURL=route.js.map