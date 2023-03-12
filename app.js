
const express = require('express')

const connectDB = require('./config/db');
const employeeRouter = require('./routes/employees')
const app = express()

require('dotenv').config()

/* Body Parser
=========================== */
app.use(express.json())

/* Connecting to DB
=========================== */
connectDB();

/* Use router
=========================== */
app.use('/api/v1/employees', employeeRouter)

app.listen(3000, () => console.log('Server Started'))