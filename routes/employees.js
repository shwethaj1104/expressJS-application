const express = require('express')
const router = express.Router()
const Employees = require('../models/employeeModel')
const EmployeeService = require('../services/employeeService')

// var cacheService = require("express-api-cache");
const getEmployees = require('../utils/getEmployeesByID');
const getCache = require('../utils/getCacheByID');
// var cache = cacheService.cache;

//get all
// router.get('/', cache("2 minutes"),EmployeeService.getAllEmployees)
router.get('/',EmployeeService.getAllEmployees)

// Getting One
// router.get('/:id',cache("2 minutes"), getEmployees,EmployeeService.getEmployeeByID)
router.get('/:id',getEmployees,EmployeeService.getEmployeeByID)
router.get('/cached/:id',EmployeeService.getEmployeeByCached)

// Creating one
router.post('/',EmployeeService.addEmployee)

// Updating One
router.patch('/:id', getEmployees, EmployeeService.updateEmployee)

// Deleting One
router.delete('/:id', getEmployees,EmployeeService.deleteEmployee)

router.delete('/',EmployeeService.deleteAllFromCache)

//Delete existing cache
// router.delete('/deleteCache',EmployeeService.deleteCache)

module.exports = router