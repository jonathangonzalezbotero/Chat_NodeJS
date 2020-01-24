const Model = require('./model')

async function addUser(user){
  const myUser = new Model(user)
  return await myUser.save()
}

async function getUser(idUser){
  let filter = {}
  if (idUser)
    filter = {
      identification: idUser
    }
  return await Model.find(filter)
}

async function updateUser(idUser, name){
  const foundUser = await Model.findOne({
    identification: idUser
  })
  if(foundUser)
    foundUser.name = name

  return await foundUser.save()
}

async function deleteUser(idUser){
  return await Model.deleteOne({
    identification: idUser
  })
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser
}
