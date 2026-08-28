const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // maximum 5 requests
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many login attempts. Please try again in 15 minutes.",
        data: null,
        success: false,
        code: 429
    }
});


const messageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        message: "Too many messages sent. Please try again later.",
        data: null,
        success: false,
        code: 429
    }
});


module.exports = {
    loginLimiter,
    messageLimiter
};