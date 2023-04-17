import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import Question from "./Question.mjs";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"Ad yazmamısan"]
    },
    email:{
        type:String,
        required:[true,"Email yazmamısan"],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Düzgün yaz"]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        minLength:[6,"Şifrə 6-dan az olmalıdı"],
        required:[true,"password yazmamısan"],
        select:[false]
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String,
    },
    about:{
        type:String,
    },
    pleace:{
        type:String,
    },
    website:{
        type:String,
    },
    profile_image:{
        type:String,
        default:"default.jpg"
    },
    blocked:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
});
UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const {RESET_PASSWORD_EXPIRE} = process.env;
    const randomHexString = crypto.randomBytes(15).toString("hex");
    console.log(randomHexString);
    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex")
    //console.log(resetPasswordToken);
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
    return resetPasswordToken;

}
UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
    const payload = {
        id:this._id,
        name:this.name
    };
    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });  
    return token;
}
UserSchema.pre("save",function(next){    
    if(!this.isModified("password")) {
        return next()
    };
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash)=> {
            if(err) next(err);
             this.password = hash;
             next();
        });
    });
});
UserSchema.post("deleteOne",async function(){
    const filter = this.getFilter();

  await Question.deleteMany({
   user:filter._id
  })
  console.log(this.id)
});

export default mongoose.model("User",UserSchema);