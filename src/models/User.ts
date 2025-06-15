import mongoose from "mongoose";

// User 스키마 정의
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 추가
  }
);

// 모델로 변환해서 export
const User = mongoose.model("User", userSchema);
export default User;