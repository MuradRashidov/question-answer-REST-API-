import { getAccessTokenTokenFromHeader, isTokenIncluded } from "../../helpers/authorization/tokenHelpers.mjs";
import CustomError from "../../helpers/error/CustomError.mjs";
import jwt from "jsonwebtoken";
const getAccessToRoute = (req,res,next) => {

    const {JWT_SECRET_KEY} = process.env;
   if(!isTokenIncluded(req)) {
    return next(new CustomError("You are unauthorized",401));
    
   }
  const accessToken =  getAccessTokenTokenFromHeader(req);
  jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
        return next(new CustomError("You are unauthorized",401));
    }
    console.log(decoded);
    req.user ={
        id:decoded.id,
        name:decoded.name
    }
    next();
  });
}
export {
    getAccessToRoute
};