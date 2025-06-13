// src/controllers/AuthController.ts

import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/AuthService';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await AuthService.signup(name, email, password, role);
    res.status(201).json({ message: '회원가입 완료', userId: newUser._id });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password,);
    res.json({ message: '로그인 성공', token });
  } catch (err) {
    next(err);
  }
};