import { Request, Response, NextFunction } from 'express';
import * as StatusService from '../services/StatusService';

export const checkServerStatus = (req: Request, res: Response, next: NextFunction) => {
    try {
        const status = StatusService.getServerStatus();
        res.json(status);
    }  catch (err) {
        next(err);
    }
};