const store = require('./store')

function addUser (idUser, nameUser){
  return new Promise ((resolve, reject) => {
    if(!idUser || !nameUser){
      console.error('[messageController - user] no ingresaron el id o nombre');
      reject('los datos son incorrectos')
      return false
    }

    const user = {
      identification: idUser,
      name: nameUser
    }
    resolve(store.addUser(user))
  });
}

function getUser (idUser){
  return new Promise((resolve, reject) => {
    resolve(store.getUser(idUser || null))
    reject(`No se pudo devolver el usuario con [id]: ${idUser}`)
  })
};

function updateUser (idUser, nameUser){
  return new Promise((resolve, reject) => {
    if(!idUser || !nameUser){
      console.error('[messageController - user] no ingresaron el id o nombre');
      reject('los parametros de entrada son incorrectos')
      return false
    }
    resolve(store.updateUser(idUser, nameUser))
  })
};

function deleteUser (idUser){
  return new Promise((resolve, reject) => {
    if(!idUser){
      console.error('[messageController - user] no ingresaron el id');
      reject('los parametros de entrada son incorrectos')
      return false
    }
    resolve(store.deleteUser(idUser))
  })
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser
}
