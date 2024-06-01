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
exports.authenticateCompany = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const response_util_1 = __importDefault(require("../utils/helpers/response.util"));
const constants_config_1 = require("../configs/constants.config");
const statusCodes_util_1 = require("../utils/statusCodes.util");
const constants_util_1 = require("../utils/constants.util");
const httpException_util_1 = __importDefault(require("../utils/helpers/httpException.util"));
const { findById, findByApiKey } = new user_service_1.default();
const { TOKEN_ERROR, INVALID_TOKEN } = constants_config_1.MESSAGES.AUTH;
const { UNEXPECTED_ERROR } = constants_config_1.MESSAGES;
// check jwt exists & is valid
function authenticate(req, res, next) {
    try {
        const tokenHeader = req.headers['authorization'];
        if (!tokenHeader) {
            throw new httpException_util_1.default(statusCodes_util_1.UNAUTHORIZED, TOKEN_ERROR);
        }
        const tokenParts = tokenHeader.split(' ');
        if (tokenParts.length !== constants_util_1.TWO || tokenParts[constants_util_1.ZERO] !== 'Bearer') {
            console.log(1, tokenParts);
            throw new httpException_util_1.default(statusCodes_util_1.UNAUTHORIZED, INVALID_TOKEN);
        }
        const token = tokenParts[1];
        jsonwebtoken_1.default.verify(token, constants_config_1.JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(2, err);
                return new response_util_1.default(statusCodes_util_1.NOT_FOUND, false, INVALID_TOKEN, res);
            }
            else {
                const authenticatedUser = yield findById(decoded.id);
                req.user = authenticatedUser;
                next();
            }
        }));
    }
    catch (error) {
        if (error instanceof httpException_util_1.default) {
            return new response_util_1.default(error.status, false, error.message, res);
        }
        return new response_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
    }
}
exports.default = authenticate;
function authenticateCompany(req, res, next) {
    try {
        const apiKey = req.headers['Api-Key'];
        if (!apiKey) {
            throw new httpException_util_1.default(statusCodes_util_1.UNAUTHORIZED, "Please provide API key");
        }
        findByApiKey(req.user._id, apiKey).then((user) => {
            next();
        }).catch((error) => {
            return new response_util_1.default(error.status, false, error.message, res);
        });
    }
    catch (error) {
        if (error instanceof httpException_util_1.default) {
            return new response_util_1.default(error.status, false, error.message, res);
        }
        return new response_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
    }
}
exports.authenticateCompany = authenticateCompany;
