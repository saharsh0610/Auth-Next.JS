import config from '../config.js';
import jwt from 'jsonwebtoken';


export default function checkForAuthentication(req,res,next){
    const authorizationHeaderValue=req.headers["authorization"];

    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
        return res.json({ message: 'token not found' });

    const token= authorizationHeaderValue.split('Bearer ')[1]
    
    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
    
        req.user = user;
        next();
      });


}

