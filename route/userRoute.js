const express = require('express');
const UserController = require('../controller/Usercontroller')
const AuthService = require('../services/AuthService');
const ProductController = require('../controller/ProductController')
const ImageController = require('../controller/ImageController');
const multer = require("multer");
const upload = multer({ dest: __dirname+"/uploads/" });
const route = express.Router();


route.post('/v1/user',[UserController.createUser]);
route.put('/v1/user/:userID', [AuthService,UserController.updateUser]);
route.get('/v1/user/:userID', [AuthService,UserController.getUser]);
route.get('/healthz',[UserController.health])
route.get('/sampleAPI',[UserController.sampleAPI]);

route.post('/v1/product',[AuthService,ProductController.createProduct]);
route.put('/v1/product/:prodID',[AuthService,ProductController.updateProduct]);
route.patch('/v1/product/:prodID',[AuthService,ProductController.patchProduct]);
route.delete('/v1/product/:prodID',[AuthService,ProductController.deleteController]);
route.get('/v1/product/:prodID',[ProductController.getProduct]);


route.post('/v1/product/:prodID/image',[upload.single("file"),AuthService, ImageController.uploadImage]);
route.delete('/v1/product/:prodID/image/:imageID',[AuthService, ImageController.deleteObject]);
route.get('/v1/product/:prodID/image/:imageID',[AuthService, ImageController.getSingleImage]);
route.get('/v1/product/:prodID/image',[AuthService, ImageController.getImageList]);


module.exports = route;