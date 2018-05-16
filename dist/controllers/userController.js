"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const class_validator_1 = require("class-validator");
class UserController {
    constructor() { }
    getAllUsers(req, res, next) {
        // Add code to get all users
        res.status(200).json({ message: "Get all users!", users: [] });
    }
    addUser(req, res, next) {
        const user = new user_1.User(req.body.username, req.body.email, parseInt(req.body.age, 10));
        // console.log(book);
        class_validator_1.validate(user, { validationError: { target: false } }).then(errors => {
            if (errors.length > 0) {
                res.status(500).json({ message: "Validation error", errors });
            }
            else {
                // Add user to db
                res.status(201).json({ message: "User added!", user });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map