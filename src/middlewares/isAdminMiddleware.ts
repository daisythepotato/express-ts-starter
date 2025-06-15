// 403 처리
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../middlewares/CustomError';

export const isAdminMiddleware = (
    req: Request & { user?: { role: 'user' | 'admin' } },
    res: Response,
    next: NextFunction
) => {
    //사용자 정보가 없거나 admin이 아닐 경우
    if (req.user?.role !== 'admin') {
        return next(new CustomError('관리자 권한이 필요합니다.', 403));
    }
    next();
};