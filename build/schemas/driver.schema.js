"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createSchema = joi_1.default.object({
    bio: joi_1.default.object({
        name: joi_1.default.string().required(),
        gender: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        dob: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        number: joi_1.default.string().required(),
        nin: joi_1.default.string().required(),
        address: joi_1.default.string().required(),
    }).required(),
    ridesInfo: joi_1.default.array().items(joi_1.default.object({
        name: joi_1.default.string().required(),
        disciplinaryIssue: joi_1.default.object({
            amount: joi_1.default.number().required(),
            comment: joi_1.default.string().required(),
        }).required(),
        ratings: joi_1.default.number().required(),
        trips: joi_1.default.number().required(),
        dvi: joi_1.default.object({
            driverLicense: joi_1.default.object({
                image: joi_1.default.string().required(),
                timestampUploaded: joi_1.default.string().required(),
                status: joi_1.default.string().required(),
            }).required(),
            ownershipCert: joi_1.default.object({
                image: joi_1.default.string().required(),
                timestampUploaded: joi_1.default.string().required(),
                status: joi_1.default.string().required(),
            }).required(),
            lassraCard: joi_1.default.object({
                image: joi_1.default.string().required(),
                timestampUploaded: joi_1.default.string().required(),
                status: joi_1.default.string().required(),
            }).required(),
            lassraCard2: joi_1.default.object({
                image: joi_1.default.string().required(),
                timestampUploaded: joi_1.default.string().required(),
                status: joi_1.default.string().required(),
            }).required(),
            roadWorthinessCertificate: joi_1.default.object({
                image: joi_1.default.string().required(),
                timestampUploaded: joi_1.default.string().required(),
                status: joi_1.default.string().required(),
            }).required()
        }).required(),
        dateJoined: joi_1.default.string().required(),
        vehicleName: joi_1.default.string().required(),
        modelNo: joi_1.default.string().required(),
        licensePlate: joi_1.default.string().required(),
        reviews: joi_1.default.array().items(joi_1.default.object({
            review: joi_1.default.string().required(),
            star: joi_1.default.number().required().min(1).max(5),
            timestamp: joi_1.default.string().required(),
        })).required()
    })).required()
});
exports.createSchema = createSchema;
