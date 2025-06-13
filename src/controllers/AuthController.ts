import { Request, Response, NextFunction } from 'express';
import * as AuthService from '../services/AuthService';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }  = req.body;
  try {
    const user = await AuthService.signupUser(email, password);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await AuthService.loginUser(email, password);

    // 로그인 성공 시 토큰을 쿠키에 저장
    res.cookie('token', token, {
      httpOnly: true, // 서버만 쿠키를 읽고 쓸 수 있도록 함
      secure: false, // 개발용이면 false로, https 있으면 true
      sameSite: 'strict', // 동일한 사이트에서만 쿠키 전송
      maxAge: 1000 * 60 * 60, // 1시간 후 쿠키 만료
    });

    res.json({ message: '로그인 성공' });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.getMe(req.user!); // req.user!은 인증 미들웨어에서 넣어준 정보
    res.json({
      success: true,
      message: '접근 성공!',
      user,
    });
  } catch (err) {
    next(err);
  } 
};

// logout은 서버에서 클라이언트 쿠키만 삭제하면 됨 => Service 불필요
export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return res.json({
    success: true,
    message: '로그아웃 성공',
  });
};