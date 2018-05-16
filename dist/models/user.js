"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class User {
    constructor(username, email, age) {
        this.username = username;
        this.email = email;
        this.age = age;
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "$property is required" }),
    class_validator_1.MinLength(5, {
        each: true,
        message: "$property is too short. Minimal length is $value characters"
    }),
    class_validator_1.MaxLength(50, {
        each: true,
        message: "$property is too long. Maximal length is $value characters"
    })
], User.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: "$property is required" }),
    class_validator_1.IsEmail({}, { message: "Please enter valid $property" })
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsInt({ message: "$property must be numeric" }),
    class_validator_1.IsNotEmpty({ message: "$property is required" }),
    class_validator_1.IsPositive()
], User.prototype, "age", void 0);
exports.User = User;
//# sourceMappingURL=user.js.map