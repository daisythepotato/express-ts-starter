import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './db';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import statusRouter from './routes/status';
import pingRouter from './routes/ping';

// .env 파일 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB 연결
connectDB();

// 라우트 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/status', statusRouter);
app.use('/ping', pingRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});