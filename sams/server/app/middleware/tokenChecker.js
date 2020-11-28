const jwt = require('jsonwebtoken')
const config = require('../config/token.config.json')

module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'];
  if (authHeader){
  const token = authHeader.split(' ')[1] || authHeader; 
  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      res.json({
        message : err,
        errorCode : 403
      })
      return res;
    }
    res.locals.user = user;
    next()
  })
  } else{
    res.json({
      message : "Your request not found",
      errorCode : 401
    })
    return res
  }

}