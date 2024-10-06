import express from "express";
import session from "express-session"; // Thêm import cho express-session
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRouters.js";
import doctorsRoutes from "./routes/doctorsRouter.js";
import supplierRoutes from "./routes/supplierRouter.js";
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

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/tests", testRoutes);
app.use("/doctors", doctorsRoutes);
app.use("/suppliers", supplierRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
