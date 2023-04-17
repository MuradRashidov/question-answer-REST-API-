import mongoose from "mongoose";
import slugify from "slugify";
import User from "./User.mjs";
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"],
        minlength:[10,"Please provide a title with at less 10 character"],
        unique:true
    },
    content:{
        type:String,
        required:[true,"Please provide a content"],
        minlength:[20,"Please provide a content with at less 20 character"],

    },
    slug:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
        }
    ],
    answers:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Answer",
        }
    ]
})
QuestionSchema.pre("save",function(next){
    if(!this.isModified("title")){
        return next();
    }
    this.slug = this.makeSlug();
    next();
});
QuestionSchema.methods.makeSlug = function(){
    return slugify(this.title, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        //strict: false,     // strip special characters except replacement, defaults to `false`
        //locale: 'vi',      // language code of the locale to use
        // trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })
}

export default mongoose.model("Question",QuestionSchema);