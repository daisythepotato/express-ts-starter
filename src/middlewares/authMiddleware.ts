import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from './CustomError';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedUser extends JwtPayload {
  id: string;
  role: 'user' | 'admin';
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; // 쿠키에서 토큰 꺼내기
    if (!token) throw new CustomError('인증 토큰이 없습니다.', 401);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'string') {
            throw new CustomError('유효하지 않은 토큰입니다.', 401);
        }
        req.user = decoded as DecodedUser;
        next();
    } catch (err) {
        throw new CustomError('유효하지 않은 토큰입니다', 401);
    }
};