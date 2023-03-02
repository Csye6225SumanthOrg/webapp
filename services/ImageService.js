const MESSAGE = require('../constant/messages');
const validate = require('../services/validation');
const {Product,Image} = require('../models')
const {upload,deleteS3Obj} = require('./s3'); 

const service = {};

service.uploadImage = async (data,usr,func)=>{
    try{
                // var errors = validate.validateProductCreate(data.body);
                // if(errors.length>0){
                //     var errorObj = {
                //         isSuccess : false,
                //         errors : errors
                //     }
                // return func(errorObj,null,400);
                // }
                const prodID = data.params.prodID;
                if(!validate.checkID(prodID)){
                    return (func(validate.errorObj(MESSAGE.PROD_ID_STR),null,400));
                }
                console.log(prodID);
                var prodData = await Product.findByPk(prodID);
                if(!prodData){
                    return (func(validate.errorObj(MESSAGE.NO_DATA),null,404));
                }
                if(prodData.owner_user_id != usr.id){
                    return (func(validate.errorObj(MESSAGE.FORBIDDEN_SRC),null,403));
                }
                if(!data.file.mimetype.startsWith("image/")){
                   return (func(validate.errorObj(MESSAGE.CORR_IMG),null,400) ); 
                }
              const s3Resp =   await upload(data.file,prodData.id);
              const param = {
                product_id:prodData.id,
                file_name:data.file.filename,
                s3_bucket_path:s3Resp.Location
              }
              console.log(param);
              var imageRec = await Image.create({
                product_id:param.product_id,
                file_name: param.file_name,
                s3_bucket_path:param.s3_bucket_path
            });
              return(func(null,imageRec,200));
                
    }
    catch(error){
        func(validate.createErrorObj(error),null,400) ;

    }

}

service.deleteImage = async (data,usr,func)=>{
    try{
                // var errors = validate.validateProductCreate(data.body);
                // if(errors.length>0){
                //     var errorObj = {
                //         isSuccess : false,
                //         errors : errors
                //     }
                // return func(errorObj,null,400);
                // }
                const prodID = data.params.prodID;
                if(!validate.checkID(prodID)){
                    return (func(validate.errorObj(MESSAGE.PROD_ID_STR),null,400));
                }
                console.log(prodID);
                var prodData = await Product.findByPk(prodID);
                if(!prodData){
                    return (func(validate.errorObj(MESSAGE.NO_DATA),null,404));
                }
                if(prodData.owner_user_id != usr.id){
                    return (func(validate.errorObj(MESSAGE.FORBIDDEN_SRC),null,403));
                }
                const imageID = data.params.imageID;

                var imageData = await Image.findByPk(imageID);
                if(!imageData){
                    return (func(validate.errorObj(MESSAGE.NO_DATA),null,404));
                }
                if(imageData.product_id != prodID){
                    return (func(validate.errorObj(MESSAGE.FORBIDDEN_SRC),null,403));
                }
             const s3Resp = await deleteS3Obj({Key:imageData.product_id+"/"+imageData.file_name});
             const savedObj = await Image.destroy({ where: { image_id:imageID } });

              return(func(null,savedObj,200));
                
    }
    catch(error){
        func(validate.createErrorObj(error),null,400) ;

    }

}

module.exports = service;