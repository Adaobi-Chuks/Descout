import express from 'express';
import DriverController from '../controllers/driver.controller';
import authenticate, { authenticateCompany } from '../middlewares/authentication.middleware';
import validate from '../middlewares/validate.middleware';
import { createSchema } from '../schemas/driver.schema';
const { addDriver, getDriverByNINAndName, getDriverByNIN, getDriverByName, getDriverById } = new DriverController();
const router = express.Router();

//add a driver
router.post("/", authenticate, validate(createSchema), addDriver);

//get a driver by NIN and Name
router.get("/", authenticate, getDriverByNINAndName);

//get a driver by NIN
router.get("/nin/:nin", authenticate, authenticateCompany, getDriverByNIN);

//get a driver by Name
router.get("/name/:name", authenticate, authenticateCompany, getDriverByName);

//get a driver by id
router.get("/:id", authenticate, authenticateCompany, getDriverById);

export default router;