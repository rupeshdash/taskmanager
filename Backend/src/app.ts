import { config } from 'dotenv';
import express from 'express'
import { dbconnect } from './config/db';
import { userRouter } from './Routes/userRoutes';
import { taskRouter } from './Routes/taskRoute';
import { teamRouter } from './Routes/teamRoute';
import authMiddleware from './Middlewares/Authtentication';
const cors = require("cors");

export const app = express();
dbconnect();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes


app.use("/api/user",userRouter)
app.use("/api/v1/task",taskRouter)
app.use("/api/v1/team",teamRouter)



