// 유저 관련 라우터: '/users'로 시작되는 모든 요청 처리
import express from 'express';
const router = express.Router();

// 가짜 유저 데이터
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// GET /users: 저장된 전체 유저 데이터 가져오기
router.get('/', (req, res) => {
    res.json(users);
});

// GET /users/:id: 'users' 배열 중 입력한 id에 해당하는 유저 정보 가져오기
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id); // 각 요소(u)의 id가 입력한 id값과 일치하는지 확인

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// PUT /users/:id : users 배열 중 입력한 id에 해당하는 유저의 name 수정하기
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {  // 해당 id를 가진 유저가 없다면
        return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].name = name; // 유저 이름 수정

    res.status(200).json({ // 응답 상태 '200'은은 'OK'를 의미
        message: `User ${id} updated successfully`,
        user: users[userIndex]
    });
});

export default router;
