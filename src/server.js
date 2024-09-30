import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import route from"./routes/index.js"
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(morgan("combined"));
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
