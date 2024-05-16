"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_schema_1 = require("../schemas/user.schema");
const router = express_1.default.Router();
const { signUp, login } = new auth_controller_1.default();
//create a user or signup
router.post("/", (0, validate_middleware_1.default)(user_schema_1.signupSchema), signUp);
//login a user
router.post("/login", (0, validate_middleware_1.default)(user_schema_1.loginSchema), login);
exports.default = router;
