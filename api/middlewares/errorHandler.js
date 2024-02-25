import constants from "../constant.js";

const errorHandler = (err, req, res, next ) => {
    
    const statusCode = res.statusCode ? res.statusCode : 500;
    const message = err.message;
    const stackTrace = err.stack;
    const errJson = {statusCode, message, stackTrace}
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation error",
                errJson
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "unauthourized", 
                errJson
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "forbidden",
                errJson
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "not found",
                errJson
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                title: "server error",
                errJson
            });
            break;


        default:
             res.json("No error");
            break;
    }
    
}

export default errorHandler;
