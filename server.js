const express = require('express')
const router = express.Router()

var app = express();//inicializamos una variable que contenga los datos del servidor express

app.listen(3000); // seteamos el puerto en donde voy a correr la aplicacion
app.use(router)
router.get('/message', function(request, response){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  response.send('Lista de mensajes');
});

router.post('/message', function(request, response){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  response.send('Mensaje añadido');
});

router.delete('/', function(request, response){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  response.send('DELETE desde router');
});
/*app.use('/', function(request, response){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  response.send('Hola amigos');
});*/

console.log('La aplicacion esta escuchando en http://localhost:3000');
