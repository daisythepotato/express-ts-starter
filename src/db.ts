import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env 읽기

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "ouchdang", // 위 URI의 DB 이름과 일치하게
    });
    console.log("MongoDB 연결 성공");
  } catch (err) {
    console.error("MongoDB 연결 실패:", err);
  }
};

export default connectDB;
