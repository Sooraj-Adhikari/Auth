import express from "express";
import 'dotenv/config';
import './Models/db.js';
import bodyParser from "body-parser";
import cors from "cors";
import { AuthRouter } from "./Routes/AuthRouter.js";
import { ProductRouter } from "./Routes/ProductRouter.js";

const app=express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);





const PORT=process.env.PORT;
console.log(PORT);

app.listen(PORT,()=>{
    console.log(`Server listening at port : ${PORT}`);
})


