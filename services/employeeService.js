const Employees = require('../models/employeeModel')

const NodeCache = require('node-cache')
const myCache = new NodeCache({stdTTL:50})

exports.getAllEmployees = async (req, res) => {
    try {
        if(myCache.has("ListOfData")){
            const employee = myCache.get("ListOfData")
            let mykeys = myCache.keys();
            res.json({ message: 'Cache hit', employee,mykeys })
        }
        else{
            const employee = await Employees.find()
            myCache.set("ListOfData",employee)
            let mykeys = myCache.keys();
            res.json({ message: 'Cache miss' ,employee,mykeys})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
 exports.getEmployeeByCached = async(req, res) => {
    let employee
    try {
      if(myCache.has(req.params.id)){
        employee = myCache.get(req.params.id)
         res.json({ message: 'Cache hit', employee })
      }else{
            let newemployee = new Employees({
                name: req.params.id
            })
            employee = await newemployee.save()
          myCache.set(req.params.id,employee)
        res.json({ message: 'Cache miss', employee })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }  
}

exports.getEmployeeByID = (req, res) => {
    res.json(res.employee) //in getSubscriber we are filtering by id
}

exports.addEmployee = async (req, res) => {
    const employee = new Employees({
        name: req.body.name,
    })
    try {
        const newSubscriber = await employee.save()
        myCache.set(req.body.name,employee)
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateEmployee = async (req, res) => {
    if (req.body.name != null) {
        res.employee.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.employee.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.employee.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteEmployee = async (req, res) => {
    try {   
        await res.employee.deleteOne()
        const data = myCache.del(req.params.id)
        res.json({ message: 'Deleted employee' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteAllFromCache = async (req, res) => {
    try {   
        const data = myCache.flushAll()
        let mykeys = myCache.keys();
        res.json({ message: 'Deleted cache',mykeys })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}