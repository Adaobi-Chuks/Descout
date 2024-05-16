import DriverService from "../services/driver.service";
import { Request, Response } from "express";
import CustomResponse from "../utils/helpers/response.util";
import { MESSAGES } from "../configs/constants.config";
import { INTERNAL_SERVER_ERROR, OK, ADDED } from "../utils/statusCodes.util";
import HttpException from "../utils/helpers/httpException.util";
const {
    findByNin,
    create
} = new DriverService();
const {
    CREATED,
    FETCHED
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

    async getDriver(req: Request, res: Response) {

        try {

            const nin = req.params.nin;

            const driver = await findByNin(nin);

            return new CustomResponse(OK, true, FETCHED, res, driver);

        } catch (error) {

            if (error instanceof HttpException) {

                return new CustomResponse(error.status, false, error.message, res);

            }
            return new CustomResponse(INTERNAL_SERVER_ERROR, false, `${UNEXPECTED_ERROR}\n Error: ${error}`, res);
        }
    }
}