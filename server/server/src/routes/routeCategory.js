const express = require('express');
const { getListCategory } = require('../controllers/category');
const routeCategory = express.Router();

routeCategory.get('/getlistcategory',getListCategory)




module.exports = routeCategory