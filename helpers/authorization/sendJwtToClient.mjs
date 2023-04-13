const sendJwtToClient = (user,res) => {
      const {JWT_COOKIE,NODE_ENV} = process.env;
      const token = user.generateJwtFromUser();
      return res.status(200).cookie("access_token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + parseInt(JWT_COOKIE)*1000),
        secure:JWT_COOKIE === "development" ? true : false
      }).json({
        success:true,
        access_token:token,
        data:{
            name:user.name,
            email:user.email
        }

      });
}
export {sendJwtToClient}