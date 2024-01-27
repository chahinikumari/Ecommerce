class ErrorHandler extends Error {
    constructor(message,statusCode){
    super(message);
        this.statusCode = statusCode

        //create stack property this is optional
    Error.captureStackTrace(this,this.constructor)
} }

export default ErrorHandler;