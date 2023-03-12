const mongoose = require('mongoose')

//Assuming I am storing list of employees on to MongoDB
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true //making name mandatory field
  }
})

module.exports = mongoose.model('Employee', employeeSchema)