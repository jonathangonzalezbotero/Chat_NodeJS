const store = require('./store')

function addUsersToChat (users){
  return new Promise ((resolve, reject) => {
    if(!users){
      console.error('[messageController - chat] no ingresaron los usuarios');
      reject('los datos son incorrectos')
      return false
    }

    const chat = {
      users: users
    }
    resolve(store.addUsersToChat(chat))
  });
}

function getChatByUser (idUser){
  return new Promise((resolve, reject) => {
    resolve(store.getChatByUser(idUser))
    reject(`No se pudo devolver el chat`)
  })
};

module.exports = {
  addUsersToChat,
  getChatByUser
}
