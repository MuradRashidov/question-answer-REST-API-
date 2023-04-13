import mongoose from "mongoose"; 
const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
    .then(()=>console.log("Mongo DB connection is successful"))
    .catch((err)=>console.log(err.message))
}
export {connectDb};