import express from "express";
import session from "express-session"; // Thêm import cho express-session
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRouters.js";
import doctorsRoutes from "./routes/doctorsRouter.js";
import loginRoutes from "./routes/loginRouter.js";
import registerRoutes from "./routes/registerRouter.js";
import verifyPinRoutes from "./routes/verifyPinRouter.js";
import fogetPasswordRoutes from "./routes/fogetPasswordRouter.js";
import dotenv from "dotenv";
import cors from "cors";

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

app.use(express.json());
app.use(cors({
  origin: "http://localhost:8000", // Thay đổi địa chỉ này cho phù hợp
  credentials: true // Cho phép gửi cookie cùng với yêu cầu
}));
app.use(express.urlencoded({ extended: true }));

// Các route
app.use("/tests", testRoutes);
app.use("/doctors", doctorsRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/verifyPin", verifyPinRoutes);
app.use("/fogetPassword", fogetPasswordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
