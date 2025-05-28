import User from '../models/User';
import { CustomError } from '../middlewares/CustomError';

export const getAllUsers = () => User.find();

// controller 에서 하던 것 Service 에서 "throw"
export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new CustomError('User not found', 404);
  return user;
};

export const createUser = async (name: string) => {
  if (!name) throw new CustomError('Name is required', 400);
  const newUser = new User({ name });
  return newUser.save();
};

export const updateUser = async (id: string, name: string) => {
  if (!name) throw new CustomError('Name is required', 400);
  const updated = await User.findByIdAndUpdate(id, { name }, { new: true });
  if (!updated) throw new CustomError('User not found', 404);
  return updated;
};

export const deleteUser = async (id: string) => {
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) throw new CustomError('User not found', 404);
  return deleted;
};