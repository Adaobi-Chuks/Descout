import Joi from "joi";

const createSchema = Joi.object({
    bio: Joi.object({
        name: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        dob: Joi.string().required(),
        email: Joi.string().email().required(),
        number: Joi.string().required(),
        nin: Joi.string().required(),
        address: Joi.string().required(),
    }).required(),
    ridesInfo: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        disciplinaryIssue: Joi.object({
            amount: Joi.number().required(),
            comment: Joi.string().required(),
        }).required(),
        ratings: Joi.number().required(),
        trips: Joi.number().required(),
        dvi: Joi.object({
            driverLicense: Joi.object({
                image: Joi.string().required(),
                timestampUploaded: Joi.string().required(),
                status: Joi.string().required(),
            }).required(),
            ownershipCert: Joi.object({
                image: Joi.string().required(),
                timestampUploaded: Joi.string().required(),
                status: Joi.string().required(),
            }).required(),
            lassraCard: Joi.object({
                image: Joi.string().required(),
                timestampUploaded: Joi.string().required(),
                status: Joi.string().required(),
            }).required(),
            lassraCard2: Joi.object({
                image: Joi.string().required(),
                timestampUploaded: Joi.string().required(),
                status: Joi.string().required(),
            }).required(),
            roadWorthinessCertificate: Joi.object({
                image: Joi.string().required(),
                timestampUploaded: Joi.string().required(),
                status: Joi.string().required(),
            }).required()
        }).required(),
        dateJoined: Joi.string().required(),
        vehicleName: Joi.string().required(),
        modelNo: Joi.string().required(),
        licensePlate: Joi.string().required(),
        reviews: Joi.array().items(Joi.object({
            review: Joi.string().required(),
            star: Joi.number().required().min(1).max(5),
            timestamp: Joi.string().required(),
        })).required()
    })).required()
});

export {
    createSchema
}