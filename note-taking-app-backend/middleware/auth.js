// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
      res.status(403).send({"msg":"please Login"})
    }
  
    const decodedToken = jwt.verify(token, 'Note');
 console.log(decodedToken);
    req.body.userId = decodedToken.userId;
   
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
