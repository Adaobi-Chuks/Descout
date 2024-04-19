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
        dvi: [{
            document: string, 
            image: string,
            status: string,
            format: string,
            timestampUploaded: string
        }];
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