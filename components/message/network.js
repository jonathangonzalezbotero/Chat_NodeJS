const express = require('express')
const multer = require('multer')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

const storage = multer.diskStorage({//esta funcion me permite guardar los archivos con su nombre real y su extension
  destination: (req, file, cb) => {
    cb(null, 'public/files/')
  },
  filename: (req, file, cb) => {
    cb (null, file.originalname)
  }
})

const upload = multer({//funcion para subir documento a traves de Node js
  storage
})

router.get('/', function(req, res){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  const filterUser = req.query.user
  controller
    .getMessages(filterUser)
    .then((messageList) => {
      response.success(req, res, messageList)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,'Verificar el detalle del error por consola');
    })
});

router.post('/', upload.single('file'), function(req, res){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,'Verificar el detalle del error por consola')
    })
});

router.delete('/:id', function(req, res){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Se ha eliminado el mensaje con [id]: ${req.params.id}`)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,`No se pudo eliminar el mensaje del [id]: ${req.params.id}`)
    })
});

router.patch('/:id', function(req, res){
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,`No se pudo modificar los datos del [id]: ${req.params.id}`)
    })
});

module.exports = router;
