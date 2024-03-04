import constants from "../constant.js";


const errorHandler = (err, req, res, next ) => {
    if (err.name === 'CastError'){
        res.statusCode = 404;
        err.message = 'Listing not found'
    }
    
    
    const statusCode = res.statusCode ? res.statusCode : 500;
    const message = err.message;
    const stackTrace = err.stack;
    const errJson = {statusCode, message, stackTrace};
    
   res.status(statusCode).json(errJson);
    
}

export default errorHandler;
