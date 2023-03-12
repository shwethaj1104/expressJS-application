const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // subscribedToChannel: {
  //   type: String,
  //   required: true
  // }
})

module.exports = mongoose.model('Employee', employeeSchema)