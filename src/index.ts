//서버 진입점 : 프로젝트의 시작, 필요한 패키지와 라우터 불러오기

import express from 'express';
import connectDB from './db';
import helloRouter from './routes/hello';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import statusRouter from './routes/status';
import authRouter from './routes/auth';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정(쿠키 허용)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // 쿠키 포함 허용
}))

// JSON 파서 등록
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// DB 연결
connectDB();

// 라우터 등록
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);
app.use('/status', statusRouter);
app.use('/auth', authRouter);
app.use(errorMiddleware);

// 통합 에러 핸들링 미들웨어
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});