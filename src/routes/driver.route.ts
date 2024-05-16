import express from 'express';
import DriverController from '../controllers/driver.controller';
import authenticate from '../middlewares/authentication.middleware';
import validate from '../middlewares/validate.middleware';
import { createSchema } from '../schemas/driver.schema';
const { addDriver, getDriver } = new DriverController();
const router = express.Router();

//add a driver
router.post("/", authenticate, validate(createSchema), addDriver);

//get a driver
router.get("/", authenticate, getDriver);

export default router;