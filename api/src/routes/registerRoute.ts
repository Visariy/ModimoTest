import { Router } from 'express';
import loginController from '@controllers/login';

const router = Router();

loginController(router);

export default router;
