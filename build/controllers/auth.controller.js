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
const user_service_1 = __importDefault(require("../services/user.service"));
const response_util_1 = __importDefault(require("../utils/helpers/response.util"));
const constants_config_1 = require("../configs/constants.config");
const statusCodes_util_1 = require("../utils/statusCodes.util");
const constants_util_1 = require("../utils/constants.util");
const httpException_util_1 = __importDefault(require("../utils/helpers/httpException.util"));
const { create, validateEmail, validateCompanyname, findByCompanyName, validatePassword, generateAuthToken, generateApiKey } = new user_service_1.default();
const { CREATED, LOGGEDIN, } = constants_config_1.MESSAGES.USER;
const { UNEXPECTED_ERROR } = constants_config_1.MESSAGES;
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield validateEmail(data.email);
                yield validateCompanyname(data.companyName);
                data.apiKey = generateApiKey();
                const user = yield create(data);
                const token = generateAuthToken(user);
                const { _id, companyName, apiKey } = user;
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: constants_config_1.MAXAGE * constants_util_1.THOUSAND
                });
                return new response_util_1.default(statusCodes_util_1.ADDED, true, CREATED, res, { _id, companyName, apiKey, token });
            }
            catch (error) {
                if (error instanceof httpException_util_1.default) {
                    return new response_util_1.default(error.status, false, error.message, res);
                }
                return new response_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}: ${error}`, res);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield findByCompanyName(data.email);
                yield validatePassword(data.password, user);
                const token = generateAuthToken(user);
                const { id, companyName, apiKey } = user;
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: constants_config_1.MAXAGE * constants_util_1.THOUSAND
                });
                return new response_util_1.default(statusCodes_util_1.OK, true, LOGGEDIN, res, { id, companyName, apiKey, token });
            }
            catch (error) {
                if (error instanceof httpException_util_1.default) {
                    return new response_util_1.default(error.status, false, error.message, res);
                }
                return new response_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}: ${error}`, res);
            }
        });
    }
}
exports.default = UserController;
