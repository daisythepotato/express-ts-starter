// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || '서버 오류가 발생했습니다';

  res.status(status).json({
    success: false,
    message,
  });
};
