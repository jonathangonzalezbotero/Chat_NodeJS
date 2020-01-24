const Model = require('./model')

function addMessage(message){
  const myMessage = new Model(message)
  myMessage.save()
}

async function getMessages(filterUser){
  return new Promise((resolve, reject) => {
    let filter = {}
    if (filterUser)
      filter = {
        user: filterUser
      }
    Model.find(filter)
        .populate('user')
        .populate('chat')
        .exec((error, populated) =>{
          if(error)
            reject(error)

            resolve(populated)
        })
  })
}

async function updateMessage(id, message){
  const foundMessage = await Model.findOne({
    _id: id
  })
  if(foundMessage)
    foundMessage.message = message

  return await foundMessage.save()
}

async function deleteMessage(id){
  return await Model.deleteOne({
    _id: id
  })
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage
}
