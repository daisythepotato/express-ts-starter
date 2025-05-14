import express from 'express';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import statusRouter from './routes/status';
import pingRouter from './routes/ping';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/status', statusRouter);
app.use('/ping', pingRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});