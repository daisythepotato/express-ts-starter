import mongoose from "mongoose";

// User 스키마 정의
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true }, // 아이디
    password: { type: String, required: true },               // 해시된 비번
    name: { type: String, required: true },                   // 이름
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 추가
  }
);

// 모델로 변환해서 export
export const User = mongoose.model('User', userSchema);