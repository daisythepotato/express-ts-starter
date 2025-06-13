import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    error: err.message || '서버 오류가 발생했습니다',
  });
};

export default errorMiddleware;
