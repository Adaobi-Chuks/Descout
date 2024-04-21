import { Router, Request, Response, Application } from 'express';
import userRoute from "./user.route";
import authRoute from "./auth.route";
import driverRoute from "./driver.route";
import { OK } from '../utils/statusCodes.util';
const router: Router = Router();
import CustomResponse from "../utils/helpers/response.util";

/**API base route */
router.get("/", (req: Request, res: Response) => {
    return new CustomResponse(OK, true, "Welcome to Descout API ensure to go through the API docs before using this service", res);
});

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/driver", driverRoute);

export default router;