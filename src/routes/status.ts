// 서버 상태 관련 라우터: '/status'로 시작되는 모든 요청 처리
import express from 'express';
const router = express.Router();

// GET /status : 서버 상태 확인하기
router.get('/', (req, res) => {
  try {
    if (Math.random() < 0.5) { // Random Error
      throw new Error('Random error occurred!');
    }

    res.json({ // 서버 연결
      status: 'OK',
      uptime: process.uptime(), // 서버가 시작된 이후 경과한 시간
    });

  } catch (error) { // 에러 발생
    res.status(500).json({
      status: 'Error',
      message: (error as Error).message,
    });
  }
});

export default router;
