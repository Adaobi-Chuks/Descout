"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_config_1 = require("../configs/constants.config");
const driverSchema = new mongoose_1.Schema({
    bio: {
        name: String,
        gender: String,
        age: String,
        dob: String,
        email: String,
        number: String,
        nin: String,
        address: String
    },
    ridesInfo: [{
            name: String,
            disciplinaryIssue: {
                amount: Number,
                comment: String
            },
            ratings: Number,
            trips: Number,
            dvi: {
                driverLicense: {
                    image: String,
                    timestampUploaded: String,
                    status: String
                },
                ownershipCert: {
                    image: String,
                    timestampUploaded: String,
                    status: String
                },
                lassraCard: {
                    image: String,
                    timestampUploaded: String,
                    status: String
                },
                lassraCard2: {
                    image: String,
                    timestampUploaded: String,
                    status: String
                },
                roadWorthinessCertificate: {
                    image: String,
                    timestampUploaded: String,
                    status: String
                }
            },
            dateJoined: String,
            vehicleName: String,
            modelNo: String,
            licensePlate: String,
            reviews: [{
                    review: String,
                    star: Number,
                    timestamp: String
                }]
        }]
}, {
    strict: true,
    versionKey: false
});
const Driver = (0, mongoose_1.model)(constants_config_1.DATABASES.DRIVER, driverSchema);
exports.default = Driver;
