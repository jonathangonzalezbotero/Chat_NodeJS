const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.get('/:idUser', function(req, res){
  const idUser = req.params.idUser
  controller
    .getChatByUser(idUser)
    .then((chats) => {
      response.success(req, res, chats)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje,`No se pudo obtener el chat`);
    })
});

router.post('/', function(req, res){
  controller
    .addUsersToChat(req.body.users)
    .then((users) => {
      response.success(req, res, users)
    })
    .catch((mensaje) => {
      response.error(req, res, mensaje, `No se pudo insertar los usuarios al chat`)
    })
});

module.exports = router;
