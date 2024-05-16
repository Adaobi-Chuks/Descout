import { model, Schema } from "mongoose";
import IDriver from "../interfaces/driver.interface";
import { DATABASES } from "../configs/constants.config";

const driverSchema = new Schema<IDriver>({
    bio: {
        imageUrl: String,
        carUrl: String,
        rating: String,
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

const Driver = model<IDriver>(DATABASES.DRIVER, driverSchema);
export default Driver;