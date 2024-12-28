import { Router } from 'express';
import { adminLoginController, adminUserController } from "@controllers/admin";

const router = Router();

adminLoginController(router);
adminUserController(router);

export default router;
