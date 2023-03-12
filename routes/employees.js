const express = require('express')
const router = express.Router()

const EmployeeService = require('../services/employeeService')
const getEmployees = require('../utils/getEmployeesByID');

//Get all employees
router.get('/',EmployeeService.getAllEmployees)

// Get One employee by ID
router.get('/:id',getEmployees,EmployeeService.getEmployeeByID)

//Get one cached data
router.get('/cached/:id',EmployeeService.getCachedEmployee)

// Creat/Add employee
router.post('/',EmployeeService.addEmployee)

// Update employee
router.patch('/:id', getEmployees, EmployeeService.updateEmployee)

// Delete employee
router.delete('/:id', getEmployees,EmployeeService.deleteEmployee)

//Delete all cached key
router.delete('/',EmployeeService.deleteAllFromCache)

module.exports = router