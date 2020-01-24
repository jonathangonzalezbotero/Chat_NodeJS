const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.get('/', function(req, res){
  const idUser = req.query.id
  controller
    .getUser(idUser)
    .then((user) => {
      response.success(req, res, user)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,`No se pudo obtener el usuario con [id]: ${idUser}`);
    })
});

router.post('/', function(req, res){
  controller
    .addUser(req.body.identification, req.body.name)
    .then((user) => {
      response.success(req, res, user)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje, `No se pudo insertar el usuario ${req.body.name}`)
    })
});

router.delete('/:id', function(req, res){ // indicamos que para cualquier ruta que escuche con / hara el llamado a la funcion
  controller
    .deleteUser(req.params.id)
    .then(() => {
      response.success(req, res, `Se ha eliminado el usuario con [id]: ${req.params.id}`)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,`No se pudo eliminar el usuario con [id]: ${req.params.id}`)
    })
});

router.patch('/:id', function(req, res){
  controller
    .updateUser(req.params.id, req.body.name)
    .then((user) => {
      response.success(req, res, user)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,`No se pudo modificar el usuario con [id]: ${req.params.id}`)
    })
});

module.exports = router;
