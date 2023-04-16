import multer from "multer";
import CustomError from "../../helpers/error/CustomError.mjs";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: function(req,file,cb){
       //const rootDir = path.dirname(require.main.filename);
       //console.log(appDir)
       cb(null,path.join(__dirname,"public","uploads"))
    },
    filename: function(req,file,cb){
        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_" + req.user.id + "." + extension;
        cb(null,req.savedProfileImage)
    }

})
const fileFilter = (req,file,cb) => {
    let allowedMimeTypes = ["image/jpg","image/gif","image/jpeg","image/png"];
    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("Fayl tipi düzgün deyil",400),false);
    }
    return cb(null,true);

}
const profileImageUpload = multer({storage,fileFilter});

export {profileImageUpload}