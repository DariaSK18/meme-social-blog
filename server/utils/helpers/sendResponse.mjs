export function sendResponse(res, statusCode, data, message = 'success') {
    res.status(statusCode).json({
        status: message,
        data
    })
}