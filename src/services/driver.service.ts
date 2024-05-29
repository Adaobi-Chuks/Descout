import { MESSAGES } from "../configs/constants.config";
import IDriver from "../interfaces/driver.interface";
import BaseRepository from "../repositories/base.repository";
import Driver from "../models/driver.model";
import HttpException from "../utils/helpers/httpException.util";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/statusCodes.util";
import { isValidObjectId } from "mongoose";
const DriverRepository = new BaseRepository(
    Driver
);
const { DRIVER_NOT_FOUND } = MESSAGES.DRIVER;

export default class DriverService {

    async create(driver: IDriver) {
        try {

            return await DriverRepository.create(driver);

        } catch (error: any) {

            throw new HttpException(INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async findByNinAndName(nin: string, name: string) {
        try {

            const searchTerms = name.split(' ').map(term => new RegExp(term, 'i'));

            const orConditions = searchTerms.map(term => ({
                "bio.name": { $regex: term }
            }));

            const driver = await DriverRepository.findOne({ "bio.nin": nin, $and: orConditions });

            if (!driver) throw new HttpException(NOT_FOUND, DRIVER_NOT_FOUND);

            return driver;

        } catch (error: any) {

            if (error.status === NOT_FOUND) throw error;

            throw new HttpException(INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async findByNin(nin: string) {
        try {

            const driver = await DriverRepository.findOne({ "bio.nin": nin });

            if (!driver) throw new HttpException(NOT_FOUND, DRIVER_NOT_FOUND);

            return driver;

        } catch (error: any) {

            if (error.status === NOT_FOUND) throw error;

            throw new HttpException(INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async findByName(name: string) {
        try {

            const searchTerms = name.split(' ').map(term => new RegExp(term, 'i'));

            const orConditions = searchTerms.map(term => ({
                "bio.name": { $regex: term }
            }));

            const driver = await DriverRepository.findOne({ $and: orConditions });

            if (!driver) throw new HttpException(NOT_FOUND, DRIVER_NOT_FOUND);

            return driver;

        } catch (error: any) {

            if (error.status === NOT_FOUND) throw error;

            throw new HttpException(INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async findById(id: string) {
        try {

            if(!isValidObjectId(id)) {
                throw new HttpException(BAD_REQUEST, MESSAGES.NOT_ID);
            }
            const driver = await DriverRepository.findById(id);

            if (!driver) throw new HttpException(NOT_FOUND, DRIVER_NOT_FOUND);

            return driver;

        } catch (error: any) {

            if ((error.status === NOT_FOUND) || (error.status === MESSAGES.NOT_ID)) throw error;

            throw new HttpException(INTERNAL_SERVER_ERROR, error.message);
        }
    }

}
