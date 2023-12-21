const express = require('express');
const { getListCategory, createCategory, updateCategory, deleteCategory, searchCategoryByName } = require('../controllers/category');
const routeCategory = express.Router();

routeCategory.get('/getlistcategory',getListCategory)
routeCategory.post('/createcategory',createCategory)
routeCategory.post('/updatecategory',updateCategory)
routeCategory.delete('/deletecategory/:category_id',deleteCategory)
routeCategory.post('/searchcategory',searchCategoryByName)



module.exports = routeCategory