const productService = require('../services/productService');

const ProductController  = {};

ProductController.createProduct = (req,res)=>{
    var usr = res.locals.user  
    productService.createProduct(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    })
}
ProductController.updateProduct = (req,res)=>{
    var usr = res.locals.user  
    productService.updateProduct(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    })
}
ProductController.patchProduct = (req,res)=>{
    var usr = res.locals.user  
    productService.patchProduct(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    })
}
ProductController.deleteController = (req,res)=>{
    var usr = res.locals.user  
    productService.deleteProduct(req,usr,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    });
}
ProductController.getProduct = (req,res)=>{
   
    productService.getProduct(req,(error,success,code)=>{
        if(error){
            return res.status(code).json(error);
        }
        else{
            return res.status(code).json(success);
        }
    });
}

module.exports = ProductController;