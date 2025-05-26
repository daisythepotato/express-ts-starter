import mongoose from "mongoose";

// User 스키마 정의
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// 모델로 변환해서 export
const User = mongoose.model("User", userSchema);
export default User;