import express from 'express';
import dotenv from 'dotenv'
import router from './routers/index.mjs';
import { connectDb } from './helpers/database/connectDatabase.mjs';
import { customErrorHandler } from './middlewares/errors/customeErrorHandler.mjs';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDb();
const app = express();
app.use(express.json());
const PORT= process.env.PORT;
const NODE_ENV= process.env.NODE_ENV;
app.use("/api",router)

//app.get("/",(req,res)=>res.send("asdfg"))
app.use(customErrorHandler)
app.use(express.static(path.join(__dirname,"public")))
console.log(__dirname)
app.listen(PORT,()=>console.log(`App running port ${PORT} ${NODE_ENV}`));
