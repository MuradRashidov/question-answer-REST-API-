import mongoose from "mongoose";
import slugify from "slugify";
import User from "./User.mjs";
import Question from "./Question.mjs";
import expressAsyncWrapper from "express-async-wrapper";
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    
    content:{
        type:String,
        required:[true,"Please provide a content"],
        minlength:[10,"Please provide a content with at less 10 character"],

    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true

    },
    
    question:
        {
            type:mongoose.Schema.ObjectId,
            ref:"Question",
            required:true
        }
    
})
AnswerSchema.pre("save",  async function(next){
    const self = this;
  try{
    if(!self.isModified("user")) return next();
  
    const question = await Question.findById(self.question);
    question.answers.push(self.id);
    await question.save();
    next()
  }
  catch(err){
    return next(err);
  }
console.log(this);


});


export default mongoose.model("Answer",AnswerSchema);