import express from 'express';
import * as HelloController from '../controllers/HelloController'

const router = express.Router();

router.get('/hello', HelloController.Hello);

export default router;