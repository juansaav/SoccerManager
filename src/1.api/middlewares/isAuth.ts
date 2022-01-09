const jwt = require('jsonwebtoken');
import config from '../../config';  
import { BlockedTokens } from './blockedTokens';

// Check user token
function authenticateToken(req, res, next) {

  console.log("Check user token")
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.JWT_SECRET, (err: any, user: any) => {
    
    // Validate token
    if (err) { 
      console.log("Invalid token")
      return res.sendStatus(401)
    }
    // Check blocked tokens lists
    if (BlockedTokens.getInstance().tokenIsBlocked(+user.id, token)){
      console.log("Invalid token")
      return res.sendStatus(401)
    }

    // Check that token corresponds to user
    if (req.params.userId && (req.params.userId != user.id)) {
      console.log("Invalid token") 
      return res.sendStatus(403);
    }        

    // Attach user data
    req.user = user
    req.user.token = token

    next()
  })
}

export default authenticateToken