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

// POST /users = 새로운 유저를 생성한다.
router.post('/', (req, res) => {
  const { name } = req.body;
  const newUser = {
    id: Math.max(...users.map(u => u.id))+1, name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE /users/:id = 해당 id의 유저를 삭제한다.
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id == id);

  if (index === -1){
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  return res.json({ message: 'User deleted' });
});

export default router;
