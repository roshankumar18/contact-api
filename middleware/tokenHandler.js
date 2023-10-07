const jwt = require("jsonwebtoken")
const validateToken = async(req,res,next)=>{
    
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(404)
                throw new Error("wrong password")
            }
            req.user = decoded.user
            next()
        })
    }
}

module.exports = validateToken