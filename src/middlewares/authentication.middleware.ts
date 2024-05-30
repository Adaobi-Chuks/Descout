import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import AuthRequest from "../interfaces/auth.interface";
import CustomResponse from "../utils/helpers/response.util";
import { JWT_SECRET, MESSAGES } from "../configs/constants.config";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from "../utils/statusCodes.util";
import { TWO, ZERO } from "../utils/constants.util";
import HttpException from "../utils/helpers/httpException.util";
const {
    findById,
    findByApiKey
} = new UserService();
const {
    TOKEN_ERROR,
    INVALID_TOKEN
} = MESSAGES.AUTH;
const {
    UNEXPECTED_ERROR
} = MESSAGES;

// check jwt exists & is valid
export default function authenticate(req: Request, res: Response, next: NextFunction) {

    try {
        const tokenHeader = req.headers['authorization'];

        if (!tokenHeader) {
            throw new HttpException(UNAUTHORIZED, TOKEN_ERROR);
        }

        const tokenParts = tokenHeader.split(' ');

        if (tokenParts.length !== TWO || tokenParts[ZERO] !== 'Bearer') {
            throw new HttpException(UNAUTHORIZED, INVALID_TOKEN);
        }

        const token = tokenParts[1];

        jwt.verify(token, JWT_SECRET!, async (err: any, decoded: any) => {
            if (err) {
                throw new HttpException(NOT_FOUND, INVALID_TOKEN);
            } else {
                const authenticatedUser = await findById(decoded.id);
                (req as AuthRequest).user = authenticatedUser;
                next();
            }
        });
        next();

    } catch (error) {
        if (error instanceof HttpException) {

            return new CustomResponse(error.status, false, error.message, res);

        }
        return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
    }
}

function authenticateCompany(req: Request, res: Response, next: NextFunction) {

    try {
        const apiKey = req.headers['Api-Key'];

        if (!apiKey) {
            throw new HttpException(UNAUTHORIZED, "Please provide API key");
        }

        findByApiKey((req as AuthRequest).user._id, apiKey as string).then((user) => {
            next();
        }).catch((error: any) => {
            return new CustomResponse(error.status, false, error.message, res);
        });

    } catch (error) {
        if (error instanceof HttpException) {

            return new CustomResponse(error.status, false, error.message, res);

        }
        return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
    }
}

export {
    authenticateCompany
}