// 서버 상태 관련 라우터: '/status'로 시작되는 모든 요청 처리
import express from 'express';
import * as StatusController from '../controllers/StatusController';

const router = express.Router();

router.get('/', StatusController.checkServerStatus);

export default router;
