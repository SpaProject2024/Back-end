import express from "express";
import session from "express-session"; // Thêm import cho express-session
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import route from"./routes/index.js"
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Cấu hình session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Chuỗi bí mật cho phiên làm việc
  resave: false, // Không lưu lại phiên nếu không có sự thay đổi
  saveUninitialized: true, // Lưu lại phiên mới
  cookie: { secure: false } // Thiết lập secure: true nếu bạn sử dụng HTTPS
}));
app.use(morgan("combined"));
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
