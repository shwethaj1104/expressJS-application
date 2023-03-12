const Employees = require('../models/employeeModel')

// middleware --> filtering by id
async function getEmployees(req, res, next) {
    let employee;
    try {
      employee = await Employees.findById(req.params.id)
      if (employee == null) {
        return res.status(404).json({ message: 'Cannot find employee' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.employee = employee //assigning res with employee data so that in service we can directly use res.employee
    next()
  }

  module.exports = getEmployees;