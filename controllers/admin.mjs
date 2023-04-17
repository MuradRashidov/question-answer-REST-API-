import expressAsyncWrapper from "express-async-wrapper";
import User from "../models/User.mjs";
const blockUser = expressAsyncWrapper(async(req,res,next) => {
    const {id} = req.user;
    let user = await User.findById(id);
    user.blocked = !user.blocked;
    await user.save();

    return res.status(200).json({success:true,message:user.blocked? "block successful" :  "unblock successful"})
 });
 const deleteUser = expressAsyncWrapper(async(req,res,next) => {
    const {id} = req.params;
    let user = await User.findById(id).lean();
    await User.deleteOne({_id: id});    
    return res.status(200).json({success:true, success: "Delete operation is successful"})
 })
 export {blockUser,deleteUser}