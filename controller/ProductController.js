const productService = require('../services/productService');

const ProductController  = {};
const statClient = require('../config/statsd')
const logger = require('../logger');
const {loggerObj} = require('../services/loggerWrapper');

ProductController.createProduct = (req,res)=>{
    statClient.increment('endpoints.product.createProduct');
    var usr = res.locals.user 
    productService.createProduct(req,usr,(error,success,code)=>{
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
ProductController.updateProduct = (req,res)=>{
    statClient.increment('endpoints.product.updateProduct');
    var usr = res.locals.user  
    productService.updateProduct(req,usr,(error,success,code)=>{
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
ProductController.patchProduct = (req,res)=>{
    statClient.increment('endpoints.product.patchProduct');
    var usr = res.locals.user  
    productService.patchProduct(req,usr,(error,success,code)=>{
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
ProductController.deleteController = (req,res)=>{
    statClient.increment('endpoints.product.deleteController');
    var usr = res.locals.user  
    productService.deleteProduct(req,usr,(error,success,code)=>{
        if(error){
            logger.error(loggerObj(code,error,usr.username));
            return res.status(code).json(error);
        }
        else{
            logger.info(loggerObj(code,success,usr.username));
            return res.status(code).json(success);
        }
    });
}
ProductController.getProduct = (req,res)=>{
    statClient.increment('endpoints.product.getProduct');
    productService.getProduct(req,(error,success,code)=>{
        if(error){
            logger.error(loggerObj(code,error,null));
            return res.status(code).json(error);
        }
        else{
            logger.info(loggerObj(code,success,null));
            return res.status(code).json(success);
        }
    });
}

module.exports = ProductController;