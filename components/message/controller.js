const store = require('./store')
const socket = require('../../socket').socket

function addMessage (chat, user, message, file){
  return new Promise ((resolve, reject) => {
    if(!chat || !user || !message){
      console.error('[messageController - message] no hay usuario o mensaje');
      reject('los datos son incorrectos')
      return false
    }

    let fileURL = ''
    if(file)
      fileURL = 'http://localhost:3000/app/files/' + file.filename

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      file: fileURL,
      date: new Date()
    }
    store.addMessage(fullMessage)
    socket.io.emit('message', fullMessage)
    resolve(fullMessage)
  });
}

function getMessages (filterUser){
  return new Promise((resolve, reject) => {
    resolve(store.getMessages(filterUser || null))
    reject('No se pudo devolver el mensaje del usuario')
  })
};

function updateMessage (id, message){
  return new Promise((resolve, reject) => {
    if(!id || !message){
      console.error('[messageController] no hay id o mensaje');
      reject('los parametros de entrada son incorrectos')
      return false
    }
    resolve(store.updateMessage(id, message))
  })
};

function deleteMessage (id){
  return new Promise((resolve, reject) => {
    if(!id){
      console.error('[messageController] no digitaron el id');
      reject('los parametros de entrada son incorrectos')
      return false
    }
    resolve(store.deleteMessage(id))
  })
};

module.exports = {
  addMessage,
  getMessages,// si queremos que se llama de forma diferente el llamado a mi funcion
  updateMessage,
  deleteMessage
}
