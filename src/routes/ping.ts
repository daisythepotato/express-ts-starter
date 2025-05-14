// 서버 헬스 체크크 관련 라우터: '/ping'로 시작되는 모든 요청 처리
import express from 'express';
const router = express.Router();

// GET /ping : 서버 작동 상태 점검하기(헬스 체크(Health Check))
router.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

export default router;