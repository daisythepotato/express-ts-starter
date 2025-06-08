import mongoose from "mongoose";

// User 스키마 정의
const userSchema = new mongoose.Schema(
  {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 추가
  }
);

// 모델로 변환해서 export
const User = mongoose.model("User", userSchema);
export default User;