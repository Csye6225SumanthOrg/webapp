const AWS = require('aws-sdk');
const uuid = require('uuid');

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const bucketName = process.env.AWS_BUCKET_NAME




const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const service = {};
service.upload = async (file,productID)=>{
    
    const fileStream = fs.createReadStream(file.path);
    const param = {
        Bucket:bucketName,
        Body:fileStream,
        Key:productID +"/" +uuid.v4() +"/" +file.originalname
    }   
    const response =  await s3.upload(param).promise();
    await unlinkFile(file.path);
    return response;
    
}

service.deleteS3Obj = async (data)=>{
    const param = {
        Bucket:bucketName,
        Key:data.Key
    }
    const delRes = await s3.deleteObject(param).promise();
    return delRes;
}

module.exports = service;
