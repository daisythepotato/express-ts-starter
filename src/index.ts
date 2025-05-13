//서버 진입점 : 프로젝트의 시작, 필요한 패키지와 라우터 불러오기

import express from 'express';
import helloRouter from './routes/hello';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});