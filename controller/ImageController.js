const imageService = require('../services/ImageService');
const ImageController  = {};

ImageController.uploadImage = (req,res)=>{
    var usr = res.locals.user
    const file = req.file;
    console.log(file);
    imageService.uploadImage(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    })
}

ImageController.deleteObject = (req,res)=>{
    var usr = res.locals.user
    const file = req.file;
    console.log(file);
    imageService.deleteImage(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    })
}

ImageController.getSingleImage = (req,res)=>{
    var usr = res.locals.user
    imageService.getSingleImage(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    })
}

ImageController.getImageList = (req,res)=>{
    var usr = res.locals.user
   

    imageService.getImages(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    })
}

module.exports= ImageController;