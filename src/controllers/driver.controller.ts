import DriverService from "../services/driver.service";
import { Request, Response } from "express";
import CustomResponse from "../utils/helpers/response.util";
import { MESSAGES } from "../configs/constants.config";
import { INTERNAL_SERVER_ERROR, OK, ADDED, BAD_REQUEST } from "../utils/statusCodes.util";
import HttpException from "../utils/helpers/httpException.util";
const {
    findByNinAndName,
    create,
    findByNin,
    findByName,
    findById
} = new DriverService();
const {
    CREATED,
    FETCHED,
    NO_QUERY
} = MESSAGES.DRIVER;
const {
    UNEXPECTED_ERROR
} = MESSAGES;

export default class DriverController {

    async addDriver(req: Request, res: Response) {

        try {

            const data = req.body;

            const driver = await create(data);

            return new CustomResponse(ADDED, true, CREATED, res, driver);

        } catch (error) {

            if (error instanceof HttpException) {

                return new CustomResponse(error.status, false, error.message, res);

            }
            return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}: ${error}`, res);
        }
    }

    async getDriverByNINAndName(req: Request, res: Response) {

        try {

            const nin = req.query.nin;
            const name = req.query.name;

            if (!nin && !name) {
                return new CustomResponse(BAD_REQUEST, false, NO_QUERY, res);
            }

            const driver = await findByNinAndName(nin as string, name as string);

            return new CustomResponse(OK, true, FETCHED, res, driver);

        } catch (error) {

            if (error instanceof HttpException) {

                return new CustomResponse(error.status, false, error.message, res);

            }
            return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
        }
    }

    async getDriverByNIN(req: Request, res: Response) {

        try {

            const nin = req.params.nin;

            const driver = await findByNin(nin as string);

            return new CustomResponse(OK, true, FETCHED, res, driver);

        } catch (error) {

            if (error instanceof HttpException) {

                return new CustomResponse(error.status, false, error.message, res);

            }
            return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
        }
    }

    async getDriverByName(req: Request, res: Response) {

        try {

            const name = req.params.name;

            const driver = await findByName(name as string);

            return new CustomResponse(OK, true, FETCHED, res, driver);

        } catch (error) {

            if (error instanceof HttpException) {

                return new CustomResponse(error.status, false, error.message, res);

            }
            return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
        }
    }

    async getDriverById(req: Request, res: Response) {

        try {

            const id = req.params.id;

            const driver = await findById(id);

            return new CustomResponse(OK, true, FETCHED, res, driver);

        } catch (error) {

            if (error instanceof HttpException) {

                return new CustomResponse(error.status, false, error.message, res);

            }
            return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
        }
    }
}