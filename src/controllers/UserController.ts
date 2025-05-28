import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/UserService';

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