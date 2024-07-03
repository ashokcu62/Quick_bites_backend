const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const app = express()
const port = 3000

app.use(cors({
  // origin: ['http://localhost:5173'],
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,

}))
app.use(express.json())
app.use(cookieParser())

const userRoutes = require('./Routes/userRoutes')
const menuRoutes = require('./Routes/menuRoutes')
const contactRoutes = require('./Routes/contactRoutes')

app.use('/api/users/signup', userRoutes) 
app.use('/api/users', userRoutes)
app.use('/api/users', userRoutes)
app.use('/api/menus', menuRoutes) 
app.use('/api/menus/:menuId', menuRoutes) 
app.use('/api/contact', contactRoutes) 
 
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
main() .then(()=>console.log('Database connected')).catch(err => console.log(err));

async function main() { 
    const url = process.env.DB_URL
    const password = process.env.DB_PASSWORD
    const urlwithpassword = url.replace('<password>',password)
  await mongoose.connect(urlwithpassword);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}  