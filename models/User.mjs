import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    }
});
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
    if(!this.isModified("password")) next();
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash)=> {
            if(err) next(err);
             this.password = hash;
             next();
        });
    });
})

export default mongoose.model("User",UserSchema);