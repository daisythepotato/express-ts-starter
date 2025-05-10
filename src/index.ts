import express from 'express';

const app = express();
const PORT = 3000;

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // URL에서 id 추출
  const { name } = req.body; // 요청 바디에서 name 추출

  // 사용자 찾기
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  // 사용자 정보 업데이트
  users[userIndex].name = name;

  res.status(200).json({
    message: `User ${userId} updated successfully`,
    user: users[userIndex]
  });
});

app.get('/status', (req, res) => {
  res.json({
    status: 'OK' ,
    uptime: process.uptime()
  });
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
