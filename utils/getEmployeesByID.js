const Employees = require('../models/employeeModel')

// middleware--> since all are taking id and doing same thing(filtering by id)
// next--> after this part of code execute next lines in the routes
async function getEmployees(req, res, next) {
    let employee
    try {
      employee = await Employees.findById(req.params.id)
      if (employee == null) {//if no employee with that id
        return res.status(404).json({ message: 'Cannot find employee' })
      }
    } catch (err) {//if other error
      return res.status(500).json({ message: err.message })
    }
    res.employee = employee //assigning res with employee data so that in service we cam directly use res.employee
    next()
  }

  module.exports = getEmployees;