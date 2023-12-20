const express = require('express');
const { createUser, login, updateUser, getUserByID, history, getListUser, deleteUser, searchUserByName } = require('../controllers/user');
const routeUser = express.Router();

routeUser.post('/createuser',createUser)
routeUser.post('/login',login)
routeUser.post('/updateuser',updateUser)
routeUser.get('/getuserid/:user_id',getUserByID)
routeUser.get('/history/:user_id',history)
routeUser.get('/getlistuser',getListUser)
routeUser.put('/deleteuser/:user_id',deleteUser)
routeUser.post('/searchuser',searchUserByName)




module.exports = routeUser