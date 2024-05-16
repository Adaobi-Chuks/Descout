"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const response_util_1 = __importDefault(require("../utils/helpers/response.util"));
const constants_config_1 = require("../configs/constants.config");
const statusCodes_util_1 = require("../utils/statusCodes.util");
const httpException_util_1 = __importDefault(require("../utils/helpers/httpException.util"));
const { findById } = new user_service_1.default();
const { TOKEN_ERROR, INVALID_TOKEN } = constants_config_1.MESSAGES.AUTH;
const { UNEXPECTED_ERROR } = constants_config_1.MESSAGES;
// check jwt exists & is valid
function authenticate(req, res, next) {
    try {
        // const tokenHeader = req.headers['authorization'] || req.cookies.token;
        // if (!tokenHeader) {
        //     throw new HttpException(UNAUTHORIZED, TOKEN_ERROR);
        // }
        // const tokenParts = tokenHeader.split(' ');
        // if (tokenParts.length !== TWO || tokenParts[ZERO] !== 'Bearer') {
        //     throw new HttpException(UNAUTHORIZED, INVALID_TOKEN);
        // }
        // const token = tokenParts[1];
        // jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
        //     if (err) {
        //         throw new HttpException(NOT_FOUND, INVALID_TOKEN);
        //     } else {
        //         console.log(decoded)
        //         const authenticatedUser = await findById(decoded.id);
        //         (req as AuthRequest).user = authenticatedUser;
        //         next();
        //     }
        // });
        next();
    }
    catch (error) {
        if (error instanceof httpException_util_1.default) {
            return new response_util_1.default(error.status, false, error.message, res);
        }
        return new response_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
    }
}
exports.default = authenticate;
