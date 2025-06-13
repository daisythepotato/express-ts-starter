//서버 진입점 : 프로젝트의 시작, 필요한 패키지와 라우터 불러오기

import express from 'express';
import connectDB from './db';
import helloRouter from './routes/hello';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import statusRouter from './routes/status';
import authRouter from './routes/auth';
import { errorMiddleware } from './middlewares/errorMiddleware';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));

// DB 연결
connectDB();

// JSON 파서 등록
app.use(express.json());

// 라우터 등록
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);
app.use('/status', statusRouter);
app.use('/auth', authRouter);
app.use(errorMiddleware);

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
