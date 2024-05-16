import { MESSAGES } from "../configs/constants.config";
import IDriver from "../interfaces/driver.interface";
import BaseRepository from "../repositories/base.repository";
import Driver from "../models/driver.model";
import HttpException from "../utils/helpers/httpException.util";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/statusCodes.util";
const DriverRepository = new BaseRepository(
    Driver
);
const { NOT_ID, INVALID_ID } = MESSAGES;

export default class DriverService {

    async create(driver: IDriver) {
        try {

            return await DriverRepository.create(driver);

        } catch (error: any) {

            throw new HttpException(INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async findByNin(nin: string) {
        try {

            const driver = await DriverRepository.findOne({nin: nin});

            if (!driver) throw new HttpException(NOT_FOUND, INVALID_ID);

            return driver;

        } catch (error: any) {

            if (error.status === NOT_FOUND) throw error;

            throw new HttpException(INTERNAL_SERVER_ERROR, error.message);
        }
    }

}
