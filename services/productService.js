const MESSAGE = require('../constant/messages');
const validate = require('../services/validation');
const {Product,Image} = require('../models')
const {deleteS3Obj} = require('../services/s3')
const service = {};
const logger = require('../logger');

service.createProduct = async (data,usr,func)=>{
   
    var errors = validate.validateProductCreate(data.body);
    if(errors.length>0){
        var errorObj = {
            isSuccess : false,
            errors : errors
        }
       return func(errorObj,null,400);
    }
   const {name, description,sku,manufacturer,quantity} = data.body;
   try{
       
        const product = await Product.create({
            name, 
            description,
            sku,
            manufacturer,
            quantity,
            owner_user_id:usr.id
        });
        const res ={
            id: product.id,
            name:product.name,
            description:product.description,
            sku:product.sku,
            manufacturer:product.manufacturer,
            quantity:product.quantity,
            date_added:product.date_added,
            date_last_updated:product.date_last_updated,
            owner_user_id:product.owner_user_id
        }
        func(null,res,201) ;
    }
    catch(err){
        func(validate.createErrorObj(err),null,400) ;
    }
}
service.updateProduct = async (data,usr,func)=>{
    try{
                var errors = validate.validateProductCreate(data.body);
                if(errors.length>0){
                    var errorObj = {
                        isSuccess : false,
                        errors : errors
                    }
                return func(errorObj,null,400);
                }
                const prodID = data.params.prodID;
                if(!validate.checkID(prodID)){
                    return (func(validate.errorObj(MESSAGE.PROD_ID_STR),null,400));
                }
                var prodData = await Product.findByPk(prodID);
                if(!prodData){
                    return (func(validate.errorObj(MESSAGE.NO_DATA),null,404));
                }
                if(prodData.owner_user_id != usr.id){
                    return (func(validate.errorObj(MESSAGE.FORBIDDEN_SRC),null,403));
                }
                var param = {};
                if(data.body.name){
                    param.name = data.body.name
                }
                if(data.body.description){
                    param.description = data.body.description
                }
                if(data.body.sku){
                    param.sku = data.body.sku
                }
                if(data.body.manufacturer){
                    param.manufacturer = data.body.manufacturer
                }
                if(data.body.quantity){
                    param.quantity = data.body.quantity
                }
                const savedObj = await Product.update(param, { where: { id:prodID } });
                if(savedObj){
                    const message ="successfully updated";
                    return func(null,{message},204);
                }
                else{
                    return  func(validate.errorObj(message.NO_UPDATE),null,400);
                }
    }
    catch(error){
        func(validate.createErrorObj(error),null,400) ;

    }

}
service.patchProduct = async (data,usr,func)=>{
    try{
                var errors = validate.validatePatchProd(data.body);
                if(errors.length>0){
                    var errorObj = {
                        isSuccess : false,
                        errors : errors
                    }
                return func(errorObj,null,400);
                }
                const prodID = data.params.prodID;
                if(!validate.checkID(prodID)){
                    return (func(validate.errorObj(MESSAGE.PROD_ID_STR),null,400));
                }
                var prodData = await Product.findByPk(prodID);
                if(!prodData){
                    return (func(validate.errorObj(MESSAGE.NO_DATA),null,404));
                }
                if(prodData.owner_user_id != usr.id){
                    return (func(validate.errorObj(MESSAGE.FORBIDDEN_SRC),null,403));
                }
                var param = {};
                if(data.body.name){
                    param.name = data.body.name
                }
                if(data.body.description){
                    param.description = data.body.description
                }
                if(data.body.sku){
                    param.sku = data.body.sku
                }
                if(data.body.manufacturer){
                    param.manufacturer = data.body.manufacturer
                }
                if(data.body.quantity){
                    param.quantity = data.body.quantity
                }
                const savedObj = await Product.update(param, { where: { id:prodID } });
                if(savedObj){
                    const message ="successfully updated";
                    return func(null,{message},204);
                }
                else{
                    return  func(validate.errorObj(message.NO_UPDATE),null,400);
                }
    }
    catch(error){
        func(validate.createErrorObj(error),null,400) ;

    }

}


service.deleteProduct = async (data,usr,func)=>{
    const prodID = data.params.prodID;
    console.log(usr);
    if(!validate.checkID(prodID)){
        return (func(validate.errorObj(MESSAGE.PROD_ID_STR),null,400));
    }
    var prodData = await Product.findByPk(prodID);
    if(!prodData){
        return (func(validate.errorObj(MESSAGE.NO_DATA),null,404));
    }
    if(prodData.owner_user_id != usr.id){
        return (func(validate.errorObj(MESSAGE.FORBIDDEN_SRC),null,403));
    }
    const savedObj = await Product.destroy({ where: { id:prodID } });
    if(savedObj){
        const message ="successfully updated";
        var imageData = await Image.findAll({
            where: {
                product_id: prodID
            }
          });
          var imageCopy = [...imageData];
          logger.info({msg:"deleting images for product Delete"})
          imageCopy.forEach(async e=> {
             await deleteS3Obj({Key:e.s3_bucket_path});
             await Image.destroy({ where: { image_id:e.image_id } });
          })
        return func(null,{message},204);
    }
    else{
        return  func(validate.errorObj(message.NO_UPDATE),null,400);
    }
    //delete all images
   

}
service.getProduct = async (data,func)=>{
    const prodID = data.params.prodID;
    if(!validate.checkID(prodID)){
        return (func(validate.errorObj(MESSAGE.PROD_ID_STR),null,400));
    }
    var prodData = await Product.findByPk(prodID);
    if(!prodData){
        return (func({message:MESSAGE.NO_DATA},null,404));
    }
    else{
        return(func(null,prodData,200));
    }
   
}
module.exports = service;