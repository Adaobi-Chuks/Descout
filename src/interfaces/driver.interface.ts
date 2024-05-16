import { Document } from 'mongoose';

export default interface IDriver extends Document {
    bio: {
        name: string;
        imageUrl: string;
        rating: string;
        carUrl: string;
        gender: string;
        age: string;
        dob: string;
        email: string;
        number: string;
        nin: string;
        address: string;
    };
    ridesInfo: [{
        name: string;
        discplinaryIssue: {
            amount: number;
            comment: string;
        };
        ratings: number;
        trips: number;
        dvi: {
            driverLicense: {
                image: string;
                timestampUploaded: string;
                status: string;
            };
            ownershipCert: {
                image: string;
                timestampUploaded: string;
                status: string;
            };
            lassraCard: {
                image: string;
                timestampUploaded: string;
                status: string;
            };
            lassraCard2: {
                image: string;
                timestampUploaded: string;
                status: string;
            };
            roadWorthinessCertificate: {
                image: string;
                timestampUploaded: string;
                status: string;
            }
        };
        dateJoined: string;
        vehicleName: string;
        modelNo: string;
        licensePlate: string;
        reviews: [{
            review: string;
            star: number;
            timestamp: string;
        }]
    }]
}