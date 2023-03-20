const imageService = require('../services/ImageService');
const ImageController  = {};
const statClient = require('../config/statsd')
const logger = require('../logger');
const {loggerObj} = require('../services/loggerWrapper');

ImageController.uploadImage = (req,res)=>{
    statClient.increment('endpoints.image.uploadImage');
    var usr = res.locals.user
    const file = req.file;
    console.log(file);
    imageService.uploadImage(req,usr,(error,success,code)=>{
        if(error){
            logger.error(loggerObj(code,error,usr.username));
            return res.status(code).json(error);
        }
        else{
            logger.info(loggerObj(code,success,usr.username));
            return res.status(code).json(success);
        }
    })
}

ImageController.deleteObject = (req,res)=>{
    statClient.increment('endpoints.image.deleteObject');
    var usr = res.locals.user
    const file = req.file;
    console.log(file);
    imageService.deleteImage(req,usr,(error,success,code)=>{
        if(error){
            logger.error(loggerObj(code,error,usr.username));
            return res.status(code).json(error);
        }
        else{
            logger.info(loggerObj(code,success,usr.username));
            return res.status(code).json(success);
        }
    })
}

ImageController.getSingleImage = (req,res)=>{
    statClient.increment('endpoints.image.getSingleImage');
    var usr = res.locals.user
    imageService.getSingleImage(req,usr,(error,success,code)=>{
        if(error){
            logger.error(loggerObj(code,error,usr.username));
            return res.status(code).json(error);
        }
        else{
            logger.info(loggerObj(code,success,usr.username));
            return res.status(code).json(success);
        }
    })
}

ImageController.getImageList = (req,res)=>{
    statClient.increment('endpoints.image.getImageList');
    var usr = res.locals.user
    imageService.getImages(req,usr,(error,success,code)=>{
        if(error){
            logger.error(loggerObj(code,error,usr.username));
            return res.status(code).json(error);
        }
        else{
            logger.info(loggerObj(code,success,usr.username));
            return res.status(code).json(success);
        }
    })
}

module.exports= ImageController;