import express from 'express';
import DriverController from '../controllers/driver.controller';
import authenticate from '../middlewares/authentication.middleware';
import validate from '../middlewares/validate.middleware';
import { createSchema } from '../schemas/driver.schema';
const { addDriver, getDriverByNINAndName, getDriverByNIN, getDriverByName, getDriverById } = new DriverController();
const router = express.Router();

//add a driver
router.post("/", authenticate, validate(createSchema), addDriver);

//get a driver by NIN and Name
router.get("/", authenticate, getDriverByNINAndName);

//get a driver by NIN
router.get("/nin/:nin", authenticate, getDriverByNIN);

//get a driver by Name
router.get("/name/:name", authenticate, getDriverByName);

//get a driver by Name
router.get("/:id", authenticate, getDriverById);

export default router;