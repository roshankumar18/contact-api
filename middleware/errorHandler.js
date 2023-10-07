const { constants } = require("../constants");

const errorHandler =(err,req,res,next)=>{
    const statusCode = res.statusCode ?  res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed",
                message:err.message,
                stackTrace:err.stackTrace,
            })
        case constants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace:err.stackTrace,
            })
        case constants.UNAUTHORIZED:
        res.json({
            title:"unauthorized",
            message:err.message,
            stackTrace:err.stackTrace,
        })
        case constants.SERVER_ERROR:
        res.json({
            title:"server error",
            message:err.message,
            stackTrace:err.stackTrace,
        })
        case constants.FORBIDDEN:
        res.json({
            title:"forbidden",
            message:err.message,
            stackTrace:err.stackTrace,
        })
        default:
            break;
    }
    
}

module.exports = errorHandler