const Employees = require('../models/employeeModel')
const NodeCache = require('node-cache')

//Setting cache time to live to 10 seconds
const myCache = new NodeCache({stdTTL:10})

//Get all Employees
exports.getAllEmployees = async (req, res) => {
    let employee;
    let mykeys = myCache.keys();
    try {
        if(myCache.has("ListOfData")){
            employee = myCache.get("ListOfData")
            res.json({ message: 'Cache hit', employee, mykeys })
        }
        else{
            employee = await Employees.find()
            myCache.set("ListOfData",employee)
            res.json({ message: 'Cache miss' ,employee,mykeys})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get cached employee
 exports.getCachedEmployee = async(req, res) => {
    let employee;
    try {
      if(myCache.has(req.params.id)){
        employee = myCache.get(req.params.id)
        res.json({ message: 'Cache hit', employee })
      }else{
        let newEmployee = new Employees({name: req.params.id})
        employee = await newEmployee.save()
        myCache.set(req.params.id,employee)
        res.json({ message: 'Cache miss', employee })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }  
}

//Get employee by ID
exports.getEmployeeByID = (req, res) => {
    res.json(res.employee) 
}

//Add employee
exports.addEmployee = async (req, res) => {
    const employee = new Employees({name: req.body.name})
    try {
        const newSubscriber = await employee.save()
        myCache.set(req.body.name,employee)
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Update employee
exports.updateEmployee = async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name
    }
    try {
        const employee = await res.employee.save()
        res.json(employee)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Delete employee
exports.deleteEmployee = async (req, res) => {
    try {   
        await res.employee.deleteOne()
        const data = myCache.del(req.params.id)
        res.json({ message: 'Deleted employee' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Delete all cached data
exports.deleteAllFromCache = async (req, res) => {
    try {   
        const data = myCache.flushAll()
        let mykeys = myCache.keys();
        res.json({ message: 'Deleted cache', mykeys })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}