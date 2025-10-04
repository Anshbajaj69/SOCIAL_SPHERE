import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());  // too parse req.body
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is runnning on port ${PORT}`);
    connectMongoDB();
});
