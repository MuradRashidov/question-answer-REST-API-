import express from 'express';
import dotenv from 'dotenv'
import router from './routers/index.mjs';
import { connectDb } from '../helpers/database/connectDb.mjs';

dotenv.config();
connectDb();
const app = express();
const PORT= process.env.PORT;
const NODE_ENV= process.env.NODE_ENV;

app.use("/api",router)

//app.get("/",(req,res)=>res.send("asdfg"))
app.listen(PORT,()=>console.log(`App running port ${PORT} ${NODE_ENV}`));
