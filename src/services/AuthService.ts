import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import { CustomError } from '../middlewares/CustomError';
import { hashPassword, comparePassword } from '../utils/hash';

export const signupUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new CustomError('이미 존재하는 이메일입니다.', 409);

  const hashed = await hashPassword(password); // ✅ 해시 유틸 사용
  const newUser = await User.create({ email, password: hashed });

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new CustomError('User not found', 404);

  const isMatch = await comparePassword(password, existingUser.password); // ✅ 비교 유틸 사용
  if (!isMatch) throw new CustomError('비밀번호 불일치', 401);

  const token = jwt.sign(
    { userId: existingUser._id },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return { user: existingUser, token };
};

export const getMe = async (user: JwtPayload | string) => {
  if (typeof user === 'string') throw new CustomError('유효하지 않은 사용자 정보입니다.');

  const foundUser = await User.findById(user.userId);
  if (!foundUser) throw new CustomError('User not found', 404);

  return {
    id: foundUser.id,
    email: foundUser.email,
    createdAt: foundUser.createdAt,
    updatedAt: foundUser.updatedAt,
  };
};