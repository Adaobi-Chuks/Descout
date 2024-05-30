"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driver_controller_1 = __importDefault(require("../controllers/driver.controller"));
const authentication_middleware_1 = __importStar(require("../middlewares/authentication.middleware"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const driver_schema_1 = require("../schemas/driver.schema");
const { addDriver, getDriverByNINAndName, getDriverByNIN, getDriverByName, getDriverById } = new driver_controller_1.default();
const router = express_1.default.Router();
//add a driver
router.post("/", authentication_middleware_1.default, (0, validate_middleware_1.default)(driver_schema_1.createSchema), addDriver);
//get a driver by NIN and Name
router.get("/", authentication_middleware_1.default, getDriverByNINAndName);
//get a driver by NIN
router.get("/nin/:nin", authentication_middleware_1.default, authentication_middleware_1.authenticateCompany, getDriverByNIN);
//get a driver by Name
router.get("/name/:name", authentication_middleware_1.default, authentication_middleware_1.authenticateCompany, getDriverByName);
//get a driver by id
router.get("/:id", authentication_middleware_1.default, authentication_middleware_1.authenticateCompany, getDriverById);
exports.default = router;
