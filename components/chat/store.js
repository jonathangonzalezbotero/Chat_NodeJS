const Model = require('./model')

async function addUsersToChat(chat){
  const myChat = new Model(chat)
  return await myChat.save()
}

function getChatByUser(idUser){
  return new Promise((resolve, reject) => {
    let filter = {}
    if (idUser)
      filter = {
        users: idUser
      }
    Model.find(filter)
        .populate('users')
        .exec((error, populated) =>{
          if(error)
            reject(error)
          resolve(populated)
        })
  })
}

module.exports = {
  addUsersToChat,
  getChatByUser
}
