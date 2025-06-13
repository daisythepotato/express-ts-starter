import express from 'express';
import * as AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = express.Router();

router.get('/me', authMiddleware, AuthController.getMe);
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;