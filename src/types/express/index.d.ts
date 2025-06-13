// src/types/express/index.d.ts
import { JwtPayload } from '../../middlewares/authMiddleware';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
