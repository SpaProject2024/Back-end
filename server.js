import express from "express";
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRouters.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/tests", testRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
