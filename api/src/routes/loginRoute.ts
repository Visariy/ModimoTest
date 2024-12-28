import { Router } from 'express';
import registerController from "@controllers/register";

const router = Router();

registerController(router);

export default router;
