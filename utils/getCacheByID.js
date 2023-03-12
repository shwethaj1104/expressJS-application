const Employees = require('../models/employeeModel')

const NodeCache = require('node-cache')
const myCache = new NodeCache({stdTTL:30})

async function getCache(req, res, next) {
    let employee
    employee = new Employees({name: req.params.id})
    if(req.params.id ==='sh'){
      console.log("yessss")
    }
    try {
      if(myCache.has(req.params.id)){
        console.log("hitttt")
         res.json({ message: 'Cache hit', employee })
      }else{
      myCache.set(req.params.id,employee)
      employee = await employee.save()
      employee=myCache.get(req.params.id)
        res.status(201).json({ message: 'Cache miss' ,employee })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.employee = employee
    next()
  }

  module.exports = getCache;