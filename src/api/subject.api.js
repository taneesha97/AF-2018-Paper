const express = require('express');
const router = express.Router();
const controller = require('../controllers/subject.controller');


module.exports = () => {
    router.post('/create',controller.createSubject);
    return router;
}