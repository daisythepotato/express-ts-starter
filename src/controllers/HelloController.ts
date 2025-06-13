import { Request, Response, NextFunction } from 'express';
import * as HelloServices from '../services/HelloService';

export const Hello = (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = HelloServices.getHelloMessage();
        res.send(message);
    } catch (err) {
        next(err);
    }
};