import express from 'express';
import * as UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware';
import { getProfileById, getMe, getProtected, getAdminPage } from '../controllers/UserController';

const router = express.Router();

router.get('/', UserController.getAllUsers);

// 인증된 사용자만 접근 가능
router.get('/profile/:id', authMiddleware, getProfileById);
router.get('/me', authMiddleware, getMe);
router.get('/protected', authMiddleware, getProtected);

// 관리자만 접근 가능
router.get('/admin', authMiddleware, isAdminMiddleware, getAdminPage);

router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);




export default router;