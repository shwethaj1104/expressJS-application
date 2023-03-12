const Employees = require('../models/employeeModel')

const NodeCache = require('node-cache')
const myCache = new NodeCache({stdTTL:50})

exports.getAllEmployees = async (req, res) => {
    try {
        if(myCache.has("ListOfData")){
            const data = myCache.get("ListOfData")
            res.json({ message: 'Cache hit', data })
        }
        else{
            const employee = await Employees.find()
            myCache.set("ListOfData",employee)
            res.json({ message: 'Cache miss' ,employee})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
exports.deleteCache = async (req, res) => {
    try {
        if(myCache.has(req.params.id)){
            const data = myCache.del(req.params.id)
            res.json({ message: 'Cache deleted' ,data})
        }else{
            res.json({ message: 'Cache key not found'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getEmployeeByID = (req, res) => {
    let employee
    try {
      if(myCache.has(req.params.id)){
        employee = myCache.get(req.params.id)
         res.json({ message: 'Cache hit', employee })
      }else{
          myCache.set(req.params.id,req.params.id)
          employee =  myCache.get(req.params.id)
        res.json({ message: 'Cache miss', employee })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }  
}

exports.addEmployee = async (req, res) => {
    console.log(req.body)
    try {
        if(myCache.has(req.body.employee)){
            res.json({ message: 'Cache already exist'})
        }else{
            let employee = myCache.set(req.body.employee,req.body.employee)
            res.json({ message: 'Cache Added', employee })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateEmployee = async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name
    }
    // if (req.body.subscribedToChannel != null) {
    //     res.employee.subscribedToChannel = req.body.subscribedToChannel
    // }
    try {
        const updatedSubscriber = await res.employee.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


