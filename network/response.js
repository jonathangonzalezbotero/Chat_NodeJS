exports.success = function(req, res, message){
  res
    .status(200)
    .send({
          'Body: ': message
          });
}

exports.error = function(req, res, message, details){
  res
    .status(500)
    .send({'Error: ':message,
           'Body: ': "",
           "Console:": details
          });
}
