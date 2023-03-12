//Using mongoose library to create a connection between MongoDB and Express application
const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    const db = mongoose.connection

    //Printing DB status so that developers can identify if db connection is success or not
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
};

module.exports = connectDB;