const express = require('express')
const sequelize = require('./config/database')

const app = express()

sequelize.authenticate()
.then(() => console.log('Database connected successfully...'))
.catch((err) => console.error('Database connection failed: ', err))

app.listen(5000, () => console.log('Server on port 5000...'))