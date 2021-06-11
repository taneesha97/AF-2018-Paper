const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');


module.exports = function(){
    router.post('/create',controller.createUser);
    router.get('/',controller.GetAll);
    router.put('/update',controller.UpdateUser);
    return router;
}
