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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_config_1 = require("../configs/constants.config");
const base_repository_1 = __importDefault(require("../repositories/base.repository"));
const driver_model_1 = __importDefault(require("../models/driver.model"));
const httpException_util_1 = __importDefault(require("../utils/helpers/httpException.util"));
const statusCodes_util_1 = require("../utils/statusCodes.util");
const mongoose_1 = require("mongoose");
const DriverRepository = new base_repository_1.default(driver_model_1.default);
const { DRIVER_NOT_FOUND } = constants_config_1.MESSAGES.DRIVER;
class DriverService {
    create(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DriverRepository.create(driver);
            }
            catch (error) {
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    findByNinAndName(nin, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchTerms = name.split(' ').map(term => new RegExp(term, 'i'));
                const orConditions = searchTerms.map(term => ({
                    "bio.name": { $regex: term }
                }));
                const driver = yield DriverRepository.findOne({ "bio.nin": nin, $and: orConditions });
                if (!driver)
                    throw new httpException_util_1.default(statusCodes_util_1.NOT_FOUND, DRIVER_NOT_FOUND);
                return driver;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.NOT_FOUND)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    findByNin(nin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driver = yield DriverRepository.findOne({ "bio.nin": nin });
                if (!driver)
                    throw new httpException_util_1.default(statusCodes_util_1.NOT_FOUND, DRIVER_NOT_FOUND);
                return driver;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.NOT_FOUND)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchTerms = name.split(' ').map(term => new RegExp(term, 'i'));
                const orConditions = searchTerms.map(term => ({
                    "bio.name": { $regex: term }
                }));
                const driver = yield DriverRepository.findOne({ $and: orConditions });
                if (!driver)
                    throw new httpException_util_1.default(statusCodes_util_1.NOT_FOUND, DRIVER_NOT_FOUND);
                return driver;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.NOT_FOUND)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    throw new httpException_util_1.default(statusCodes_util_1.BAD_REQUEST, constants_config_1.MESSAGES.NOT_ID);
                }
                const driver = yield DriverRepository.findById(id);
                if (!driver)
                    throw new httpException_util_1.default(statusCodes_util_1.NOT_FOUND, DRIVER_NOT_FOUND);
                return driver;
            }
            catch (error) {
                if ((error.status === statusCodes_util_1.NOT_FOUND) || (error.status === constants_config_1.MESSAGES.NOT_ID))
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
}
exports.default = DriverService;
