import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import router from "./routes/userRouter.js";

const app = express();
const PORT = 8081;
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
