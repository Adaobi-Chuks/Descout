"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driver_controller_1 = __importDefault(require("../controllers/driver.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const driver_schema_1 = require("../schemas/driver.schema");
const { addDriver, getDriverByNINAndName, getDriverByNIN, getDriverByName, getDriverById } = new driver_controller_1.default();
const router = express_1.default.Router();
//add a driver
router.post("/", authentication_middleware_1.default, (0, validate_middleware_1.default)(driver_schema_1.createSchema), addDriver);
//get a driver by NIN and Name
router.get("/", authentication_middleware_1.default, getDriverByNINAndName);
//get a driver by NIN
router.get("/nin/:nin", authentication_middleware_1.default, getDriverByNIN);
//get a driver by Name
router.get("/name/:name", authentication_middleware_1.default, getDriverByName);
//get a driver by Name
router.get("/:id", authentication_middleware_1.default, getDriverById);
exports.default = router;
