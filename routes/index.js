const express = require('express');

const routes = express.Router();

const fileupload = require('../config/fileupload');

const userController = require('../controllers/userController');

routes.get('/',userController.index);
routes.post('/register',fileupload,userController.insertdata);
routes.delete('/deleteData',userController.deleteData);
routes.put('/updateData',userController.updateData);


module.exports = routes;