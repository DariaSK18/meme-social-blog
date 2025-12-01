export function sendError(res, statusCode, message) {
    res.status(statusCode).json({
        status: "error",
        message
    })
}