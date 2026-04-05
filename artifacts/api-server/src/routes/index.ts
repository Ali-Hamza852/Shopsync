import { Router, type IRouter } from "express";
import healthRouter from "./health";
import fetchImageRouter from "./fetch-image";

const router: IRouter = Router();

router.use(healthRouter);
router.use(fetchImageRouter);

export default router;
