const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const Promise = require('bluebird');
const User = require('../models/user');

function secureRoute(req, res, next){
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  //A bearer authorization header.
  const token = req.headers.authorization.replace('Bearer ', '');

  new Promise((resolve, reject)=>{
    //payload contains user's id in 'payload.sub' & a signature in .signature.
    jwt.verify(token, secret, (err, payload)=>{
      //If you're in the reject block, it'll send you to the catch block.
      if(err) return reject(err);
      //The resolve block takes you to the then block.
      resolve(payload);
    });
  })
    .then(payload=> User.findById(payload.sub))
    .then(user=>{
      //checks to see if user's account has been deleted.
      if(!user) return res.status(401).json({ message: 'Unauthorized' });
      //Adding the user to req.
      req.currentUser = user;
      next();
    })
    .catch(next);
}
module.exports = secureRoute;
