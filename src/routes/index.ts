// 루트 라우터: '/' 요청을 처리하는 파일
import express from 'express';
const router = express.Router();

// GET /: 서버에서 데이터 가져오기
router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

export default router;
