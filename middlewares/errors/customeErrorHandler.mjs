import CustomError from "../../helpers/error/CustomError.mjs";

const customErrorHandler = (err,req,res,next) => {
    let customError = err;
    if(err.name==="SyntaxError"){
        customError = new CustomError("Unexcepted Syntax",400)
    }
    if(err.name==="CastError"){
        customError = new CustomError("Please provide a valid id",400)
    }
    if(err.name==="ValidationError"){
        customError = new CustomError(err.message,400)
    }
    if(err.code===11000){
        customError = new CustomError("Duplicate key found: Check your inputs",400)   
    }
    console.log(err.message);
    res.status(customError.status || 500).json({
        success:false,
        message:err.message
    });

}
export {customErrorHandler};