// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../middlewares/CustomError';

// src/middlewares/authMiddleware.ts
export interface JwtPayload {
  id: string;
  role: 'user' | 'admin';
}

export const authMiddleware = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError('토큰이 존재하지 않습니다다.', 401));
  }

  //공백 기준으로 나눠서 실제 토큰만 추출
  const token = authHeader.split(' ')[1];

  try {
    // 토큰 유효성 검증증
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded; // 사용자 정보 req.user에 저장장
    next();
  } catch (err) {
    next(new CustomError('유효하지 않은 토큰입니다.', 401));
  }
};


