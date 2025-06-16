import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as AuthController from '../controllers/AuthController';
import User from '../models/User';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getUserById } from '../services/UserService';

const router = express.Router();

router.get('/me', authMiddleware, AuthController.getMe);
router.post('/logout', AuthController.logout);


// 회원가입
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: '이미 존재하는 사용자' });

  const hashedPw = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPw, name });
  await user.save();

  res.status(201).json({ message: '회원가입 성공' });
});

// 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: '사용자 없음' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: '비밀번호 불일치' });

  // Access Token
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  // Refresh Token
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET!, // .env에 별도 비밀키 사용
    { expiresIn: '7d' }
  );

  // 쿠키로 Refresh Token 전달
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
  });

  res.json({ accessToken, refreshToken });
});

// /refresh
router.post('/refresh', (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'Refresh Token 없음' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Refresh Token이 유효하지 않음' });
  }
});

//로그인한 사용자의 자기 정보 조회
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await getUserById(req.user!.id);
    res.json({ user });
  } catch (err) {
    res.status(404).json({ message: '사용자를 찾을 수 없음' });
  }
});

// 로그인한 사용자의 프로필 조회
router.get('/profile', authMiddleware, async (req, res, next) => {
  try {
    const user = await getUserById(req.user!.id);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없음' });
    }

    res.json({
      email: user.email,
      name: user.name,
      id: user._id,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});

export default router;