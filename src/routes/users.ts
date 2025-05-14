// 유저 관련 라우터 : '/users'로 시작되는 모든 요청을 처리

import express from 'express';
const router = express.Router();

// 가짜 유저 데이터
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// GET /users = 전체 유저 정보를 가져온다.
router.get('/', (req, res) => {
  res.json(users);
});

// GET /users/:id = reqest의 id에 해당하는 유저 정보를 가져온다.
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export default router;
