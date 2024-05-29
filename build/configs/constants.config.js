"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGES = exports.MAXAGE = exports.DATABASES = exports.BASEPATH = exports.JWT_SECRET = exports.PORT = void 0;
exports.PORT = process.env.PORT || 9871;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.BASEPATH = "/api/v1";
exports.DATABASES = {
    USER: "user",
    DRIVER: "driver"
};
exports.MAXAGE = 3 * 24 * 60 * 60;
exports.MESSAGES = {
    DATABASE: {
        CONNECTED: "Connection to database has been established successfully",
        ERROR: "Unable to connect to database."
    },
    AUTH: {
        TOKEN_ERROR: "Access Denied: Token not provided.",
        INVALID_TOKEN: "Access Denied: Invalid token."
    },
    USER: {
        CREATED: "User created successfully.",
        LOGGEDIN: "User logged in successfully.",
        DUPLICATE_EMAIL: "Email already exist.",
        DUPLICATE_COMPANYNAME: "Company already exist.",
        FETCHED: "User fetched successfully.",
        INVALID_USER: "Invalid credentials."
    },
    DRIVER: {
        CREATED: "Driver added successfully.",
        FETCHED: "Driver's info fetched successfully.",
        DRIVER_NOT_FOUND: "Driver not found.",
        NO_QUERY: "Please provide the needed query.",
    },
    INVALID_ID: "Id doesn't exists.",
    NOT_ID: "Not a valid object Id.",
    UNEXPECTED_ERROR: "An unexpected error occured"
};
