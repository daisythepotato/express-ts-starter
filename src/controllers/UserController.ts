import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/UserService';
import { CustomError } from '../middlewares/CustomError';
import User from '../models/User'; 

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};


export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);  // 👈 던진 에러를 미들웨어로 넘김
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await UserService.createUser(req.body.name);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await UserService.updateUser(req.params.id, req.body.name);
    res.json({ message: 'User updated', user: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

export const getProfileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // 비밀번호 제외하고 조회

    if (!user) {
      return next(new CustomError('해당 유저를 찾을 수 없습니다.', 404));
    }

    res.json({ success: true, message: '프로필 조회 성공!', user });
  } catch (err) {
    next(err);
  }
};

export const getMe = (req: Request, res: Response) => {
  res.json({ success: true, message: '내 정보', user: req.user });
};

export const getProtected = (req: Request, res: Response) => {
  res.json({ success: true, message: '보호된 API 접근 성공' });
};

export const getAdminPage = (req: Request, res: Response) => {
  res.json({ success: true, message: '관리자 페이지 접근 성공!', user: req.user, });
};