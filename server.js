const express = require('express')
const app = express();//inicializamos una variable que contenga los datos del servidor express
const server = require('http').Server(app)

const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./network/routers')
const dataBase = require('./db')
const socket = require('./socket')

dataBase.connect()
socket.connect(server)

app.use(cors())
app.use(bodyParser.json())
app.use('/', express.static('public'))
router(app)

server.listen(3000, () =>{
  console.log('La aplicacion esta escuchando en http://localhost:3000');
})
