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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const base_repository_1 = __importDefault(require("../repositories/base.repository"));
const user_model_1 = __importDefault(require("../models/user.model"));
const httpException_util_1 = __importDefault(require("../utils/helpers/httpException.util"));
const statusCodes_util_1 = require("../utils/statusCodes.util");
const UserRepository = new base_repository_1.default(user_model_1.default);
const { INVALID_USER, DUPLICATE_EMAIL, DUPLICATE_COMPANYNAME } = constants_config_1.MESSAGES.USER;
const { NOT_ID, INVALID_ID } = constants_config_1.MESSAGES;
class UserService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository.create(user);
            }
            catch (error) {
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    validateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield UserRepository.findOne({ email }))
                    throw new httpException_util_1.default(statusCodes_util_1.CONFLICT, DUPLICATE_EMAIL);
                return true;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.CONFLICT)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    validateCompanyname(companyName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield UserRepository.findOne({ companyName }))
                    throw new httpException_util_1.default(statusCodes_util_1.CONFLICT, DUPLICATE_COMPANYNAME);
                return true;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.CONFLICT)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    findByCompanyName(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserRepository.findOne({ email });
                if (!user)
                    throw new httpException_util_1.default(statusCodes_util_1.NOT_FOUND, INVALID_USER);
                return user;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.NOT_FOUND)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    findByApiKey(_id, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserRepository.findOne({ _id, apiKey });
                if (!user)
                    throw new httpException_util_1.default(statusCodes_util_1.NOT_FOUND, INVALID_USER);
                return user;
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
                const user = yield UserRepository.findById(id);
                if (!user)
                    throw new httpException_util_1.default(statusCodes_util_1.NOT_FOUND, INVALID_ID);
                return user;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.NOT_FOUND)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserRepository.find();
            }
            catch (error) {
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    validateId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield UserRepository.validateId(id)))
                    throw new httpException_util_1.default(statusCodes_util_1.FORBIDDEN, NOT_ID);
                return true;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.FORBIDDEN)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    validatePassword(password, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!validPassword)
                    throw new httpException_util_1.default(statusCodes_util_1.UNAUTHORIZED, INVALID_USER);
                return true;
            }
            catch (error) {
                if (error.status === statusCodes_util_1.UNAUTHORIZED)
                    throw error;
                throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
            }
        });
    }
    generateAuthToken(user) {
        try {
            return jsonwebtoken_1.default.sign({
                id: user._id,
                email: user.email,
            }, process.env.JWT_SECRET, {
                expiresIn: constants_config_1.MAXAGE,
            });
        }
        catch (error) {
            throw new httpException_util_1.default(statusCodes_util_1.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    generateApiKey() {
        return (0, crypto_1.randomBytes)(30).toString('hex');
    }
}
exports.default = UserService;
