import mongoose from "mongoose";

const mongo_url=process.env.MONGO_CONN;

mongoose.connect(mongo_url).then(()=>{
    console.log("Database Connected Successfully...");
}).catch((err)=>{
console.log("MongoDb error : ",err);
})

