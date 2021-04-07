const {request,response} = require("express");
const jwt = require('jsonwebtoken');

module.exports = (req=request,res=response,next)=>{
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decodedToken;

    next();

  } catch(e) {
    res.status(401).json({msg:"Access no authorization."});
  }
}