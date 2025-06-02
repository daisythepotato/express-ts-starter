//서버 진입점 : 프로젝트의 시작, 필요한 패키지와 라우터 불러오기

import express from 'express';
import connectDB from './db';
import helloRouter from './routes/hello';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import statusRouter from './routes/status';
import authRouter from './routes/auth';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 공통 로그 추가
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

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// 통합 에러 핸들링 미들웨어
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});