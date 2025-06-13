import bcrypt from 'bcrypt';;
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { CustomError } from '../middlewares/CustomError';

export const signup = async (name: string, email: string, password: string, role?: 'user' | 'admin') => {
    const exists = await User.findOne ({ email });
    if (exists) throw new CustomError('이미 등록된 이메일입니다.', 400);

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: role || 'user'});
    return await user.save();
};

export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError('이메일 또는 비밀번호가 올바르지 않습니다', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError('이메일 또는 비밀번호가 올바르지 않습니다', 401);

    const token = jwt.sign(
        { userId: user._id, name: user.name , role: user.role},
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    return token;
};